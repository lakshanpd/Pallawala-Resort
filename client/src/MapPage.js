import React from 'react'
import Contacts from './Components/Contacts'
import MyNavBar from './Components/MyNavBar';
import Slider from './Components/Slider';
import Map from './Components/Map';
import GoogleMapButton from './Components/GoogleMapButton';
import './MapPage.css'
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

function MapPage() {
  return (
    <div>
      <Contacts/>
      <NavBar/>
      <Slider/>

    <div className='location-content'>

      <div className='location-description-container'>
        <div className="divider">{'\u00a0\u00a0\u00a0Location\u00a0\u00a0\u00a0'}</div>
        <div className='location-description'>
          Nestled just 1km away from the vibrant town of Sellakatharagama, our resort offers an idyllic retreat on the opposite shore of the Sellakatharagama Wewa. Conveniently accessible, our tranquil haven provides easy access to both Sellakatharagama and the revered Katharagama Dewalaya. Surrounded by a serene atmosphere, our resort promises a delightful and noiseless environment, allowing guests to unwind and connect with the natural beauty that envelops the area. Immerse yourself in the peaceful ambiance as you explore the cultural richness of Sellakatharagama and seek spiritual solace at the nearby Katharagama Dewalaya.
        </div>
      </div>

      <div className='map'>

        <div className='map-component'>
            <Map/>
        </div>
        <div className='google-map-button'>
            <GoogleMapButton/>
        </div>

      </div>
    
    </div>

      <Footer/>

    </div>
  )
}

export default MapPage
