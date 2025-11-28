import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { eventsAPI, registrationsAPI } from '../services/api';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function EventPublic() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (event && event.location && !map.current) {
            initializeMap();
        }
    }, [event]);

    const fetchEvent = async () => {
        try {
            const response = await eventsAPI.getById(id);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    const initializeMap = () => {
        if (!event.location.lat || !event.location.lng) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [event.location.lng, event.location.lat],
            zoom: 14
        });

        // Add marker
        new mapboxgl.Marker({ color: '#2563eb' })
            .setLngLat([event.location.lng, event.location.lat])
            .setPopup(new mapboxgl.Popup().setText(event.location.address || event.name))
            .addTo(map.current);

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl());
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegistering(true);

        try {
            const response = await registrationsAPI.create({
                eventId: id,
                name: formData.name,
                email: formData.email
            });

            // Initialize Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: response.data.amount,
                currency: response.data.currency,
                name: event.name,
                description: 'Event Registration',
                order_id: response.data.orderId,
                handler: async function (razorpayResponse) {
                    // Verify payment
                    try {
                        await registrationsAPI.verifyPayment({
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature
                        });
                        alert('Registration successful! Payment verified.');
                        setFormData({ name: '', email: '' });
                    } catch (error) {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email
                },
                theme: {
                    color: '#2563eb'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            alert('Registration failed: ' + error.message);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading event...</div>;
    }

    if (!event) {
        return <div className="container">Event not found</div>;
    }

    return (
        <div className="page">
            <div className="header">
                <div className="container">
                    <h1>{event.name}</h1>
                </div>
            </div>

            <div className="container">
                <div className="card">
                    <div className="card-header">Event Details</div>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {event.date ? new Date(event.date.seconds * 1000).toLocaleString() : 'TBA'}</p>
                    <p><strong>Ticket Price:</strong> ₹{event.ticketPrice || 'Free'}</p>
                    <p><strong>Event Code:</strong> <strong>{event.eventCode}</strong> (Use this to join via Telegram)</p>
                </div>

                {/* Location Map */}
                {event.location && event.location.lat && (
                    <div className="card">
                        <div className="card-header">Location</div>
                        {event.location.address && <p>{event.location.address}</p>}
                        <div ref={mapContainer} className="map-container" />
                    </div>
                )}

                {/* Indoor Map */}
                {event.indoorMapUrl && (
                    <div className="card">
                        <div className="card-header">Indoor Map</div>
                        <div className="indoor-map">
                            <img src={event.indoorMapUrl} alt="Indoor map" />
                            {event.indoorMapPOIs && event.indoorMapPOIs.map(poi => (
                                <div
                                    key={poi.id}
                                    className="poi-marker"
                                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                                    title={poi.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Registration Form */}
                <div className="card">
                    <div className="card-header">Register for Event</div>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={registering}
                        >
                            {registering ? 'Processing...' : `Register ${event.ticketPrice ? `(₹${event.ticketPrice})` : '(Free)'}`}
                        </button>
                    </form>
                </div>

                <div className="card">
                    <div className="card-header">Join via Telegram</div>
                    <p>Join our Telegram bot to ask questions and get event updates:</p>
                    <ol>
                        <li>Search for our bot on Telegram</li>
                        <li>Send: <code>/join {event.eventCode}</code></li>
                        <li>Ask any questions about the event!</li>
                    </ol>
                </div>
            </div>

            {/* Load Razorpay script */}
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </div>
    );
}

export default EventPublic;
