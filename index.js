import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import tireRoute from "./route/tire.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
// connect  to mongoDB
try {
    mongoose.connect(URI,{
        useNewURlParser: true ,
        useUnifiedTopology: true
    });
    console.log("Connected to mongoDB")
} catch (error) {
    console.log("Error: " , error);
}

// Root route
app.get("/", (req, res) => {
    res.send("Backend çalışıyor");
});

app.use("/tire", tireRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})