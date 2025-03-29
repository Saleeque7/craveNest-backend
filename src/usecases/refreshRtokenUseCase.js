import config from "../config/config.js";
import { generateToken } from "../helpers/generateToken.js"
import jwt from 'jsonwebtoken'

export const tokenUseCase = { 
    refreshUsecase : (dependencies)=>{
        const executeFunction = async (res , token ) => {
           
            try {
                const decoded = jwt.verify(token, config.JWT_SECRET)
                const id = decoded.data.id;
                const { accessToken } = await generateToken(res, id)
                
                if (!accessToken) {
                    throw new Error('error in token generating.');
                }
    
                return { success: true, accessToken }  
            } catch (error) {
                throw error;
            }
        }

        return {executeFunction}
    }
}