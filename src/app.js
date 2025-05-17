import express from "express";
import "dotenv/config"
import cors from "cors"
import mongoseDB_Connection from "./config/Databse_MongoDb_.js";
import fileUpload from "express-fileupload";
import userRouter from "./routers/rutes.js";
import errorMidllwares from "./midllwares/errorMidllwares.js";
import path from "path"

const app = express()
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(userRouter)
app.use("/logs",express.static(path.join(process.cwd(),"src","utils","Log","logger.txt")))
const initApp = async () => {
    let statusdb = await mongoseDB_Connection()
    if(statusdb){
        app.listen(15975,console.log("Server running "))
        app.use(errorMidllwares)
    }else{
        console.log("Bazaga ulanib bo'lmadi ! ")
    }
}
initApp()