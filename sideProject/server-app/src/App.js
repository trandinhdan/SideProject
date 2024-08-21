const express = require("express");
const userRoute = require("../routes/userRoute");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
    .connect(
        "mongodb+srv://hellochaome:Trandinhdan99885515@firstdemo.szodl.mongodb.net/?retryWrites=true&w=majority&appName=firstdemo"
    )
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(5000, () => console.log("Server running on port 5000"));