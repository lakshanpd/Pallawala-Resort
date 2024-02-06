import React, { useEffect, useState } from 'react';
import './MyImageList.css';
import FlipCard from './FlipCard';



function MyImageList() {

  const [cottagePrices, setCottagePrices] = useState([{}])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cottage/cottage_prices');
        const result = await response.json();

        setCottagePrices(result);
      }

      catch (error) {
        console.log(error)
      }

    }

    fetchData();
  }, []) 

  const IMAGES = [
    {
      img: '/Cottage1/c11.jpg',
      about: 'Cottage 01',
      link: '/info/Cottage1'
    },
    {
      img: '/Cottage2/c21.jpg',
      about: 'Cottage 02',
      link: '/info/Cottage2'
    },
    {
      img: '/Cottage3/c31.jpeg',
      about: 'Cottage 03',
      link: '/info/Cottage3'
    },
    {
      img: '/Cottage4/c41.jpeg',
      about: 'Cottage 04',
      link: '/info/Cottage4'
    },
    {
      img: '/Cottage5/c51.jpg',
      about: 'Cottage 05',
      link: '/info/Cottage5'
    },
    {
      img: '/Cottage6/c61.jpg',
      about: 'Cottage 06',
      link: '/info/Cottage6'
    }
  ];


  return (
    <div className='main'>
      <div className="divider">{'\u00a0\u00a0\u00a0Cottages\u00a0\u00a0\u00a0'}</div>
      <div className='grid-container'>
        {cottagePrices.map((item, index) => (

          (cottagePrices[index] && <FlipCard img={IMAGES[index].img} about={IMAGES[index].about} price={cottagePrices[index].Price} link={IMAGES[index].link} key={index} />)

))}
      </div>
    </div>
  );
}

export default MyImageList;
