import React from 'react'
import Contacts from './Components/Contacts'
import MyNavBar from './Components/MyNavBar';
import OneReview from './Components/OneReview';
import Footer from './Components/Footer';
import Slider from './Components/Slider';

function ReviewPage() {
  return (
    <div>
      <Contacts/>
      <MyNavBar/>
      <Slider/>
      <OneReview/>
      <Footer/>
    </div>
  )
}

export default ReviewPage