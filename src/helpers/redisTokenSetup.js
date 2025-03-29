import { redisClient } from "../utils/redis/redisconfig.js";
export const saveRefreshToken = async (userId, refreshToken, expiry = 2592000) => {
    await redisClient.set(`refreshToken:${userId}`, refreshToken, { EX: expiry }); 
};

export const deleteRefreshToken = async (userId) => {
    await redisClient.del(`refreshToken:${userId}`);
};
