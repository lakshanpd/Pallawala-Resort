import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CottagePage from './CottagePage';
import ImageSlider from './Components/Slider'
import NavigationButton from './Components/NavigationButton';
import 'leaflet/dist/leaflet.css';
import OneReview from './Components/OneReview';
import ReviewPage from './ReviewPage';
import AverageRating from './Components/AverageRating';
import Map from './Components/Map';
import GoogleMapButton from './Components/GoogleMapButton';
import MapPage from './MapPage';
import CottageImage from './Components/CottageImage';
import FlipCard from './Components/FlipCard';
import BookingPage from './Booking/bookingpage';

function App() {
  return (  
    <>
      <Router>
        <Routes>
        
          <Route path="/" element={<Home/>} />
          <Route path="/info/:cottageKey" element={<CottagePage />} />
          <Route path="/test" element={<FlipCard/>} />
          <Route path='/navigate' element={<NavigationButton/>} />
          <Route path='/reviews' element={<ReviewPage/>} />
          <Route path="/test2" element={<GoogleMapButton/>} />
          <Route path="/location" element={<MapPage/>} />
          <Route path="/booking" element={<BookingPage/>} />
          

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;





