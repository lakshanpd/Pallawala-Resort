const express = require("express");
const db = require("../../database");
const { registerAdmin, getAllAdmins } = require("../service/admin");
const verifyAdmin = require("../middlewares/adminAuth_middleware");
const router = express.Router();

// Route for user registration (create new admin)
router.post("/admin/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await registerAdmin(username, email, password);
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Error registering admin" });
  }
});

// Route to authenticate Admin user
router.get("/admin/authenticate", verifyAdmin, (req, res) => {
  try {
    console.log("Come to the server");
    console.log(req.user);
    console.log(req.accessToken);
    res
      .status(200)
      .json({ success: true, message: "Admin authenticated successfully!" });
  } catch (error) {
    console.log("Error authenticating admin:", error);
    res
      .status(500)
      .json({ message: "Error authenticating admin", error: error });
  }
});

// Route to get all users
router.get("/admin/users", verifyAdmin, (req, res) => {
  try {
    const result = getAllAdmins();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ message: "Error getting all users", error: error });
  }
});

module.exports = router;
