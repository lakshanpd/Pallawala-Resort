import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function LargeBasicRating({ rate }) {
  // Convert the rate prop to a number
  const rateValue = parseFloat(rate);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="half-rating-read" size="large" defaultValue={2.5} precision={0.5} value={rateValue} readOnly />
    </Box>
  );
}
