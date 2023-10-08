import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// routes
import alert from "./routes/alert.js";

const app = express();
dotenv.config();


app.use(express.json()); 
app.use(helmet()); 
app.use(cookieParser()); // To handle jwt token from the cookie 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // To check speed in dev
app.use(morgan("dev"));    // ""
app.use(express.json({ limit: '1mb' })); //Limit on the json data from Source to stay safe from crash and memory run out
app.use(express.urlencoded({ limit: '1mb', extended: true })); //Limit on the json data from Source to stay safe from crash and memory run out
app.use(cors());
app.disable("x-powered-by");  //To hide backend stack from the hacker's




app.use('/v1/alert', alert)
app.get('/status',(req,res)=>{
  res.status(200).json({
    stat:"OK",
    error: "",
    Verified:false,
    message:"Server is running fine"
  })
})


// Define the options for the database connection
const DB_OPTIONS = {
    dbName: 'ottoBot',        // Specify the database name
    maxPoolSize: 10,       // Set the maximum pool size
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const PORT = process.env.port || 5001;


mongoose.connect(process.env.mongourl,DB_OPTIONS)
  .then(() => {
    app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}\non Process Id : ${process.pid}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

