
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { saveRefreshToken } from "./redisTokenSetup.js";

const generateAccessToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "1m",
    });
};
const generateRefreshToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "30d",
    });
};
export const generateToken = async( data) => {

    const payLoad = {
        id: data,
    }
    console.log(payLoad, "pay");


    const accessToken = await generateAccessToken(payLoad);
    const refreshToken = await generateRefreshToken(payLoad);

    await saveRefreshToken(payLoad,refreshToken)

    return {
        accessToken
    };
};




