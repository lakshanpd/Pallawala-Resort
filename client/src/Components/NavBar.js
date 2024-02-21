import React from 'react';
import './NavBar.css';
import NavBarBtn from './NavBarBtn';
import RatingsBtn from './RatingsBtn';
import { useState, useEffect } from 'react';
import NavResBtn from './NavResBtn';
import Accordion from './Accordion';

function NavBar() {

  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => clicked ? setClicked(false) : setClicked(true)

  useEffect(() => {


    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    const button1Text = 'Home';
    const button1Items = [
        { text: 'Pallawala Resort', link: '/' },
        { text: 'Location', link: '/location' },
        { text: 'Services & Activities', link: '/item' }
    ];

    const button2Text = 'Rooms';
    const button2Items = [
        { text: 'See all rooms', link: '/item' },
        { text: 'Special offers', link: '/item' },
        { text: 'Booking policy', link: '/item' }
    ];

    const button3Text = 'Contact';
    const button3Items = [
        { text: 'Contact us', link: '/item' },
        { text: 'Book your stay', link: '/item' }
    ];
  return (
    <div>
      <div className={isSticky ? "navigator-container sticky" : "navigator-container"}>
          <img className='logo' src="https://www.chateaudefeuilles.com/images/chateau_de_feuilles-logo3.svg" alt="SVG Image"/>

        {(windowWidth > 1000) ?       
        <div className='drop-downs'>
          <NavBarBtn buttonText={button1Text} listItems={button1Items} />
          <NavBarBtn buttonText={button2Text} listItems={button2Items} />
          <NavBarBtn buttonText={button3Text} listItems={button3Items} />
          <RatingsBtn/>
        </div>
        : <div className='navbar-res-btn' onClick={toggleClicked}><NavResBtn/></div>}   

      </div>
      {(windowWidth > 1000) ? null : (clicked ? <div className='new'><Accordion/></div> : null)}
      
    </div>

  );
}

export default NavBar;


