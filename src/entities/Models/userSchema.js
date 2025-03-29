import mongoose from "mongoose";
import { validateSchema } from "../../helpers/schemaValidations.js";

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    isBlock:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true, })
userSchema.pre('save', validateSchema);


export const User = mongoose.model('User',userSchema)