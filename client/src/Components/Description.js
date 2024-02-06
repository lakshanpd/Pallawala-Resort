// import React from 'react'
import { CgCheckO } from "react-icons/cg";
import './Description.css'

import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Description({details}) {

    const desc = details;
    //['LCD TV', 'Two large size beds', 'Attached bathroom', 'Air conditioning', 'Free wi-fi']

  return (
    <div className="full-container">
      <div className="divider">{'\u00a0\u00a0\u00a0Description\u00a0\u00a0\u00a0'}</div>

      <ListGroup className='gc'>
        {desc.map((item, index) => (
              
              <ListGroup.Item>
                <CgCheckO className='custom-icon'/>
                {item}
              </ListGroup.Item>
            ))}
      </ListGroup>
    </div>

  );
}

export default Description;
