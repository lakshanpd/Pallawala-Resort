import React, { useEffect, useState } from 'react';
import './AverageRating.css';
import LargeBasicRating from './LargeRatingStars';

function AverageRating() {
  const [averageRating, setAverageRating] = useState(0.0);
  const [ratingArray, setRatingArray] = useState([{}])
  let result
  const fetchData = async () => {
    try {
      console.log('Fetching data to AverageRating...');
      const response = await fetch('http://localhost:3001/api/review/rating');
      result = await response.json();
      console.log(response, result)
      setRatingArray(result)
      
      if (result.length === 0) {
        return null;
      } else {
        let totalRating = 0.0;

        for (let i = 0; i < result.length; i++) {
          totalRating += result[i].Rating;
        }

        // Calculate the new average and return it
        
        // Use the functional form of state updater
        setAverageRating(totalRating / result.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( ()=>{
    fetchData();
  }, []); // Add ratingArray as a dependency to useEffect

  // useEffect(()=>{

  // }, [ratingArray])

  return (
    <div className='average-rating-container'>
      <div className='average-rating-number'>{averageRating.toFixed(1)}</div>

      <div className='average-rating-column'>
      {(result != null) ? <div></div> : <div className='average-rating-name'>{ratingArray.length} Ratings</div>}
        
        <div className='average-rating-star'> <LargeBasicRating rate={averageRating.toFixed(1)}></LargeBasicRating> </div>
      </div>
    </div>
  );
}

export default AverageRating;
