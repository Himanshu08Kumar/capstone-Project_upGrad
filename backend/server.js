import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import corsMiddleware from './middlewares/corsMiddleware.js';

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();
app.use(express.json());
app.use('*',cors())


// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://cute-cajeta-f3c776.netlify.app/");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   });

//   app.options("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://cute-cajeta-f3c776.netlify.app/");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.sendStatus(204);
//   });
  

// const corsOption= {
//     origin: 'http://localhost:5174', 
//     credentials: true,
// }

// app.use(cors(corsOption));

// app.options('*', cors(corsOption));



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