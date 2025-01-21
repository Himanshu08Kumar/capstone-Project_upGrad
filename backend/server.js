import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();
app.use(express.json());

app.options('*', cors());

//middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
    

app.use(cors({
    origin: 'https://legendary-banoffee-f0f5d4.netlify.app', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allowed HTTP methods
}));


//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter)


app.get('/',(req, res) =>{
    res.send("Api working")
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})