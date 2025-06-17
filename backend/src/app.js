import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// const start = async () => {
//     app.set("mongo_user")
//     const connectionDb = await mongoose.connect("mongodb+srv://ankitdasad03:C54fGCdL7m3rzpnm@cluster0.hluw2s9.mongodb.net/")

//     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
//     server.listen(app.get("port"), () => {
//         console.log("LISTENIN ON PORT 8000")
//     });



// }



// start();

//const link = "mongodb+srv://ankitdasad03:<db_password>@cluster0.hluw2s9.mongodb.net/"
// cont mainlink = "mongodb+srv://ankitdasad03:C54fGCdL7m3rzpnm@cluster0.hluw2s9.mongodb.net/"

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server is running on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit with error code for Render logs
  }
};

start();

