import React from 'react';
import Contacts from '../Components/Contacts';
import NavBar from '../Components/NavBar';
import Slider from '../Components/Slider';
import OneReview from '../Components/OneReview';
import Footer from '../Components/Footer';



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