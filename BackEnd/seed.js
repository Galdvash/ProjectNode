import mongoose from "mongoose";
import chalk from "chalk"; // ייבוא Chalk
import { User } from "./models/userModel.js";
import { Card } from "./models/cardModel.js";
import dotenv from "dotenv";

dotenv.config(); // טעינת משתני סביבה מ-.env

// חיבור ל-MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/NodeDataBase")
  .then(() => {
    console.log(chalk.green("MongoDB connected successfully!"));
    createSeedData(); // הרצת פונקציית ה-seed לאחר החיבור
  })
  .catch((error) => {
    console.error(chalk.red(`MongoDB connection error: ${error.message}`));
    process.exit(1);
  });

const seedUsers = [
  {
    name: { first: "John", middle: "M", last: "Doe" },
    email: "john.doe@example.com",
    phone: "123456789",
    password: "password123",
    address: {
      state: "California",
      country: "USA",
      city: "San Francisco",
      street: "Market",
      houseNumber: "100",
    },
    isBusiness: false,
    isAdmin: true,
    image: { url: "http://example.com/john.jpg", alt: "John's Image" },
  },
];

const seedCards = [
  {
    title: "Business Card 1",
    subtitle: "Best Services",
    description: "We provide the best services.",
    phone: "123456789",
    email: "business@example.com",
    web: "http://example.com",
    address: {
      state: "California",
      country: "USA",
      city: "San Francisco",
      street: "Market",
      houseNumber: "101",
    },
    image: { url: "http://example.com/logo1.png", alt: "Business Logo" },
    createdBy: "replace_with_user_id",
  },
];

const createSeedData = async () => {
  try {
    await User.deleteMany({});
    await Card.deleteMany({});

    console.log(
      chalk.yellow("Deleted existing users and cards from the database.")
    );

    const users = await User.insertMany(seedUsers);
    const userId = users[0]._id;

    console.log(chalk.green("Users seeded successfully!"));

    seedCards.forEach((card) => (card.createdBy = userId));
    await Card.insertMany(seedCards);

    console.log(chalk.green("Cards seeded successfully!"));
    process.exit();
  } catch (error) {
    console.error(chalk.red(`Error seeding data: ${error.message}`));
    process.exit(1);
  }
};
