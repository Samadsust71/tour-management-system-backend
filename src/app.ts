import express, { Request, Response } from "express"
import cors from "cors"
const app = express()
app.use(cors())
app.get("/", (req:Request, res:Response)=>{
      res.status(200).json({message : "Welcome to Tour Management System App Backend"})
})



export default app