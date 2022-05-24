const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const usersModel = require("../models/usersModel");
const { sendVerificationEmail } = require("../utils/mailersUtils");
const { generateToken } = require("../utils/tokensUtil");
const {
  validateEmail,
  validateLength,
  validateUniqueUsername,
  validateUniqueEmail,
} = require("../utils/validationsUtil");

const { BASE_URL, TOKEN_SECRET } = process.env;

async function httpRegisterNewAccount(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    } = req.body;

    // Check whether the firstName length is invalid
    if (!validateLength(firstName, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characeters",
      });
    }

    // Check whether the lastName length is invalid
    if (!validateLength(lastName, 3, 30)) {
      return res.status(400).json({
        message: "last name must be between 3 and 30 characeters",
      });
    }

    // Check whether the email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    // Check whether the email is unique
    if (!(await validateUniqueEmail(email))) {
      return res.status(400).json({
        message: "the email address is already exists, try with another one",
      });
    }

    // Check whether the username is unique
    if (!(await validateUniqueUsername(username))) {
      return res.status(400).json({
        message: "the username is already exists, try with another one",
      });
    }

    // Check whether the password length is valid
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "last name must be between 6 and 40 characeters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);

    const user = await new usersModel({
      firstName,
      lastName,
      email,
      password,
      username,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    return res.status(200).send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      verified: user.verified,
      message: "Register Success ! Please Activate Your Email",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function httpActivateNewAccount(req, res) {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, TOKEN_SECRET);

    // Check the email is activated
    if ((await usersModel.findById(user.id)).verified) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    }

    await usersModel.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has been activated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function httpLoginToAccount(req, res) {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    // Check the email is existed
    if (!user) {
      return res.status(400).json({
        message: "The email you entered is not connected to an account",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      verified: user.verified,
      message: "Login success",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  httpRegisterNewAccount,
  httpActivateNewAccount,
  httpLoginToAccount,
};
