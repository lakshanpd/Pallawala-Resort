const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginAdmin } = require("../service/admin");
const router = express.Router();

const secretKey = "eshan_key";

router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await loginAdmin(username, password);
  if (result.sucess) {
    const accessToken = jwt.sign({ user: username }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ user: username }, secretKey, {
      expiresIn: "1d",
    });
    //save token in cookie
    //res.cookie("authcookie", token, { httpOnly: true });
    res.json({
      ...result,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
});
module.exports = router;
