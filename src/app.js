import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({                      // middleware configuration to parse incoming json requests from form data
    limit: "15kb"
}))
app.use(express.urlencoded({ extended: true, limit: "15kb" })) // middleware configuration for data coming from URL
app.use(express.static("public"))                // for serving static files like images, files etc

app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)
export {app}