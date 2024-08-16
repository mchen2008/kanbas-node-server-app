import express from 'express'
import Hello from "./Hello.js"
import Lab5 from './Lab5/index.js'
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentsRoutes from './Kanbas/Assignments/routes.js';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";

import "dotenv/config";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

//const CONNECTION_STRING = "mongodb+srv://alice321321:manchen@kanbas.aa7x4.mongodb.net/Kanbas?retryWrites=true&w=majority&appName=Kanbas"

try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("db connected", CONNECTION_STRING)
    
  }
  catch (error) {
    console.error(error);
  }


const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);


const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000)
