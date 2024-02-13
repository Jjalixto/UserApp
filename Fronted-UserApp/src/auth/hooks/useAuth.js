import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login',)) || {
    isAuth: false,
    isAdmin:false,
    user: undefined,
}   

export const useAuth = () => {

    const [ login, dispatch ] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();
    
    const handlerLogin = async ({username, password}) => {

        try{
            const response = await loginUser({ username, password});
            const token = response.data.token;
            
            //se obtiene del token los datos  atob decodifica en bases64
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            // console.log(claims);
            const user= { username: claims.sub }
            dispatch({
                type: 'login',
                payload: {
                    user,
                    isAdmin: claims.isAdmin,
                },
            });
            sessionStorage.setItem('login',JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token',`Bearer ${token}`)
            navigate("/users");
        }catch(error){
            if(error.response?.status == 401){
                Swal.fire(
                    'Error login',
                    'Username y password invalidos',
                    'error'
                )
            }else if(error.response?.status == 403){
                Swal.fire(
                    'Error login',
                    'No tiene acceso al recurso o permisos',
                    'error'
                ) 
            }else{
                throw error;
            }
           
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        })
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }

    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}