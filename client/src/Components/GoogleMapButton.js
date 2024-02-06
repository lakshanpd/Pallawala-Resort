import React from 'react';
import Button from 'react-bootstrap/Button';

const GoogleMapButton = () => {
  const openGoogleMap = () => {
    // Replace the coordinates with the desired location
    const latitude = 6.4135;
    const longitude = 81.3326;

    // Generate the Google Maps URL with the specified location
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Open a new window or tab with the Google Maps URL
    window.open(mapsUrl, '_blank');
  };

  return (
    <Button onClick={openGoogleMap} variant="outline-success" >
        Open Google Maps
    </Button>
  );
};

export default GoogleMapButton;
