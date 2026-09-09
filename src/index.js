import dotenv from "dotenv"
import dbConnection from "./db/connection.js"
import dns from "node:dns"

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

dotenv.config({
    path: "./.env"
})


dbConnection()






// import express from "express"
// const app = express()

// ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//         app.on("error",(error) => {
//             console.log("Error while connecting to express", error)
//             throw error
//         })
//         app.listen(process.env.PORT,(req, res) => {
//             console.log(`server is running on PORT ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("Error while connecting to MongoDB", error)
//         throw error
//     }
// })()