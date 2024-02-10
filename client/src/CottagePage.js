import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from './data/carouselData.json';
import { Carousel } from './Components/Carousel';
import Contacts from './Components/Contacts';
import Slider from './Components/Slider';
import Description from './Components/Description';
import './CottagePage.css';
import OtherImageList from './Components/OtherImageList';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

const CottagePage = () => {
  // Get the 'cottageKey' parameter from the URL
  const { cottageKey } = useParams();

  // Dynamically select cottage data based on the parameter
  const selectedCottage = data[cottageKey] || [];

  // Get the last character
  const lastCharacter = cottageKey.charAt(cottageKey.length - 1);

  // Convert the last character to an integer
  const lastCharacterAsInteger = parseInt(lastCharacter, 10);

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('http://localhost:3001/api/' + lastCharacter)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [lastCharacter]); // Include lastCharacter as a dependency

  const descriptionArray = backendData[0]?.Description ? backendData[0].Description.split(', ') : [];

  return (

    <div className="my-image-list">
      <Contacts/>
      <NavBar/>
      <Slider/>
      <div className='inline'>
        <div className='carousel-component'>
          <Carousel  data={selectedCottage} />
        </div>
        <div className='description-component'>
          <Description details={descriptionArray} className='description-component' />
        </div>
      </div>

      <OtherImageList except_number={lastCharacterAsInteger}/>

      <Footer/>
      
    </div>
  );
};

export default CottagePage;

  




