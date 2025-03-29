import { ValidationError } from "../utils/middlewares/errorInstances.js";
import { generateToken } from "../helpers/generateToken.js";
export const userControllers = (dependencies) => {
    return {
        registerUser: async (req, res, next) => {
            const { name, email } = req.body;
            const { useCases: { userUseCase: { addUserInfo } } } = dependencies;

            try {

                if (!name || !name.trim()) {
                    throw new ValidationError("User name is required.");
                }
                if (!email || !email.trim()) {
                    throw new ValidationError("Email is required.");
                }

                const { executeFunction } = await addUserInfo(dependencies);


                await executeFunction(name, email);

                return res.status(201).json({
                    success: true,
                    message: "please verify otp."
                });

            } catch (error) {
                next(error)
            }
        },
        verifyRegisteration: async (req, res, next) => {
            const { name, email, otp } = req.body
            const { useCases: { userUseCase: { verifyUsecase } } } = dependencies
            try {
                if (!otp || !otp.trim()) {
                    throw new ValidationError("otp is required.");
                }
                const { executeFunction } = await verifyUsecase(dependencies)
                const user = await executeFunction(name, email, otp)
                const { accessToken } = await generateToken(res, user._id ,"user")
                
                return res.status(201).json({
                    success: true,
                    message: "registration successFull",
                    user: user,
                    accessToken:accessToken
                });

            } catch (error) {
                next(error)
            }
        },
        siginController: async (req, res, next) => {
            const { useCases: { userUseCase: { signinUsecase } } } = dependencies;

            const { username } = req.body
            try {
                if (!username || !username.trim()) {
                    throw new ValidationError("Email is required.");
                }

                const { executeFunction } = await signinUsecase(dependencies)
               const user = await executeFunction(username)
               const { accessToken } = await generateToken(res, user._id , "user")
                
                return res.status(201).json({
                    success: true,
                    message: "success",
                    user: user,
                    accessToken:accessToken
                });
            } catch (error) {
                next(error)
            }
        },
        updateProfileController: async (req, res, next) => {

            const userId  = req.userId
            const {name  , email  }= req.body
            const { useCases: { userUseCase: { updateProfileUsecase } } } = dependencies;
            

            try {
                if (!name || !name.trim()) {
                    throw new ValidationError("name is required.");
                }
                if (!email || !email.trim()) {
                    throw new ValidationError("Email is required.");
                }

                const { executeFunction } = await updateProfileUsecase(dependencies)
               const user = await executeFunction(userId , name ,email)

                return res.status(201).json({
                    success: true,
                    message: "success",
                    user: user
                });
            } catch (error) {
                next(error)
            }
        },
        verifyEmail: async (req, res, next) => {

            const userId  = req.userId
            const {  email  }= req.body
            const { useCases: { userUseCase: { changeEmailUsecase } } } = dependencies;
            
            try {
             
                if (!email || !email.trim()) {
                    throw new ValidationError("Email is required.");
                }

                const { executeFunction } = await changeEmailUsecase(dependencies)
               await executeFunction(email)

                return res.status(201).json({
                    success: true,
                    message: "success",
                });
            } catch (error) {
                next(error)
            }
        },
        verifyOtp: async (req, res, next) => {
            const { email ,otp } = req.body
            const { useCases: { userUseCase: { verifyotpUsecase } } } = dependencies
            try {
                if (!otp || !otp.trim()) {
                    throw new ValidationError("otp is required.");
                }
                const { executeFunction } = await verifyotpUsecase(dependencies)
                const user = await executeFunction(email , otp)
              
                return res.status(201).json({
                    success: true,
                    message: "verification success ",
 
                });

            } catch (error) {
                next(error)
            }
        },
    };
};
