
import jwt from "jsonwebtoken";
import config from "../config/config.js";

 
const generateAccessToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "1d",
    });
};
const generateRefreshToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "30d",
    });
};
export const generateToken = (res, data ,userRole) => {

    const payLoad = {
        id: data,
        role: userRole,
    }
    console.log(payLoad);


    const accessToken = generateAccessToken(payLoad);
    const refreshToken = generateRefreshToken(payLoad);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:true,
        sameSite: 'Strict',    
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })

    return {
        accessToken
    };
};




