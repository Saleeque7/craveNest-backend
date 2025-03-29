import { NotFoundError ,ValidationError } from "../utils/middlewares/errorInstances.js";
export const refreshTokenController = (dependencies) => {
    return {
        refreshTOken: async (req, res, next) => {
            const { useCases: { tokenUseCase: { refreshUsecase } } } = dependencies
            try {
                const token = req.cookies.refreshToken;
                if (!token) {
                    throw new NotFoundError("token is unavialable");
                }

                const { executeFunction } = await refreshUsecase(dependencies)
                const result = await executeFunction(res, token)
                if (!result.success) {
                    throw new ValidationError("token creation failed")
                }
                return res.status(200).json({ accessToken: result.accessToken })
            } catch (error) {
                next(error);
            }
        }
    }
}
