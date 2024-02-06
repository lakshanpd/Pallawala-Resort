import React from 'react'
import './Footer.css'
import { FaHandPointLeft } from "react-icons/fa";

function Footer() {
  return (

    <div className='main-container'>
        <ul className='first-list'>
        <li className='first-list-item gray'>Home</li>
        <li className='first-list-item gray'>Contact Us</li>
            <ul className='second-list'>
                <li>Phone: + 77 75 50 264</li>
                <li>Whatsapp: + 94 37 50 264</li>
                <li>Email: lakshanpd.cse21@gmail.com</li>
            </ul>
        <li className='first-list-item'><a href="https://www.facebook.com" className='footer-links gray'>Follow Us on Facebook  <FaHandPointLeft /></a></li>
        <li className='first-list-item'></li>
        <li className='first-list-item'></li>
        <li className='first-list-item'><a href='#' className='footer-links white'> Useful Informations </a></li>
        </ul>
    </div>

  )
}

export default Footer
