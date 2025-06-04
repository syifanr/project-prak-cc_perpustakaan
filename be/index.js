import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import "dotenv/config";


const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:8080", // Localhost URL for local development
    "https://fe-perpus194dan207-dot-fit-crow-450802-e0.uc.r.appspot.com", // URL of the frontend deployed
    "https://perpus-syifa194naufal207-797713225706.us-central1.run.app", // URL of the backend deployed
  ],
  credentials: true, // Allow sending cookies/credentials with requests
  methods: ['GET', 'POST', 'OPTIONS'], // Mengizinkan metode GET, POST, dan OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Mengizinkan header tertentu
}));

app.use(cookieParser());
app.use(express.json());

app.use(UserRoute);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
