import { Schemas } from "../entities/index.js"

export const userRepository = {

    finduserByEmail: async (email) => {
        try {
            const { User } = await Schemas;
            return await User.findOne({ email });
        } catch (error) {
            console.error(`Error finding user by email (${email}):`, error.message);
            throw error
        }
    },
    createUser: async(name,email) => {
        try {
            const { User } = await Schemas;
            const user = new User({ name, email });
            await user.save();
            return user;
        } catch (error) {
            console.error("error saving user" , error.message);
            throw error
        }
    },

}