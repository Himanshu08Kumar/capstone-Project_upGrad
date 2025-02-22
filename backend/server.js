// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRoute.js";
// import corsMiddleware from "./middlewares/corsMiddleware.js";

// //app config
// const corsOptions = {
//   origin: "*", // your frontend URL (localhost during dev or production domain)
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// const app = express();
// const port = process.env.PORT || 3000;
// connectDB();
// connectCloudinary();
// app.use('*',cors(corsOptions));
// app.use(express.json());

// // app.use((req, res, next) => {
// //     res.setHeader("Access-Control-Allow-Origin", "https://cute-cajeta-f3c776.netlify.app/");
// //     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
// //     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// //     next();
// //   });

// //   app.options("/", (req, res) => {
// //     res.setHeader("Access-Control-Allow-Origin", "https://cute-cajeta-f3c776.netlify.app/");
// //     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
// //     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// //     res.sendStatus(204);
// //   });

// // const corsOption= {
// //     origin: 'http://localhost:5174',
// //     credentials: true,
// // }

// // app.use(cors(corsOption));

// // app.options('*', cors(corsOption));

// //api endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//   res.send("Api working");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5174/",  // ✅ Allow frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // ✅ Allow cookies/auth headers
};

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Apply CORS middleware before routes
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS request)
app.options("*", cors(corsOptions));

// ✅ Parse incoming JSON data
app.use(express.json());

// ✅ API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
