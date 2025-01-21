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

//middlewares
app.use(cors({
    origin: 'https://legendary-banoffee-f0f5d4.netlify.app', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies/authentication headers if needed
}));
app.use(express.json());

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