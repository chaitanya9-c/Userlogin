const bcrypt = require("bcryptjs");

const {
  createUser,
  findUserByEmail,
  findUserByMobile,
} = require("../models/userModel");

const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const registerUser = async (req, res) => {
    console.log("BODY:", req.body);
  try {
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      gender,
      date_of_birth,
      password,
    } = req.body;

    if (!/^\d{10}$/.test(mobile_number)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits",
      });
    }

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const existingMobile = 
      await findUserByMobile(mobile_number);

    if (existingMobile) {
      return res.status(400).json({
    message: "Mobile number already exists",
    });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await createUser(
      first_name,
      last_name,
      email,
      mobile_number,
      gender,
      date_of_birth,
      hashedPassword
    );

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
  };

module.exports = {
  registerUser,
  loginUser,
};