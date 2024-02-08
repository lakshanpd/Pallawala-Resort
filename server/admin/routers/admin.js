const express = require("express");
const db = require("../../database");
const { registerAdmin } = require("../service/admin");
const router = express.Router();

// Route for user registration (create new admin)
router.post("admin/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    registerAdmin(username, email, password);
    console.log("Admin registered successfully!");
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Error registering admin" });
  }
});

module.exports = router;
