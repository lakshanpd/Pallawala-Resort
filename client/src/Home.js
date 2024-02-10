import React from 'react';
import MyImageList from './Components/MyImageList';
import Contacts from './Components/Contacts';
import Slider from './Components/Slider';
import './Home.css'
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

function Home() {
  return (
    <div>
      <Contacts/>
      <div className='home-nav'>
        <NavBar/>
      </div>
      
      <Slider/>
      <div className='resort-desc'>
        <h1>Welcome to Our Resort</h1>
        <p>Discover tranquility at our Katharagama resort, located just 1 km from Sella Katharagama. With <span class="highlight">6 charming cottages</span> and <span class="highlight">4 non-AC rooms</span>, our peaceful oasis offers a serene escape. Enjoy the convenience of exploring <span class="highlight">Katharagama Dewalaya</span> and <span class="highlight">Sella Katharagama</span> from our doorstep. Immerse yourself in the calming ambiance of our intimate retreat, providing a perfect blend of nature and accessibility. Whether you're a nature enthusiast or seeking a quiet getaway, our resort promises a delightful stay in the heart of Sri Lanka.</p>
      </div>
      <div>
        <MyImageList/>
      </div>

      <Footer/>
      
    </div>
  );
}

export default Home;

