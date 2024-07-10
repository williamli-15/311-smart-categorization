// locationCheck.js
async function isPointOnManagedStreet(lat, lon) {
    const streetsGeoJSON = await getLocalGeoJSON();

    if (!streetsGeoJSON || !streetsGeoJSON.features) {
        console.error('No features available to check against.');
        return { near: false, distance: null, streetName: null };
    }

    const point = turf.point([lon, lat]);
    const maxDistance = 50; // meters
    let closestDistance = Infinity;
    let closestStreetName = null; // Initialize to null

    streetsGeoJSON.features.forEach(feature => {
        if (!feature || !feature.geometry) {
            console.log('Skipping invalid feature', feature);
            return;
        }
        try {
            const distance = turf.pointToLineDistance(point, feature, { units: 'meters' });
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





function testLocationFromInput() {
    const input = document.getElementById('coordinates').value.trim();
    const [lat, lon] = input.split(',').map(Number);
    isPointOnManagedStreet(lat, lon)
        .then(result => {
            let message = result.near 
                ? `Yes, the location is on a City managed street (${result.streetName}). Your distance: ${result.distance.toFixed(2)} meters.` 
                : "No, the location is not on a City managed street.";
            document.getElementById('result').textContent = message;
        })
        .catch(error => {
            console.error("Error checking location:", error);
            document.getElementById('result').textContent = "Failed to check the location due to an error.";
        });
}

async function getLocalGeoJSON() {
    try {
        const response = await fetch('localGeoJSON.geojson');
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



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('result').textContent = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('coordinates').value = `${lat}, ${lon}`;
    testLocationFromInput();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('result').textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('result').textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('result').textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('result').textContent = "An unknown error occurred.";
            break;
    }
}