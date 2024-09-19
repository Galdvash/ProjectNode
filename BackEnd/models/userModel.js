import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true }, // first name חובה
    middle: { type: String },
    last: { type: String, required: true }, // last name חובה
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // טלפון חובה
  password: { type: String, required: true },
  address: {
    state: { type: String },
    country: { type: String, required: true }, // country חובה
    city: { type: String, required: true }, // city חובה
    street: { type: String, required: true }, // street חובה
    houseNumber: { type: String, required: true }, // houseNumber חובה
  },
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  image: {
    url: { type: String },
    alt: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
