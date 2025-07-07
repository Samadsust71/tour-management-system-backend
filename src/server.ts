import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const port = 5000;
const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://todouser:x7qUXaxOgtrhwWPG@cluster0.qo68l.mongodb.net/tour-management-system-db?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to DB");
    server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error on server connection", error);
  }
};

startServer();

// for catching Unhandled promise error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected....Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//for catching uncaught exception error
process.on("uncaughtException", (err)=>{
  console.log("Uncaught exception caught... Server shutting down", err)
  if (server) {
    server.close(()=>{
        process.exit(1)
    })
  }
  process.exit(1)
})

// for catching signal termination
process.on("SIGTERM", ()=>{
    console.log("SIGTERM signal received... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})
