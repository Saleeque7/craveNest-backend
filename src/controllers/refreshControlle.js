export const refreshTokenController  =( dependencies) =>{
    return {
        refreshTOken : async(req,res,next)=>{
            const { useCases: { authUseCase: { refreshUsecase } } } = dependencies
            try {
                const { executeFunction } = await refreshUsecase(dependencies)
                const result = await executeFunction(res, token)
                if (!result.success) {
                    return res.status(result.statusCode).json({ message: result.message || 'Forbidden' })
                }
                return res.status(200).json({ accessToken: result.accessToken })
            } catch (error) {
                next(error);
            }
        }
    }
}
