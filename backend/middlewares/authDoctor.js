import jwt from "jsonwebtoken";

//doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const { dToken } = req.headers;
    if (!dToken) {
      return res.json({ success: false, msg: "Unauthorized" });
    }
    const token_decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    req.body.docId = token_decoded.id
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
