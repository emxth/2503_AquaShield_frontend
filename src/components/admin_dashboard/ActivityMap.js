import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "384px", // fit inside your card
};

const center = { lat: 20, lng: 0 }; // default center (somewhere global)

const recentReports = [
  { id: "RPT-001", species: "Tuna", location: "Pacific Ocean", lat: -15.398, lng: -145.295, date: "2024-01-15", status: "pending" },
  { id: "RPT-002", species: "Salmon", location: "North Atlantic", lat: 40.0, lng: -30.0, date: "2024-01-14", status: "approved" },
  { id: "RPT-003", species: "Cod", location: "Baltic Sea", lat: 56.0, lng: 19.0, date: "2024-01-14", status: "rejected" },
  { id: "RPT-004", species: "Shark", location: "Indian Ocean", lat: -20.0, lng: 80.0, date: "2024-01-13", status: "pending" },
  { id: "RPT-005", species: "Mackerel", location: "Mediterranean", lat: 35.0, lng: 18.0, date: "2024-01-12", status: "approved" },
];

export default function ActivityMap() {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
        {recentReports.map((report) => (
          <Marker
            key={report.id}
            position={{ lat: report.lat, lng: report.lng }}
            onClick={() => setSelected(report)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h4>{selected.species}</h4>
              <p>{selected.location}</p>
              <p>Status: {selected.status}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
