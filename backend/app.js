import express from "express"
import chatapi from "./router/chatapi.js"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
app.use("/api/chat" , chatapi)

app.listen(PORT , ()=> {
    try {
        console.log("Server is running in port: " , PORT)
    } catch (error) {
        console.log("Error while starting the port: ", error)
    }
})

