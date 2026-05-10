// const jwt = require("jsonwebtoken");
// import e from "cors";
import cors from "cors";
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = payload;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized"
        });

    }
};

// module.exports = isAuth;
export default isAuth;