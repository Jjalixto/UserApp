import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [

    {
        id:1,
        username:'joel',
        password:'12345',
        email:'jjalixtoc@gmail.com'
    },
];

const initialUserForm = {
    id:0,
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {

     //users es una variable cualquier cambio que se realice se vera reflejado abajo
    //por que se esta pasando como una props
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm); 
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {

        dispatch({
            type:(user.id === 0) ? 'addUser' : 'updateUser',
            payload: user,
        });

        Swal.fire(
            (user.id === 0 ) ? "Usuario Creado" : "Usuario Actualizado",
            (user.id === 0 ) ? "El usuario a sido creado con exito" : "El usuario a sido actualizado con exito",
            "success"
          );

          handlerCloseForm();
          navigate("/users");
    } 

    const handlerRemoveUser = (id) => {
        // console.log(id);

        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado el usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {

              dispatch({
                    type: 'removeUser',
                    payload: id,
              });
              Swal.fire({
                title: "Usuario Eliminado!",
                text: "El usuario a sido eliminado con exito!",
                icon: "success"
              });
            }
          });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setUserSelected({...user});
        setVisibleForm(true);
    }

   const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerCloseForm,
        handlerOpenForm,
    }
}