import React from 'react';
import './NavBar.css';
import NavBarBtn from './NavBarBtn';
import RatingsBtn from './RatingsBtn';
import { useState, useEffect } from 'react';

function NavBar() {

  const [isSticky, setIsSticky] = useState(false);

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
    <div className={isSticky ? "navigator-container sticky" : "navigator-container"}>
        <img className='logo' src="https://www.chateaudefeuilles.com/images/chateau_de_feuilles-logo3.svg" alt="SVG Image"/>

      <div className='drop-downs'>
        <NavBarBtn buttonText={button1Text} listItems={button1Items} />
        <NavBarBtn buttonText={button2Text} listItems={button2Items} />
        <NavBarBtn buttonText={button3Text} listItems={button3Items} />
        <RatingsBtn/>
      </div>
    </div>
  );
}

export default NavBar;


