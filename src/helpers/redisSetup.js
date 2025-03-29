import { redisClient } from "../utils/redis/redisconfig.js";
import crypto from 'crypto'


export const saveOTP = async (email, otp, expiry = 300) => {
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
  await redisClient.set(`otp:${email}`, hashedOtp, { EX: expiry });
};


export const verifyOTP = async (email, inputOtp) => {
  const storedHashedOtp = await redisClient.get(`otp:${email}`);
  if (!storedHashedOtp) {
    return {
      success: false,
      message: 'OTP expired!'
    };
  }

  const hashedInputOtp = crypto.createHash('sha256').update(inputOtp).digest('hex');

  if (storedHashedOtp !== hashedInputOtp) {
    return {
      success: false,
      message: 'Invalid OTP. Please try again.'
    };
  }


  return {
    success: true,
    message: 'OTP verified successfully.'
  };
};

export const otpExist = async (email) => {
  return await redisClient.get(`otp:${email}`);
}

export const checkCooldown = async (email) => {
  const cooldownKey = `cooldown:${email}`;
  const cooldown = await redisClient.get(cooldownKey);
  return cooldown
}

export const deleteOTP = async (email) => {
  await redisClient.del(`otp:${email}`);
};



// Step 2: Cooldown logic (Prevents frequent OTP requests)

