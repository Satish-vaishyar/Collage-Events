import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI, ticketsAPI, registrationsAPI, webhooksAPI } from '../services/api';

function EventManage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [documentFile, setDocumentFile] = useState(null);
    const [indoorMapFile, setIndoorMapFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [eventRes, ticketsRes, regsRes] = await Promise.all([
                eventsAPI.getById(id),
                ticketsAPI.getAll(id),
                registrationsAPI.getAll(id)
            ]);

            setEvent(eventRes.data);
            setTickets(ticketsRes.data.tickets);
            setRegistrations(regsRes.data.registrations);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentUpload = async () => {
        if (!documentFile) return;

        try {
            await eventsAPI.uploadDocument(id, documentFile);
            alert('Document uploaded successfully! Processing in background...');
            setDocumentFile(null);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    };

    const handleIndoorMapUpload = async () => {
        if (!indoorMapFile) return;

        try {
            const response = await eventsAPI.uploadIndoorMap(id, indoorMapFile);
            setEvent({ ...event, indoorMapUrl: response.data.indoorMapUrl });
            alert('Indoor map uploaded successfully!');
            setIndoorMapFile(null);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    };

    const handleReply = async (ticketId) => {
        if (!replyText.trim()) return;

        try {
            await ticketsAPI.reply(ticketId, replyText);
            alert('Reply sent!');
            setReplyText('');
            setSelectedTicket(null);
            fetchData();
        } catch (error) {
            alert('Failed to send reply: ' + error.message);
        }
    };

    const handleSendPoll = async () => {
        if (!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2) {
            alert('Please provide a question and at least 2 options');
            return;
        }

        if (!event.organizerTelegramChatId) {
            alert('No Telegram chat ID configured for this event');
            return;
        }

        try {
            await webhooksAPI.sendPoll(
                event.organizerTelegramChatId,
                pollQuestion,
                pollOptions.filter(o => o.trim())
            );
            alert('Poll sent!');
            setPollQuestion('');
            setPollOptions(['', '']);
        } catch (error) {
            alert('Failed to send poll: ' + error.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!event) {
        return <div className="container">Event not found</div>;
    }

    return (
        <div className="page">
            <div className="header">
                <div className="container">
                    <h1>{event.name}</h1>
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="container">
                {/* Tabs */}
                <div className="card">
                    <div className="flex gap-10" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <button
                            className={activeTab === 'overview' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={activeTab === 'documents' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveTab('documents')}
                        >
                            Documents
                        </button>
                        <button
                            className={activeTab === 'tickets' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveTab('tickets')}
                        >
                            Tickets ({tickets.length})
                        </button>
                        <button
                            className={activeTab === 'registrations' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveTab('registrations')}
                        >
                            Registrations ({registrations.length})
                        </button>
                        <button
                            className={activeTab === 'poll' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveTab('poll')}
                        >
                            Send Poll
                        </button>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="card">
                        <div className="card-header">Event Information</div>
                        <p><strong>Event Code:</strong> {event.eventCode}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Date:</strong> {event.date ? new Date(event.date.seconds * 1000).toLocaleString() : 'N/A'}</p>
                        <p><strong>Ticket Price:</strong> ₹{event.ticketPrice || 0}</p>
                        <p><strong>Location:</strong> {event.location?.address || `${event.location?.lat}, ${event.location?.lng}`}</p>
                        <button
                            className="btn btn-primary mt-20"
                            onClick={() => window.open(`/events/${id}/public`, '_blank')}
                        >
                            View Public Page
                        </button>
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                    <div>
                        <div className="card">
                            <div className="card-header">Upload Document (PDF/DOCX/TXT)</div>
                            <div className="form-group">
                                <input
                                    type="file"
                                    accept=".pdf,.docx,.txt"
                                    onChange={(e) => setDocumentFile(e.target.files[0])}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleDocumentUpload}
                                disabled={!documentFile}
                            >
                                Upload & Process
                            </button>
                        </div>

                        <div className="card">
                            <div className="card-header">Upload Indoor Map</div>
                            {event.indoorMapUrl && (
                                <div className="mb-20">
                                    <p>Current map:</p>
                                    <img src={event.indoorMapUrl} alt="Indoor map" style={{ maxWidth: '300px' }} />
                                </div>
                            )}
                            <div className="form-group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setIndoorMapFile(e.target.files[0])}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleIndoorMapUpload}
                                disabled={!indoorMapFile}
                            >
                                Upload Indoor Map
                            </button>
                        </div>
                    </div>
                )}

                {/* Tickets Tab */}
                {activeTab === 'tickets' && (
                    <div className="card">
                        <div className="card-header">Support Tickets</div>
                        {tickets.length === 0 ? (
                            <p>No tickets yet</p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Flag</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map(ticket => (
                                        <>
                                            <tr key={ticket.id}>
                                                <td>{ticket.userId}</td>
                                                <td>{ticket.message}</td>
                                                <td>
                                                    <span className={`badge badge-${ticket.status === 'open' ? 'warning' : 'success'}`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {ticket.shouldFlag && <span className="badge badge-danger">Flagged</span>}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                                                    >
                                                        {selectedTicket === ticket.id ? 'Cancel' : 'Reply'}
                                                    </button>
                                                </td>
                                            </tr>
                                            {selectedTicket === ticket.id && (
                                                <tr>
                                                    <td colSpan="5">
                                                        {ticket.autoAnswer && (
                                                            <div style={{ background: '#f9fafb', padding: '10px', marginBottom: '10px' }}>
                                                                <strong>Auto-answer:</strong> {ticket.autoAnswer}
                                                            </div>
                                                        )}
                                                        <textarea
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            placeholder="Type your reply..."
                                                            rows="3"
                                                            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                                                        />
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => handleReply(ticket.id)}
                                                        >
                                                            Send Reply
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Registrations Tab */}
                {activeTab === 'registrations' && (
                    <div className="card">
                        <div className="card-header">Registrations</div>
                        {registrations.length === 0 ? (
                            <p>No registrations yet</p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Payment Status</th>
                                        <th>Amount</th>
                                        <th>Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map(reg => (
                                        <tr key={reg.id}>
                                            <td>{reg.name}</td>
                                            <td>{reg.email}</td>
                                            <td>
                                                <span className={`badge badge-${reg.paymentStatus === 'paid' ? 'success' : reg.paymentStatus === 'pending' ? 'warning' : 'danger'}`}>
                                                    {reg.paymentStatus}
                                                </span>
                                            </td>
                                            <td>₹{reg.amount}</td>
                                            <td>{reg.registeredAt ? new Date(reg.registeredAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Poll Tab */}
                {activeTab === 'poll' && (
                    <div className="card">
                        <div className="card-header">Send Poll to Telegram</div>
                        <div className="form-group">
                            <label>Question</label>
                            <input
                                type="text"
                                value={pollQuestion}
                                onChange={(e) => setPollQuestion(e.target.value)}
                                placeholder="Enter poll question"
                            />
                        </div>
                        {pollOptions.map((option, index) => (
                            <div className="form-group" key={index}>
                                <label>Option {index + 1}</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...pollOptions];
                                        newOptions[index] = e.target.value;
                                        setPollOptions(newOptions);
                                    }}
                                    placeholder={`Option ${index + 1}`}
                                />
                            </div>
                        ))}
                        <button
                            className="btn btn-secondary mb-20"
                            onClick={() => setPollOptions([...pollOptions, ''])}
                        >
                            Add Option
                        </button>
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={handleSendPoll}
                        >
                            Send Poll
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventManage;
