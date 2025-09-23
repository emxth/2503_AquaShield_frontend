import React, { useEffect, useState } from 'react'
import L from "leaflet"
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component that handles clicks
function LocationMarker({ position, setPosition, setLocation }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom()); // smooth fly on click
    }
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

// Component to auto-fly when GPS detects
function FlyToLocation({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13); // smooth move to GPS location
    }
  }, [coords, map]);

  return null;
}

export default function LocationPicker({ setLocation }) {
  const [currentLocation, setCurrentLocation] = useState(null); // start empty
  const [markerPos, setMarkerPos] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setCurrentLocation(coords);
        setMarkerPos([pos.coords.latitude, pos.coords.longitude]);
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, [setLocation]);

  return (
    <MapContainer
      center={currentLocation || [6.9271, 79.8612]} // fallback: Colombo
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Auto fly when GPS updates */}
      <FlyToLocation coords={currentLocation} />

      {/* Marker with click handling */}
      <LocationMarker
        position={markerPos}
        setPosition={setMarkerPos}
        setLocation={setLocation}
      />
    </MapContainer>
  );
}