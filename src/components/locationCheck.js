import { point } from '@turf/helpers';
import pointToLineDistance from '@turf/point-to-line-distance';

async function isPointOnManagedStreet(lat, lon) {
    const streetsGeoJSON = await getLocalGeoJSON();

    if (!streetsGeoJSON || !streetsGeoJSON.features) {
        console.error('No features available to check against.');
        return { near: false, distance: null, streetName: null };
    }

    const userPoint = point([lon, lat]);
    const maxDistance = 100; // meters
    let closestDistance = Infinity;
    let closestStreetName = null; // Initialize to null

    streetsGeoJSON.features.forEach(feature => {
        if (!feature || !feature.geometry) {
            console.log('Skipping invalid feature', feature);
            return;
        }
        try {
            const distance = pointToLineDistance(userPoint, feature, { units: 'meters' });
            if (distance < closestDistance) {
                closestDistance = distance;
                closestStreetName = feature.properties.STREETNAME; // Save the street name
            }
        } catch (error) {
            console.error('Error calculating distance:', error);
        }
    });

    return {
        near: closestDistance <= maxDistance,
        distance: closestDistance <= maxDistance ? closestDistance : null,
        streetName: closestDistance <= maxDistance ? closestStreetName : null
    };
}

async function getLocalGeoJSON() {
    try {
        const response = await fetch('data/localGeoJSON.geojson');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load GeoJSON:', error);
        return { features: [] }; // Return an empty features array on error
    }
}

export { isPointOnManagedStreet };
