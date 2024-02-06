import React from 'react'
import Buttone from 'react-bootstrap/Button';
import './CottageImage.css'

function CottageImage() {
  return (
    <div>
      <div className='image-container'>
        <div className='number-icon'><i class="fa-solid fa-circle-1" ></i></div>
        <div className='cottage-image'><img src="Cottage1/c11.jpg" alt="Overlay Image"/></div>
        <div className='cottage-button'>
          <Buttone variant="outlined" href="#outlined-buttons">
            Link
          </Buttone>
        </div>
      </div>
    </div>
  )
}

export default CottageImage
