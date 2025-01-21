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

app.use(cors({
    origin: 'https://ubiquitous-sprite-b4a2e0.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, // Allowed HTTP methods
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://ubiquitous-sprite-b4a2e0.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://ubiquitous-sprite-b4a2e0.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});



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