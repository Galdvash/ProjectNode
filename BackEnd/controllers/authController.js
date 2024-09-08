import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { email, password, isBusiness, isAdmin } = req.body;
    const user = new User({ email, password, isBusiness, isAdmin });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = jwt.sign(
      { id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
