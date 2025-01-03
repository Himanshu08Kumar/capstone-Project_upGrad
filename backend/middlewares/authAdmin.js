import jwt from "jsonwebtoken";

//admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ sucess: false, msg: "Unauthorized" });
    }
    const token_decoded = jwt.verify(atoken, process.env.SECRET_KEY);
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ sucess: false, msg: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export default authAdmin;
