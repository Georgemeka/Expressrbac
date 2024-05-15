const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  //req.headers req.body req.params
  try {
    const { username, password, roles } = req.body;

    const user = new User({ username, password, roles });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.correctPassword(password))) {
      return res
        .status(401)
        .json({ message: "Username or password not correct" });
    }

    //jwt.sign(payload, secret_key, {options})
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = (req, res) => {
  res.json(req.user);
};
