import express, { json } from 'express';
import router from './Routes/itemRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import mongoose from 'mongoose';
import process from 'process';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173/addItems',
}));
const PORT = process.env.PORT || 3000;
// Middleware setup
app.use(json());
app.use(express.json({ limit: '20mb' })); // Increase limit as needed
app.use(express.urlencoded({ limit: '20mb', extended: true })); // Add this for form data

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", router);