import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addUser, loadingUsers, removeUser, updateUser } from "../store/slices/users/usersSlice";

const initialUsers = [];

const initialUserForm = {
    id:0,
    username: '',
    password: '',
    email: '',
    admin: false,
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {

     //users es una variable cualquier cambio que se realice se vera reflejado abajo
    //por que se esta pasando como una props
    // const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const { users } = useSelector( state => state.users);  // selecciona del slice los usuarios
    const dispatch = useDispatch();
    const [userSelected, setUserSelected] = useState(initialUserForm); 
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    const getUsers = async() => {   

        try {
            const result = await findAll();
            // console.log(result);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if(error.response?.status == 401){
                handlerLogout();
            }
        }   
    }

    const handlerAddUser = async(user) => {

        if(!login.isAdmin) return;

        let response;
        try {
            
            if(user.id === 0){
                response = await save(user);
                dispatch(addUser(response.data))
            }else{
                response = await update(user);
                dispatch(updateUser(response.data));
            }
    
            // dispatch({
            //     type:(user.id === 0) ? 'addUser' : 'updateUser',
            //     payload: response.data,
            // });
    
            Swal.fire(
                (user.id === 0 ) ? "Usuario Creado" : "Usuario Actualizado",
                (user.id === 0 ) ? "El usuario a sido creado con exito" : "El usuario a sido actualizado con exito",
                "success"
              );
    
              handlerCloseForm();
              navigate("/users");
        } catch (error) {
            if(error.response && error.response.status == 400){
                setErrors(error.response.data);
            }else if (error.response && error.response.status == 500 && error.response.data?.message?.includes('constraint')){
                if(error.response.data?.message?.includes('UK_username')){
                    setErrors({username: "El username ya existe"});
                }
                if(error.response.data?.message?.includes('UK_email')){
                    setErrors({email: "El email ya existe"});
                }
            }else if(error.response?.status == 401){
                handlerLogout();
            }else{
                throw error;
            }
        }
       
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);
        if(!login.isAdmin) return;

        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado el usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then( async (result) => {
            if (result.isConfirmed) {

               try {
                    await remove(id);
                    dispatch(removeUser(id));
                    // dispatch({
                    //     type: 'removeUser',
                    //     payload: id,
                    // });
                    Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El usuario a sido eliminado con exito!",
                    icon: "success"
                    });
                } catch (error) {
                        if(error.response?.status == 401){
                            handlerLogout();
                        }
                }
             }
          });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({...user});   
    }

   const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    }

    return {
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
}