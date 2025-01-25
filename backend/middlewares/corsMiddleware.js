// corsMiddleware.js

const corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Credentials", true); // Allow credentials
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow HTTP methods
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Access-Control-Allow-Origin"
    ); // Allowed headers
  
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).json({});
    }
  
    next();
  };
  
  export default corsMiddleware;
  