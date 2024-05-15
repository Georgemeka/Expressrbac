const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
      // Authorization: Bearer: 19skdhriahdkrhai3iakdhrkalkdh
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.roles)) {
    return res.status(403).json({ message: "Unauthorized!" });
  }
  next();
};
