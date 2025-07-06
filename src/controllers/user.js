import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";

export const INSERT_USER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      ...req.body,
      id: uuidv4(),
      password: passwordHash,
      dateCreated: new Date(),
    };

    const response = new UserModel(newUser);
    const data = await response.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: data });
  } catch (err) {
    console.log(err);
  }
};

export const LOGIN_USER = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist or provided email is wrong",
      });
    }
    const isPasswordMatch = bcrypt.compareSync(req.body.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "User does not exist or provided password is wrong",
      });
    }

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    console.log(err);
  }
};
