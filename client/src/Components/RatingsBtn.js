import React, { useState } from 'react';

function RatingBtn({ buttonText, listItems }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='navigator-btn' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <button type="button" className='navigator-btn-component' style={isHovered ? {boxShadow: '1px 1px 1000px 0.5px grey', borderBottom: '1px solid #636262'} : null}>
                <p className='p-tag'>Ratings</p>
            </button>
        </div>
    );
}

export default RatingBtn;


