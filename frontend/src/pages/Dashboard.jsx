import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventsAPI.getAll();
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="page">
            <div className="header">
                <div className="container flex justify-between align-center">
                    <h1>Event Manager Dashboard</h1>
                    <nav>
                        <button className="btn btn-primary" onClick={() => navigate('/events/create')}>
                            Create Event
                        </button>
                        <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={handleLogout}>
                            Logout
                        </button>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="card">
                    <div className="card-header">My Events</div>

                    {loading ? (
                        <div className="loading">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-center" style={{ padding: '40px', color: '#6b7280' }}>
                            <p>No events yet. Create your first event!</p>
                            <button
                                className="btn btn-primary mt-20"
                                onClick={() => navigate('/events/create')}
                            >
                                Create Event
                            </button>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Event Code</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.name}</td>
                                        <td><strong>{event.eventCode}</strong></td>
                                        <td>{event.date ? new Date(event.date.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => navigate(`/events/${event.id}`)}
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
