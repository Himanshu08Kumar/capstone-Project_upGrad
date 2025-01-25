// import jwt from "jsonwebtoken";

// //admin authentication middleware

// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers.token;
//     if (!atoken) {
//       return res.json({ success: false, msg: "Unauthorized" });
//     }
//     const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
//     if (
//       token_decoded !==
//       process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
//     ) {
//       return res.json({ success: false, msg: "Unauthorized" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authAdmin;


import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    // Assuming the token is sent as "Authorization: Bearer <token>"
    const { authorization } = req.headers;

    // Check if the token is provided in the Authorization header
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.json({ success: false, msg: "Unauthorized, token missing or malformed" });
    }

    const token = authorization.split(' ')[1]; // Get token after "Bearer"

    // Verify the token using the secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token has the expected admin email or role
    // if (decodedToken.email !== process.env.ADMIN_EMAIL) {
    //   return res.json({ success: false, msg: "Unauthorized, invalid admin email" });
    // }

    // You can also check the role if your token contains a "role" property
    // if (decodedToken.role !== 'admin') {
    //   return res.json({ success: false, msg: "Unauthorized, invalid role" });
    // }

    // Proceed to the next middleware or route handler if the admin is authenticated
    next();
  } catch (error) {
    console.log(error);
    // Return error if the token verification fails or other errors occur
    return res.json({ success: false, msg: error.message || "Authentication error" });
  }
};

export default authAdmin;