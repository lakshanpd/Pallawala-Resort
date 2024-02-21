import React, { useState } from 'react'
import './Accordion.css'
import { FaChevronDown } from "react-icons/fa6";
import { FaWindowMinimize } from "react-icons/fa6";

function Accordion() {

    const [clicked_1, setClicked_1] = useState(false);
    const [clicked_2, setClicked_2] = useState(false);
    const [clicked_3, setClicked_3] = useState(false);

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

    const data = [
        [button1Text, button1Items, clicked_1, setClicked_1],
        [button2Text, button2Items, clicked_2, setClicked_2],
        [button3Text, button3Items, clicked_3, setClicked_3]
    ]
    
  return (

    <ul className="panel">
        {data.map((accordion, index) => (
            <div key={index}>
                <li className="accordion" onClick={() => accordion[2] ? accordion[3](false) : accordion[3](true)}>{accordion[0]} <span style={{marginLeft: 'auto', marginRight: '5%'}}> {!accordion[2] ? <FaChevronDown size={14}/> : <FaWindowMinimize size={14}/>}</span></li>
                {accordion[2] && (
                    <ul className='panel_content'>
                        {accordion[1].map((item, index) => (
                            <div key={index}>
                                <a href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <li className='panel_content_item' key={index}>{item.text}</li>
                                </a>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        ))}
        <a href={'/reviews'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <li className="accordion"> Ratings </li>
        </a>
    </ul>
  )
}

export default Accordion
