import React from "react";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";
import { UserModalForm } from "./components/UserModalForm";

    
export const UsersApp = () => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerCloseForm,
        handlerOpenForm,
    } = useUsers();

    return (

        <>
            {!visibleForm || 
                <UserModalForm  
                    userSelected = { userSelected }
                    initialUserForm = { initialUserForm }
                    handlerAddUser = { handlerAddUser } 
                    handlerCloseForm = { handlerCloseForm }
                    />
              }

            <div className="container my-4">
                <h4>Users App</h4>
                <div className="row">
                        
                    <div className="col">
                        {visibleForm || 
                            <button
                                className="btn btn-primary my-2"
                                onClick={ handlerOpenForm }
                                >
                                Nuevo Usuario
                            </button> }
                    
                        { 
                        users.length === 0
                        ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                        : <UsersList 
                                handlerUserSelectedForm = { handlerUserSelectedForm }
                                users = { users }
                                handlerRemoveUser = { handlerRemoveUser }
                            />
                            }
                    
                    </div>
                </div>
            </div>
        </>
    );
}