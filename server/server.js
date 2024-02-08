const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();
const app = express();
const PORT = 3001;

// Routerrs -----------
const adminRouter = require("./admin/routers/admin");

app.use(cors());

db.getConnection()
  .then((connection) => {
    console.log("Connected to the MYSQL database");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Error connecting to the mysql database:", err.message);
  });

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.use(adminRouter);

app.get("/api/description", (req, res) => {
  db.query(
    "SELECT Description FROM cottage WHERE ?",
    [cottageNumber],
    (err, data) => {
      if (err) return res.json(err);
      console.log(typeof data);
      return res.json(data);
    }
  );
});

// Define a route that accepts a parameter
app.get("/api/:cottageNumber", (req, res) => {
  // Retrieve the parameter from the URL
  const cottageNumber = req.params.cottageNumber;

  db.query(
    "SELECT Description FROM cottage WHERE cottageID = ?",
    [cottageNumber],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

app.get("/api/review/contents", (req, res) => {
  db.query("SELECT Content FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/review/rating", (req, res) => {
  db.query("SELECT Rating FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/review/customer_names", (req, res) => {
  const sql_query = `SELECT first_name, last_name 
    FROM customer 
    RIGHT JOIN
    (SELECT DISTINCT CustomerID
    FROM Review
    LEFT JOIN Request
    ON Review.Request_Ref = Request.Request_Ref) AS intermediate
    ON intermediate.CustomerID = customer.CustomerID;`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.get("/api/cottage/cottage_prices", (req, res) => {
  const sql_query = `SELECT Price FROM Cottage`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("App is running on port ", PORT);
});
