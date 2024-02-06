import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'react-leaflet/dist/react-leaflet.css';

function Map() {
  const location = { id: 1, name: 'Pallwala Resort', coordinates: [6.4135, 81.3326] };

  return (
    <MapContainer center={[6.4135, 81.3326]} zoom={13} style={{ height: '250px', width: '350px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

        <Marker key={location.id} position={location.coordinates}>
          <Popup>{location.name}</Popup>
        </Marker>

    </MapContainer>
  );
}

export default Map;
