import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import "dotenv/config";


const app = express();




app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://fe-perpus194dan207-dot-fit-crow-450802-e0.uc.r.appspot.com",
    "https://perpus-syifa194naufal207-797713225706.us-central1.run.app",
    "https://storage.cloud.google.com/perpustakaan194207/perpus2.jpg?authuser=1",
    "https://storage.cloud.google.com/perpustakaan194207/perpus.jpg?authuser=1"
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use(UserRoute);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
