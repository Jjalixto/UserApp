import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export const UserForm = ({ handlerCloseForm, userSelected, handlerAddUser, initialUserForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { id, username, password, email } = userForm;

    useEffect( () => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected]); 

    const onInputChange = ({ target }) => {
        // console.log(target.value);
        const { name, value } = target;
        setUserForm({
            // se utiliza el operador express para recuperar datos
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!username || (!password && id === 0) || !email){
            Swal.fire({
                title: "Error de validacion",
                text: "Debe completar los campos del formulario",
                icon: "error"
              });
            return;
        }
        if(email.includes('@')){
            Swal.fire({
                title: "Error de validacion de email",
                text: "El email debe de ser valido, incluir un @!",
                icon: "error"
            });
            return;
        }
        // console.log("enviando el formulario para guardar los datos");
        // console.log(userForm);

        //guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            <input 
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={ onInputChange}
            />
            { id > 0 ||  <input 
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={ onInputChange}
            />}
           
            <input 
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={ onInputChange}
            />
             <input 
                type="hidden"
                name="id"
                value={id}
            />
            <button
                className="btn btn-primary"
                type="submit">
                { id > 0 ? 'Editar' : 'Crear'}
            </button>
            { !handlerCloseForm ||  <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={ () => onCloseForm() }
                >
                Cerrar
            </button> }
           
        </form>
    );
}
