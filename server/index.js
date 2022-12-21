import connectToMongo from "./connectToMongo.js";
import express from "express";
import cors from "cors";

//Routes Import
import authRoute from "./routes/auth.js"
import cartRoute from "./routes/cart.js"

//Connection to Mongo DataBase
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//Middleware to use (req,res) in json
app.use(express.json());

//Available Routes
app.use("/api/auth", authRoute)
app.use("/api/cart", cartRoute)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})