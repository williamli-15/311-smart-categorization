import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ onLocationFound }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && !mapRef.current._leaflet_id) {
            // Define tile layer with HTTPS
            const osmTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const osmLayer = L.tileLayer(osmTiles, { maxZoom: 19, attribution: osmAttrib });

            // Initialize the map
            const map = L.map(mapRef.current, {
                center: [42.3548, -71.0660], // Default center
                zoom: 17,
                layers: [osmLayer]
            });

            // Check if geolocation is available
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // // testing
                    // const userLat = 42.356788;
                    // const userLng = -71.066715;

                    // Set map view to user's location
                    map.setView(new L.LatLng(userLat, userLng), 17);

                    // Place a marker at the user's location
                    if (markerRef.current) {
                        markerRef.current.setLatLng([userLat, userLng]);
                    } else {
                        markerRef.current = L.marker([userLat, userLng]).addTo(map);
                    }

                    // Call the callback function with the user's location
                    onLocationFound(userLat, userLng);
                }, function () {
                    console.error('Geolocation failed or permission denied');
                });
            }
        }
    }, [onLocationFound]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
