const express = require("express");
const router = express.Router();
const db = require("./db");

const util = require("util");
const { error } = require("console");
const dbQuery = util.promisify(db.query).bind(db);

// Define a route that accepts a parameter
router.get("/:cottageNumber", (req, res) => {
  // Retrieve the parameter from the URL
  const cottageNumber = req.params.cottageNumber;

  db.query(
    "SELECT Description FROM Room WHERE RoomID = ?",
    [cottageNumber],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

router.get("/review/contents", (req, res) => {
  db.query("SELECT Content FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/review/rating", (req, res) => {
  db.query("SELECT Rating FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/review/customer_names", (req, res) => {
  const sql_query = `SELECT FirstName, LastName FROM Customer
    RIGHT JOIN 
    (SELECT Booking.BookingRef, Booking.CustomerID FROM Booking
    RIGHT JOIN Review 
    ON Review.BookingRef = Booking.BookingRef) AS intermediate
    ON Customer.CustomerID = intermediate.CustomerID;`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

router.get("/cottage/cottage_prices", (req, res) => {
  const sql_query = `SELECT Price FROM Room WHERE IsCottage=True;`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

router.post("/submit_booking_form", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      nic,
      phoneNo1,
      phoneNo2,
      rooms,
      checkin,
      checkout,
    } = req.body;
    console.log(rooms);

    const valueMapping = {
      "cottage 1": 1,
      "cottage 2": 2,
      "cottage 3": 3,
      "cottage 4": 4,
      "cottage 5": 5,
      "cottage 6": 6,
      "room 1": 7,
      "room 2": 8,
      "room 3": 9,
      "room 4": 10,
    };
    console.log("hello2");

    // Function to transform the array
    const transformArray = (originalArray) => {
      return originalArray.map((item) => valueMapping[item] || item);
    };

    const rooms_ = transformArray(rooms);
    console.log("hello1");

    console.log(rooms_, rooms);

    console.log("Booking form submitted:", req.body);
    console.log("hello3");

    // Convert checkin and checkout to correct date format
    const checkinDate = checkin;
    const checkoutDate = checkout;
    console.log(checkin);

    //check avaliability

    for (let i = 0; i < rooms_.length; i++) {
      const check_query = `
      SELECT CheckIn, CheckOut
      FROM booking
      WHERE BookingRef IN (
          SELECT BookingRef
          FROM roomdetails
          WHERE RoomID = ?
      )
      AND (
          ? BETWEEN CheckIn AND CheckOut OR
          ? BETWEEN CheckIn AND CheckOut OR
          (? < CheckIn AND ? > CheckOut)
      );
    `;

      const check_data = await dbQuery(check_query, [
        parseInt(rooms_[i]),
        checkinDate,
        checkoutDate,
        checkinDate,
        checkoutDate,
      ]);

      if (check_data.length > 0) {
        return res.json({ message: "Booking not available" });
      }
    }

    // Insert customer details
    const customer_query = `INSERT INTO Customer (Email, FirstName, LastName, NIC) VALUES (?, ?, ?, ?)`;

    const customer_result = await dbQuery(customer_query, [
      email,
      firstName,
      lastName,
      nic,
    ]);

    // Retrieve the last inserted CustomerID
    const customer_id_query = `SELECT LAST_INSERT_ID() AS CustomerID`;

    const customer_id_result = await dbQuery(customer_id_query);
    const customerID = customer_id_result[0].CustomerID;

    // Insert booking details   //added
    if (!customerID) {
      return res.status(500).json({ error: "Failed to retrieve CustomerID" });
    }

    const booking_query = `INSERT INTO Booking (CustomerID, CheckIn, CheckOut) VALUES (?, ?, ?)`;

    await dbQuery(booking_query, [customerID, checkin, checkout]);

    // Insert phone numbers

    const phone_query = `INSERT INTO PhoneNumber (CustomerID, PhoneNumber) VALUES (?, ?), (?, ?)`;

    await dbQuery(phone_query, [customerID, phoneNo1, customerID, phoneNo2]);

    const booking_ref_query = `SELECT LAST_INSERT_ID() AS BookingRef`;
    const booking_ref_result = await dbQuery(booking_ref_query);
    const bookingRef = booking_ref_result[0].BookingRef;

    // Check if bookingRef was retrieved successfully   //added
    if (!bookingRef) {
      return res.status(500).json({ error: "Failed to retrieve BookingRef" });
    }

    // Insert room details

    for (let i = 0; i < rooms.length; i++) {
      const room_query = `INSERT INTO RoomDetails (BookingRef, RoomID) VALUES (?, ?)`;

      await dbQuery(room_query, [bookingRef, parseInt(rooms_[i])]);
    }

    console.log("Booking successful");
    return res.json({ message: "Booking submitted successfully!" });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/admin/info", (req, res) => {
  const sql_query = `SELECT * FROM admin;`;

  db.query(sql_query, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log the error in detail
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!data.length) {
      console.warn("No admin data found"); // Log warning if no data
      return res.status(404).json({ message: "No admin data found" });
    }
    res.json(data);
  });
});

router.post("/admin/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT * FROM Admin`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Email === email) {
        if (data[i].Password === password) {
          return res.status(200).json({ message: "Successfully logged in" });
        }
      }
    }
    return res.status(401).json({ error: "Wrong details" });
  });
});

router.get("/admin/requests", (req, res) => {
  const sql_query = `SELECT FirstName, LastName, NIC, Email, phonenumber, CheckIn, CheckOut, roomdetails.RoomID, roomdetails.BookingRef  
                    FROM booking
                    LEFT JOIN customer ON customer.CustomerID = booking.CustomerID
                    LEFT JOIN PhoneNumber ON customer.CustomerID = phonenumber.CustomerID
                    LEFT JOIN roomdetails ON roomdetails.BookingRef = booking.BookingRef
                    WHERE booking.Confirmed IS NULL;`;

  db.query(sql_query, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log the error in detail
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!data.length) {
      console.warn("No request data found"); // Log warning if no data
      return res.status(404).json({ message: "No request data found" });
    }
    // res.json(data);
    let temp = [];
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (!temp.includes(data[i].NIC)) {
        temp.push(data[i].NIC);
        let obj = {
          FirstName: data[i].FirstName,
          LastName: data[i].LastName,
          NIC: data[i].NIC,
          Email: data[i].Email,
          PhoneNumber: [data[i].phonenumber],
          CheckIn: data[i].CheckIn,
          CheckOut: data[i].CheckOut,
          Rooms: [data[i].RoomID],
          BookingRef: [data[i].BookingRef],
        };
        result.push(obj);
      } else {
        let index = temp.indexOf(data[i].NIC);
        if (!result[index].PhoneNumber.includes(data[i].phonenumber)) {
          result[index].PhoneNumber.push(data[i].phonenumber);
        }
        if (!result[index].Rooms.includes(data[i].RoomID)) {
          result[index].Rooms.push(data[i].RoomID);
        }
      }
    }
    res.json(result);
  });
});

router.post("/admin/handle-accept", (req, res) => {
  const id = req.body.id;

  const sql_query = `UPDATE booking SET Confirmed = 1 WHERE BookingRef = ?;`;

  db.query(sql_query, [id], (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log the error in detail
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Booking accepted" });
    console.log("Booking accepted ", id);
  });
});

router.post("/admin/handle-reject", (req, res) => {
  const id = req.body.id;

  const sql_query = `UPDATE Booking SET Confirmed = 0 WHERE BookingRef = ?;`;

  db.query(sql_query, [id], (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log the error in detail
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Booking rejected" });
  });
});

router.get("/admin/room_prices", (req, res) => {
  const sql = `SELECT RoomID, Price FROM room;`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

router.post("/admin/change-price", (req, res) => {
  const sql = `UPDATE room SET Price = ? WHERE RoomID = ?;`;

  db.query(sql, [req.body.newPrice, req.body.roomID], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

router.get("/admin/upcoming_bookings", (req, res) => {
  const sql = `SELECT FirstName, LastName, NIC, Email, phonenumber, CheckIn, CheckOut, roomdetails.RoomID, roomdetails.BookingRef  
FROM booking
LEFT JOIN customer ON customer.CustomerID = booking.CustomerID
LEFT JOIN PhoneNumber ON customer.CustomerID = phonenumber.CustomerID
LEFT JOIN roomdetails ON roomdetails.BookingRef = booking.BookingRef
WHERE booking.Confirmed = 1 AND booking.CheckIn > CURDATE();`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    // return res.json(data);
    let temp = [];
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (!temp.includes(data[i].NIC)) {
        temp.push(data[i].NIC);
        let obj = {
          FirstName: data[i].FirstName,
          LastName: data[i].LastName,
          NIC: data[i].NIC,
          Email: data[i].Email,
          PhoneNumber: [data[i].phonenumber],
          CheckIn: data[i].CheckIn,
          CheckOut: data[i].CheckOut,
          Rooms: [data[i].RoomID],
          BookingRef: [data[i].BookingRef],
        };
        result.push(obj);
      } else {
        let index = temp.indexOf(data[i].NIC);
        if (!result[index].PhoneNumber.includes(data[i].phonenumber)) {
          result[index].PhoneNumber.push(data[i].phonenumber);
        }
        if (!result[index].Rooms.includes(data[i].RoomID)) {
          result[index].Rooms.push(data[i].RoomID);
        }
      }
    }
    res.json(result);
  });
});

router.get("/admin/recent_bookings", (req, res) => {
  const sql = `SELECT FirstName, LastName, NIC, Email, phonenumber, CheckIn, CheckOut, roomdetails.RoomID, roomdetails.BookingRef  
FROM booking
LEFT JOIN customer ON customer.CustomerID = booking.CustomerID
LEFT JOIN PhoneNumber ON customer.CustomerID = phonenumber.CustomerID
LEFT JOIN roomdetails ON roomdetails.BookingRef = booking.BookingRef
WHERE booking.Confirmed = 1 AND booking.CheckIn <= CURDATE();`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    // return res.json(data);
    let temp = [];
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (!temp.includes(data[i].NIC)) {
        temp.push(data[i].NIC);
        let obj = {
          FirstName: data[i].FirstName,
          LastName: data[i].LastName,
          NIC: data[i].NIC,
          Email: data[i].Email,
          PhoneNumber: [data[i].phonenumber],
          CheckIn: data[i].CheckIn,
          CheckOut: data[i].CheckOut,
          Rooms: [data[i].RoomID],
          BookingRef: [data[i].BookingRef],
        };
        result.push(obj);
      } else {
        let index = temp.indexOf(data[i].NIC);
        if (!result[index].PhoneNumber.includes(data[i].phonenumber)) {
          result[index].PhoneNumber.push(data[i].phonenumber);
        }
        if (!result[index].Rooms.includes(data[i].RoomID)) {
          result[index].Rooms.push(data[i].RoomID);
        }
      }
    }
    res.json(result);
  });
});

module.exports = router;
