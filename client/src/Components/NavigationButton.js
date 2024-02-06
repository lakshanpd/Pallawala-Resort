import React from 'react';

const NavigationButton = () => {
  // Coordinates for the destination location
  const latitude = 37.7749;
  const longitude = -122.4194;

  // Function to handle button click
  const handleButtonClick = () => {
    // Construct the Google Maps URL with destination coordinates
    const googleMapsUrl = `https://www.google.com/maps/dir//${latitude},${longitude}/`;

    // Open a new tab/window with the Google Maps URL
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Navigate to Google Maps</button>
    </div>
  );
};

export default NavigationButton;
