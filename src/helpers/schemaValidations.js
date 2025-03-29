import { ValidationError } from "../utils/middlewares/errorInstances.js";
export const validateSchema = function (next) {
    if (this.isModified('email') && this.email) {
        this.email = this.email.toLowerCase().trim();

        if (!this.email.includes('@')) {
            return next(new ValidationError('Invalid email format.'));
        }
    }
    next();
};