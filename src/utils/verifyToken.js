const jwt = require("jsonwebtoken");

const verify = async (req, res) => {
  console.log("inside verify token");
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    console.log("no token");
    return res.status(401).json({ valid: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("error");
      return res.status(401).json({ valid: false });
    }

    const userId = decoded.userId;
    console.log("valid token");
    return res.json({ valid: true, userId });
  });
};

module.exports = { verify };
