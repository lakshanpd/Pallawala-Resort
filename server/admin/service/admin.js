const db = require("../../database");

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

module.exports = { registerAdmin };
