import { Schemas } from "../entities/index.js"
export const adminRepository = {
    findAdminByEmail: async (email) => {
        try {
            const { User } = await Schemas;
            return await User.findOne({ email, isAdmin: true });
        } catch (error) {
            console.error(`Error finding user by email (${email}):`, error.message);
            throw error
        }
    },
    fetchUsersrepo: async () => {
        try {
            const { User } = await Schemas;
            const users = await User.find();
            return users;

        } catch (error) {
            console.error("Error finding users", error.message);
            throw error
        }
    },
    updateUsersrepo: async (userId, isAdmin) => {
        try {
            const { User } = await Schemas;


            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { isAdmin },
                { new: true }
            );

            return updatedUser;

        } catch (error) {
            console.error("Error updating user:", error.message);
            throw error;
        }
    },
    addCategoryRepo: async (name, parent) => {
        try {
            const { Category } = await Schemas;
            const lowerCaseName = name.toLowerCase();
            const newCategory = new Category({ name: lowerCaseName, parent: parent || null });

            if (parent) {
                await Category.findByIdAndUpdate(parent, {
                    $push: { children: newCategory._id }
                });
            }

            await newCategory.save();
            return newCategory;

        } catch (error) {
            console.error("Error updating user:", error.message);
            throw error;
        }
    },
    getCategoryRepo: async (name, parent) => {
        try {
            const { Category } = await Schemas;

            const categories = await Category.find().populate('children').lean();
            const buildTree = (categories, parentId = null) =>
                categories
                    .filter(cat => String(cat.parent) === String(parentId))
                    .map(cat => ({
                        ...cat,
                        children: buildTree(categories, cat._id)
                    }));

            const categoryTree = buildTree(categories);
            return categoryTree;

        } catch (error) {
            console.error("Error in browse category", error.message);
            throw error;
        }
    },
    updateCategoryRepo: async (id,name,parentId) => {
        try {
            const { Category } = await Schemas;

            const updatedCategory = await Category.findByIdAndUpdate(id, { name, parent: parentId }, { new: true });

            return updatedCategory;

        } catch (error) {
            console.error("Error updating category:", error.message);
            throw error;
        }
    },
    deleteCategoryRepo: async (id) => {
        const { Category } = await Schemas;
        const deleteRecursive = async (categoryId) => {

            const category = await Category.findById(categoryId);

            if (category.children.length > 0) {
                for (const childId of category.children) {
                    await deleteRecursive(childId);
                }
            }

            await Category.findByIdAndDelete(categoryId);
        };
        try {
            await deleteRecursive(id);
            return;

        } catch (error) {
            console.error("Errorin delete category", error.message);
            throw error;
        }
    },
    getCategoryByNameRepo: async (name, parent = null) => {
        try {
            const { Category } = await Schemas;
    
            const normalizedCategoryName = name.toLowerCase().trim();
    
            const query = {
                name: normalizedCategoryName,
                parent: parent === null ? { $in: [null, undefined] } : parent 
            };
    
            const existingCategory = await Category.findOne(query);
            return existingCategory;
        } catch (error) {
            console.error("Error fetching category by name:", error.message);
            throw error;
        }
    }
    



}