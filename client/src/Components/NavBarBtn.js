import React, { useState } from 'react';
import './NavBarBtn.css';

function NavBarBtn({ buttonText, listItems }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='navigator-btn' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <button type="button" className='navigator-btn-component'>
                <p className={isHovered ? 'p-tag-hovered' : 'p-tag'}>{buttonText}</p>

                <i className={isHovered ? 'arrow nav-arrow-hovered down-arrow' : 'arrow down-arrow'}></i>
                
            </button>

            {isHovered && (
                // <ul className='unordered-list'>
                //     {listItems.map((item, index) => (
                //         <li key={index}><a href={item.link} style={{ textDecoration: 'none', color: '#333', ':hover': { color: '#555' } }}>{item.text}</a></li>

                //     ))}
                // </ul>
                <ul className='unordered-list'>
                    {listItems.map((item, index) => (
                        <a key={index} href={item.link} style={{ textDecoration: 'none', color: '#333', ':hover': { color: '#555' } }}>
                            <li>{item.text}</li>
                        </a>
                    ))}
                </ul>

            )}
        </div>
    );
}

export default NavBarBtn;


