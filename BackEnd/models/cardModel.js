import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  web: { type: String, required: false },
  image: {
    url: { type: String, required: false },
    alt: { type: String, required: false },
  },
  address: {
    state: { type: String, required: false },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
