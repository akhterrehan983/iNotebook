var jwtSecret = "iNoteb@@k";
var jwt = require("jsonwebtoken");
const fetchUser = async (req, res, next) => {
  // console.log((req.header("authToken")))
  try {
    const token = req.header("authToken");
    if (token) {
      const decode = await jwt.verify(req.header("authToken"), jwtSecret);
      if (decode) {
        req.user = decode.user;
        next();
      }
    } else {
      res
        .status(500)
        .send({ error: "Pleasae authenticate using a valid token!!!" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Pleasae authenticate using a valid token!!!" });
  }
};

module.exports = fetchUser;
