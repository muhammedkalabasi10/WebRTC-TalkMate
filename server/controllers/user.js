const UserModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.errors[0].msg });
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const passwordCheck = await bcrypt.compare(password, existingUser.password);
    if (!passwordCheck)
      return res.status(400).json({ message: "Email or Password Invalid" });
    const accessToken = jwt.sign({ user: existingUser }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign({ user: email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  const { name, surName, email, phone, password } = req.body;
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.errors[0].msg });
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      name,
      surName,
      email,
      phone,
      password: hashedPassword,
    });
    const accessToken = jwt.sign({ user: user }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(
      { user: user.email },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { name, surName, email, phone, password } = req.body;
  const { id: _id } = await req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.errors[0].msg });
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { name, surName, email, phone, password: hashedPassword, _id },
      { new: true }
    );
    const accessToken = jwt.sign({ user: updatedUser }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign({ user: email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      overwrite: true,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorizedd" });
  const refreshToken = cookies.jwt;
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const foundUser = await UserModel.findOne({ email: decoded.user }).exec();
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
    const accessToken = jwt.sign({ user: foundUser }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    res.json({ accessToken });
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = { signIn, signUp, updateUser, refresh, logout };
