import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
      if (mapRef.current && !mapRef.current._leaflet_id) {
        // Define tile layer
        var greenTiles = 'http://tiles.mapc.org/basemap/{z}/{x}/{y}.png';
        var greenAttrib = 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>';
        var greenLayer = L.tileLayer(greenTiles, {maxZoom: 17, minZoom: 9, attribution: greenAttrib});

        // Initialize the map
        var map = L.map(mapRef.current, {
          center: [42.3548, -71.0660], // Default center
          zoom: 17,
          layers: [greenLayer]
        });

        // Check if geolocation is available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            // Set map view to user's location
            map.setView(new L.LatLng(userLat, userLng), 17);
          }, function() {
            console.error('Geolocation failed or permission denied');
          });
        }
      }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
