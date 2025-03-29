import { checkCooldown, otpExist, saveOTP, verifyOTP, deleteOTP } from "../helpers/redisSetup.js"
import { sendVerifyMail } from "../helpers/verifyMail.js"
import { ValidationError } from "../utils/middlewares/errorInstances.js"
export const userUseCase = {
    addUserInfo: (dependencies) => {
        const { repositories: { userRepository: { finduserByEmail } } } = dependencies
        const executeFunction = async (name, email) => {
            try {
                const existingUser = await finduserByEmail(email)
                if (existingUser) {
                    throw new ValidationError("User already exists.");
                }
                const otpexist = await otpExist(email)
                if (otpexist) {
                    throw new ValidationError("An OTP has already been sent");
                }
                const cooldown = await checkCooldown(email)

                if (cooldown) {
                    throw new ValidationError("Please wait before requesting another OTP.");
                }

                const message = `Email verification`
                const otp = await sendVerifyMail(email, name, message)
                console.log(otp);

                if (otp) {
                    await saveOTP(email, otp);
                    return;
                } else {
                    throw new ValidationError("Failed to generate OTP. Please try again.");

                }

            } catch (error) {
                throw error;
            }
        }
        return { executeFunction }
    },
    verifyUsecase: (dependencies) => {
        const { repositories: { userRepository: { createUser } } } = dependencies
        const executeFunction = async (name, email, otp) => {
            try {
                const match = await verifyOTP(email, otp)
                if (!match.success) {
                    throw new ValidationError(match.message);
                }
                await deleteOTP(email)
                const user = await createUser(name, email);
                if (!user) {
                    throw new Error('Failed to create user. Please try again.');
                }

                return user;

            } catch (error) {
                throw error;
            }

        }
        return { executeFunction }
    },
    signinUsecase: (dependencies) => {
        const { repositories: { userRepository: { finduserByEmail } } } = dependencies
        const executeFunction = async (email) => {
            try {
                const user = await finduserByEmail(email)
                if (!user) {
                    throw new Error('Failed to login');
                }


                return user
            } catch (error) {
                throw error
            }
        }
        return { executeFunction }
    }
}