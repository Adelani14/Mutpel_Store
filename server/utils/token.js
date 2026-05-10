import jwt from "jsonwebtoken";

export const CreateAccessToken = (userID, role) => {

    return jwt.sign(
        { userID, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "25m",
        }
    );

};



export const CreateRefreshToken = (userID, role) => {

    return jwt.sign(
        { userID, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );

};