import { User } from "../models/userModel.js"; // ייבוא המודל של המשתמש

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // שליפת כל המשתמשים
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // שליפת משתמש לפי מזהה
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // הסרת isAdmin מ-req.body כדי למנוע עדכון שלו
    const { isAdmin, ...updateData } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // בדיקה אם המשתמש הוא אדמין
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // עדכון המשתמש עם הנתונים המעודכנים
    Object.assign(user, updateData);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const { isAdmin, isBusiness, password, ...updateData } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (updateData.address) {
      user.address = { ...user.address, ...updateData.address };
      delete updateData.address;
    }

    Object.assign(user, updateData);

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
