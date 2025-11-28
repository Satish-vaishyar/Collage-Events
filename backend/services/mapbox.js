const axios = require('axios');

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

/**
 * Get directions between two points
 */
async function getDirections(startLng, startLat, endLng, endLat) {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}`,
            {
                params: {
                    access_token: MAPBOX_TOKEN,
                    geometries: 'geojson',
                    steps: true
                }
            }
        );

        return response.data.routes[0];
    } catch (error) {
        console.error('Mapbox directions error:', error.response?.data || error.message);
        throw new Error('Failed to get directions');
    }
}

/**
 * Geocode an address to coordinates
 */
async function geocodeAddress(address) {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
            {
                params: {
                    access_token: MAPBOX_TOKEN,
                    limit: 1
                }
            }
        );

        if (response.data.features.length === 0) {
            throw new Error('Address not found');
        }

        const [lng, lat] = response.data.features[0].center;
        return { lng, lat };
    } catch (error) {
        console.error('Mapbox geocoding error:', error.response?.data || error.message);
        throw new Error('Failed to geocode address');
    }
}

module.exports = {
    getDirections,
    geocodeAddress
};
