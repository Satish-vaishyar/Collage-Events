import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { auth } from '../config/firebase';

function CreateEvent() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        lat: '',
        lng: '',
        date: '',
        ticketPrice: '',
        organizerTelegramChatId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const eventData = {
                name: formData.name,
                description: formData.description,
                location: {
                    address: formData.address,
                    lat: parseFloat(formData.lat),
                    lng: parseFloat(formData.lng)
                },
                date: formData.date,
                ticketPrice: parseFloat(formData.ticketPrice) || 0,
                organizerId: auth.currentUser.uid,
                organizerTelegramChatId: formData.organizerTelegramChatId || null
            };

            const response = await eventsAPI.create(eventData);
            navigate(`/events/${response.data.id}`);
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="header">
                <div className="container">
                    <h1>Create Event</h1>
                </div>
            </div>

            <div className="container">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Event Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex gap-10">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="lat"
                                    value={formData.lat}
                                    onChange={handleChange}
                                    placeholder="e.g. 28.6139"
                                />
                            </div>

                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="lng"
                                    value={formData.lng}
                                    onChange={handleChange}
                                    placeholder="e.g. 77.2090"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Event Date *</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Ticket Price (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Organizer Telegram Chat ID (optional)</label>
                            <input
                                type="text"
                                name="organizerTelegramChatId"
                                value={formData.organizerTelegramChatId}
                                onChange={handleChange}
                                placeholder="Your Telegram chat ID for notifications"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/dashboard')}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
