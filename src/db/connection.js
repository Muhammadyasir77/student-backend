import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const dbConnection = async () => {
    try {
        const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        console.log(`\nMongoDB connected!! DB Host: ${conectionInstance.connection.host}`)

    } catch(error) {
        console.log("Error while connecting to MongoDB",error)
        process.exit(1)
    }
}

export default dbConnection