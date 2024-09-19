// authController.js

import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// פונקציה לרישום משתמש חדש
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address, isBusiness, image } =
      req.body;

    // בדיקה אם כל השדות הנדרשים קיימים
    if (!email || !password || !name || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש עם isAdmin מוגדר ל-false
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      isBusiness,
      isAdmin: false, // הגדרה ידנית ל-false
      image,
    });

    // שמירת המשתמש במסד הנתונים
    await user.save();

    // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      process.env.JWT_SECRET, // וודא ש-JWT_SECRET מוגדר בקובץ .env שלך
      { expiresIn: "1h" } // הטוקן יפוג לאחר שעה
    );

    // שליחת התשובה עם הטוקן שנוצר
    res.status(201).json({ token });
  } catch (error) {
    console.log(error); // רישום השגיאה בקונסול
    res.status(500).json({ error: error.message });
  }
};

// פונקציה להתחברות משתמש
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error); // רישום השגיאה לקונסול
    res.status(500).json({ error: error.message });
  }
};
