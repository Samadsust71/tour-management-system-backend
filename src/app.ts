import express, { Request, Response } from "express"
import expressSession from "express-session"
import cors from "cors"
import { router } from "./app/routes"
import passport from "passport"
import "./app/config/passport"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import cookieParser from "cookie-parser"
import { envVars } from "./app/config/env"




const app = express()

app.use(expressSession({
      secret:envVars.EXPRESS_SESSION_SECRET,
      resave:false,
      saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1", router)
app.get("/", (req:Request, res:Response)=>{
      res.status(200).json({message : "Welcome to Tour Management System App Backend"})
})

app.use(globalErrorHandler)

app.use(notFound)

export default app