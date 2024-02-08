const db = require("../../database");
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
}

async function registerAdmin(username, email, password) {
  try {
    const hashedPassword = await hashPassword(password);

    const query =
      "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)";

    const result = await db.query(query, [username, email, hashedPassword]);
  } catch (error) {
    console.log("Error in registerAdmin:", error);
    throw error;
  }
}

async function loginAdmin(username, password) {
  try {
    const query = "SELECT password FROM admin WHERE username = ?";
    const result = await db.query(query, [username]);
    if (result[0][0]) {
      console.log("result[0][0]:", result[0][0]);
      const hashedPassword = result[0][0].password;
      const match = await verifyPassword(password, hashedPassword);
      if (match) {
        return {
          sucess: true,
          message: "Login Sucessfull",
        };
      } else {
        return { success: false, message: "Invalid password" };
      }
    }
  } catch (error) {
    console.log("Error in loginAdmin:", error);
    throw error;
  }
}

async function getAllAdmins() {
  try {
    const query = "SELECT * FROM admin";
    const result = await db.query(query);
    return result[0];
  } catch (error) {
    console.log("Error in getAllAdmins:", error);
    throw error;
  }
}

module.exports = { registerAdmin, loginAdmin, getAllAdmins };
