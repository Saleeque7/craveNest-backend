import { ValidationError , NotFoundError , UnauthorizedError } from "./errorInstances.js";
export const errorMiddleware  = (err, req, res, next) => {
    if (err instanceof ValidationError || 
        err instanceof NotFoundError || 
        err instanceof UnauthorizedError) {
        
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    console.error("Unexpected Error:", err); 
    res.status(500).json({
        success: false,
        error: 'Something went wrong on the server.',
        message: err.message,
    });
}
