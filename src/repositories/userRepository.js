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
    createUser: async (name, email) => {
        try {
            const { User } = await Schemas;
            const user = new User({ name, email });
            await user.save();
            return user;
        } catch (error) {
            console.error("error saving user", error.message);
            throw error
        }
    },
    updateUserProfile: async (id, name, email) => {
        try {
            const { User } = await Schemas;

            const updatedData = {
                name: name,
                email: email
            }
            const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
            console.log(user);
            
            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            console.error("error saving user", error.message);
            throw error
        }
    },

}