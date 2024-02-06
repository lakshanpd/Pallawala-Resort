import React from 'react';
import './Flip.css';

export default function FlipCard({img, about, price, link}) {
  return (
    <div>
        <div className="tscontainer">
        <img src={img} alt="Avatar" className="image"/>
        <div className="overlay">
            <div className="text">Price start on Rs {price} /=</div>
            <a href={link}>
              <button className="button"> More Info </button>
            </a>
            <img src='/arrow_down.png' alt="Arrow Down Image" className='arrow_down'/>
        </div>
        <div className='cottage-tag'>{about}</div>
        </div>
    </div>
  );
}



