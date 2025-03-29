import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import config from "./config/config.js";
import { connectRedis } from "./utils/redis/redisconfig.js";

const start = async()=>{
    try {
        connectDb()
        console.log("db connected");
        connectRedis()
        console.log("redis connected");
     
    } catch (error) {
        console.log("error in connecting db");   
    }
    app.listen(config.PORT,()=>{
        console.log(`http://localhost:${config.PORT}`); 
    })
}

start()