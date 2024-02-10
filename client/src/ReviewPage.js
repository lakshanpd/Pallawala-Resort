import React from 'react'
import Contacts from './Components/Contacts'
import OneReview from './Components/OneReview';
import Footer from './Components/Footer';
import Slider from './Components/Slider';
import NavBar from './Components/NavBar';

function ReviewPage() {
  return (
    <div>
      <Contacts/>
      <NavBar/>
      <Slider/>
      <OneReview/>
      <Footer/>
    </div>
  )
}

export default ReviewPage