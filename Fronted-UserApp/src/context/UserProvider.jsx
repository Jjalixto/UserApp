import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerCloseForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                errors,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerCloseForm,
                handlerOpenForm,  
                getUsers,
            }
        }>
            {children}
        </UserContext.Provider>
            
    );
}