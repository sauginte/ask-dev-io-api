import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  try {
    const userData = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(userData.password, salt);

    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
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
    console.log(err);
  }
};

const LOGIN_USER = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist or provided email is wrong",
      });
    }
    const isPasswordMatch = bcrypt.compareSync(
      userData.password,
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
  }
};

export { SIGN_UP, LOGIN_USER };
