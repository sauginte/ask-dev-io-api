import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(req.body.password, salt);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: "Incorrect email format",
      });
    }

    const passwordRegex = /[0-9]/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({
        message: "Password must contain at least one number",
      });
    }

    const newUser = {
      ...req.body,
      id: uuidv4(),
      password: passwordHash,
      dateCreated: new Date(),
    };

    const response = await new UserModel(newUser);
    const data = await response.save();

    const token = jwt.sign(
      { userEmail: response.email, userId: response.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      user: data,
      jwtToken: token,
    });
  } catch (err) {
    const DUPLICATE_ERROR_CODE = 11000;

    if (err.code === DUPLICATE_ERROR_CODE) {
      return res
        .status(409)
        .json({ message: "User with this email already exist" });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};

const LOGIN_USER = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist or provided email is wrong",
      });
    }
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "User does not exist or provided password is wrong",
      });
    }

    const token = jwt.sign(
      { userEmail: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "User logged in successfully", jwtToken: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messgae: "Something went wrong" });
  }
};

const GET_USER_ID = (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (res.status === 401) {
        return res.json({ message: "Authorization problems (bad token)" });
      }
      return res.json({
        userId: decoded.userId,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messgae: "Something went wrong" });
  }
};

export { SIGN_UP, LOGIN_USER, GET_USER_ID };
