import React, { useEffect, useState } from 'react';
import RatingStars from './RatingStars';
import { VscAccount } from "react-icons/vsc";
import './OneReview.css'
import AverageRating from './AverageRating';

function OneReview() {
  const [reviewContent, setReviewContent] = useState([]);
  const [reviewCustomer, setReviewCustomer] = useState([]);
  const [reviewRate, setReviewRate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching da...');
        const response1 = await fetch('http://localhost:3001/api/review/contents');
        const result1 = await response1.json();

        const response2 = await fetch('http://localhost:3001/api/review/customer_names');
        const result2 = await response2.json();

        const response3 = await fetch('http://localhost:3001/api/review/rating');
        const result3 = await response3.json();

        setReviewContent(result1);
        setReviewCustomer(result2);
        setReviewRate(result3);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    // Render the component only when both reviewContent and reviewCustomer have data
    if (reviewContent.length === 0 || reviewCustomer.length === 0 || reviewRate.length === 0) {
        return null;
      }

  const dataArray = [/* Your data array here */];

  const customerElements = [];

// Check if both arrays have the same length
if ((reviewContent.length === reviewCustomer.length) && (reviewRate.length === reviewCustomer.length)) {
    for (let index = 0; index < reviewContent.length; index++) {
      customerElements.push(
        <div key={index} className='review-container-component'>

          <div className='customer-pic-box'>
            <div className='customer-pic'> <VscAccount size={60}/> </div>

            <div className='name-star-box'>
              <div className='customer-name'>{reviewCustomer[index].FirstName + ' ' + reviewCustomer[index].LastName}</div>
              <div className='review-star'> <RatingStars rate={reviewRate[index].Rating}></RatingStars></div>
            </div>

          </div>

          <div key={`content-${index}`} className='customer-idea'>
            {reviewContent[index].Content}
          </div>

        </div>
      );
    }
  } else {
    console.error("Mismatched array lengths");
  }

  return (
    <div className='review-component'>
      <div className="divider">{'\u00a0\u00a0\u00a0 Reviews \u00a0\u00a0\u00a0'}</div>
      <div className='average-rating-component'>
        <AverageRating/>
      </div>
      <div className='review-container'>{customerElements}</div>
    </div>
  );
}

export default OneReview;
