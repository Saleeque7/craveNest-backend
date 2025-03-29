import express from  'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import helmet from 'helmet'
import config from './config/config.js'
import dependencies from './utils/dependencies.js'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './utils/middlewares/errorHandlingMiddleware.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser());
app.use(cors({
    origin: config.baseURL, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],  
    credentials: true 
}));



app.use('/',routes(dependencies))
app.use(errorMiddleware)

export {app}