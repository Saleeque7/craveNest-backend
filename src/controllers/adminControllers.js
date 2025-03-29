import { NotFoundError, ValidationError } from "../utils/middlewares/errorInstances.js"
export const adminControllers = (dependencies) => {
    return {
        verifylogin: async (req, res, next) => {
            const { email } = req.body
            const { useCases: { adminUsecase: { verifyLoginUsecase } } } = dependencies
            try {
                if (!email || !email.trim()) {
                    throw new ValidationError("Email is required.");
                }
                const { executeFunction } = await verifyLoginUsecase(dependencies)
                const { admin, token } = await executeFunction(email)

                return res.status(201).json({
                    success: true,
                    message: "success",
                    admin: admin,
                    token: token
                });

            } catch (error) {
                next(error)
            }

        },
        fetchUsers: async (req, res, next) => {
            const { useCases: { adminUsecase: { fetchUsersUsecase } } } = dependencies
            try {
                const { executeFunction } = await fetchUsersUsecase(dependencies)
                const users = await executeFunction()
                if (!users) {
                    throw new NotFoundError("user not found.");
                }
                return res.status(200).json({
                    success: true,
                    message: "success",
                    users: users
                });
            } catch (error) {
                next(error)
            }
        },
        updateUserRole: async (req, res, next) => {
            const { userId } = req.params;
            const { isAdmin } = req.body;
            const { useCases: { adminUsecase: { updateUserRoleusecase } } } = dependencies;
            console.log(userId);

            try {

                if (!userId || !userId.trim()) {
                    throw new ValidationError("userId is required.");
                }

                if (typeof isAdmin !== 'boolean') {
                    throw new ValidationError("isAdmin must be a boolean value.");
                }


                const { executeFunction } = await updateUserRoleusecase(dependencies);
                const updatedUser = await executeFunction(userId, isAdmin);


                if (!updatedUser) {
                    throw new NotFoundError("User not found or unable to update user.");
                }


                return res.status(200).json({
                    success: true,
                    message: "User role updated successfully.",
                    user: updatedUser
                });

            } catch (error) {
                next(error);
            }
        },
        addCategory: async (req, res, next) => {
            const { name, parentId } = req.body
            const { useCases: { adminUsecase: { addCategoryUsecase } } } = dependencies;
            try {
                if (!name || !name.trim()) {
                    throw new ValidationError("category name  is required.");
                }
                
                const { executeFunction } = await addCategoryUsecase(dependencies)
                const result = await executeFunction(name, parentId)

                return res.status(200).json({
                    success: true,
                    message: "successfully added",
                    user: result
                });
            } catch (error) {
                next(error)
            }
        },
        getCategory: async (req, res, next) => {

            const { useCases: { adminUsecase: { getCategoryUsecase } } } = dependencies;
            try {

                const { executeFunction } = await getCategoryUsecase(dependencies)
                const categoryTree = await executeFunction()
                return res.status(200).json({
                    success: true,
                    categoryTree: categoryTree
                });
            } catch (error) {
                next(error)
            }
        },
        updateCategory: async (req, res, next) => {
            console.log(req.params,"params");
            console.log(req.body,"params");
            
            const { id } = req.params;
            const { name, parentId } = req.body;
            const { useCases: { adminUsecase: { updateCategoryUsecase } } } = dependencies;
            try {
                if (!id || !id.trim()) {
                    throw new ValidationError("category id  is not avialable");
                }
                if (!name || !name.trim()) {
                    throw new ValidationError("category name  is not avialable");
                }

                

                const { executeFunction } = await updateCategoryUsecase(dependencies)
                const updatedCategory = await executeFunction(id, name, parentId)
                return res.status(200).json({
                    success: true,
                    category: updatedCategory
                });
            } catch (error) {
                next(error)
            }
        },
        deleteCategory: async (req, res, next) => {
            const { id } = req.params;

            const { useCases: { adminUsecase: { deleteCategoryUsecase } } } = dependencies;
            try {

                const { executeFunction } = await deleteCategoryUsecase(dependencies)
                await executeFunction(id)
                return res.status(200).json({
                    success: true, message: ' deleted successfully'
                });
            } catch (error) {
                next(error)
            }
        },
    }
}