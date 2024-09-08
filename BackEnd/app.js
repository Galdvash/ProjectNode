import express from "express";
import authMiddleware from "./middleware/authMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(authMiddleware);

// Other routes would be here

app.use(errorMiddleware);

export default app;
