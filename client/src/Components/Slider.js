import React, { useState, useEffect } from 'react';
import './Slider.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

function Slider() {
  const imgs = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
  const [count, setCount] = useState(0);

  const rightArrowClicked = () => {
    setCount((prevCount) => (prevCount + 1) % imgs.length);
  };

  const leftArrowClicked = () => {
    setCount((prevCount) => (prevCount - 1 + imgs.length) % imgs.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % imgs.length);
    }, 2500);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className='slider-container'>
      <a href="#" className='myArrow left-arrow' onClick={leftArrowClicked}>
        <div className="icon">{<SlArrowLeft size={40} />}</div>
      </a>

      <img className='slider-image' src={'/images/' + imgs[count]} alt={`Slide ${count + 1}`} />

      <a href="#" className='myArrow right-arrow' onClick={rightArrowClicked}>
        <div className="icon">{<SlArrowRight size={40} />}</div>
      </a>
    </div>
  );
}

export default Slider;
