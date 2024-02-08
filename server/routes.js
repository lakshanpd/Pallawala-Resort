const express = require('express');
const router = express.Router();

const db = require('./db');

// Define routes
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a route that accepts a parameter
router.get('/api/:cottageNumber', (req, res) => {
    // Retrieve the parameter from the URL
    const cottageNumber = req.params.cottageNumber;
  
    db.query('SELECT Description FROM Room WHERE RoomID = ?', [cottageNumber], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
  });

  router.get('/api/review/contents', (req, res) => {
    db.query('SELECT Content FROM Review', (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

router.get('/api/review/rating', (req, res) => {
    db.query('SELECT Rating FROM Review', (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

router.get('/api/review/customer_names', (req, res) => {

    const sql_query = `SELECT FirstName, LastName FROM Customer
    RIGHT JOIN 
    (SELECT Booking.BookingRef, Booking.CustomerID FROM Booking
    RIGHT JOIN Review 
    ON Review.BookingRef = Booking.BookingRef) AS intermediate
    ON Customer.CustomerID = intermediate.CustomerID;`

    db.query(sql_query, (err, data) => {
        if (err) return res.json(err);
        console.log(data)
        return res.json(data);
    })
})

router.get('/api/cottage/cottage_prices', (req, res) => {

    const sql_query = `SELECT Price FROM Room WHERE IsCottage=True;`;

    db.query(sql_query, (err, data) => {
        if (err) return res.json(err);
        console.log(data)
        return res.json(data);
    })
})

module.exports = router;