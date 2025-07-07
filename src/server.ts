import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
let server : Server;
const port = 5000
const startServer = async()=>{
    try {
        await mongoose.connect("mongodb+srv://todouser:x7qUXaxOgtrhwWPG@cluster0.qo68l.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to DB")
        server = app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log("Error on server connection",error)
    }
}

startServer()