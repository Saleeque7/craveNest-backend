import { generateToken } from "../helpers/generateToken.js"
export const adminUsecase = {
    verifyLoginUsecase: (dependencies) => {
        const { repositories: { adminRepository: { findAdminByEmail } } } = dependencies
        const executeFunction = async (email) => {
            try {
                const admin = await findAdminByEmail(email)
                if (!admin) {
                    throw new Error('incorrect email');
                }

                const token = await generateToken(admin._id)

                return { admin, token }
            } catch (error) {
                throw error
            }
        }
        return { executeFunction }
    },
    fetchUsersUsecase: (dependencies) => {
        const { repositories: { adminRepository: { fetchUsersrepo } } } = dependencies
        const executeFunction = async () => {
            try {
                const users = await fetchUsersrepo()
                if (!users) {
                    throw new Error('users un available');
                }
                return users
            } catch (error) {
                throw error
            }
        }
        return { executeFunction }
    },
    updateUserRoleusecase : (dependencies) => {
        const { repositories: { adminRepository: { updateUsersrepo } } } = dependencies;

        const executeFunction = async (userId, isAdmin) => {
          try {
          
            const updatedUser = await updateUsersrepo(userId, isAdmin);
            return updatedUser;
          } catch (error) {
            throw error; 
          }
        }
        return { executeFunction }

    },
    addCategoryUsecase: (dependencies) => {
        const { repositories: { adminRepository: { addCategoryRepo, getCategoryByNameRepo } } } = dependencies;
    
        const executeFunction = async (name, parent = null) => {
            try {
                const normalizedCategoryName = name.toLowerCase().trim();
    
                const existingCategory = await getCategoryByNameRepo(normalizedCategoryName, parent);
    
                if (existingCategory) {
                    throw new Error('Category with the same name already exists .');
                }
    
                const result = await addCategoryRepo(name, parent);
                return result;
            } catch (error) {
                throw error;
            }
        };
    
        return { executeFunction };
    },
    
    getCategoryUsecase : (dependencies) => {
        const { repositories: { adminRepository: { getCategoryRepo } } } = dependencies;

        const executeFunction = async () => {
          try {
          
            const result = await getCategoryRepo();
            return result;
          } catch (error) {
            throw error; 
          }
        }
        return { executeFunction }

    },
    updateCategoryUsecase : (dependencies) => {
        const { repositories: { adminRepository: { updateCategoryRepo } } } = dependencies;

        const executeFunction = async (id,name,parentId) => {
          try {
          
            const result = await updateCategoryRepo(id,name,parentId);
            return result;
          } catch (error) {
            throw error; 
          }
        }
        return { executeFunction }

    },
    deleteCategoryUsecase : (dependencies) => {
        const { repositories: { adminRepository: { deleteCategoryRepo } } } = dependencies;

        const executeFunction = async (id) => {
          try {
          
             await deleteCategoryRepo(id);
            return ;
          } catch (error) {
            throw error; 
          }
        }
        return { executeFunction }

    }
}