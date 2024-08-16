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

console.log("connection_string:", CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);
// import {MongoClient, ServerApiVersion} from "mongodb";

//const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://alice321321:manchen@kanbas.aa7x4.mongodb.net/Kanbas?retryWrites=true&w=majority&appName=Kanbas";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


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
