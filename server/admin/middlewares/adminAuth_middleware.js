const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "eshan_key";

function verifyAdmin(req, res, next) {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.headers["refresh-token"];

  console.log(accessToken);
  console.log(refreshToken);

  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Invalid refresh token" });

      const newAccessToken = jwt.sign({ user: decoded.user }, SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log("newAccessToken Created --------  :", newAccessToken);
      req.accessToken = newAccessToken;
      req.user = decoded.user;
      next();
    });
  } else {
    jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
}

module.exports = verifyAdmin;
