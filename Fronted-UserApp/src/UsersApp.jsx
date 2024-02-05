import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";
import { Routes } from "react-router-dom";

export const UsersApp = () => {

    const { login, handlerLogin, handlerLogout } = useAuth();

    return(
        <Routes>  
            {login.isAuth ? (<> 
                            
                            </>
                            )
                            : <LoginPage handlerLogin = { handlerLogin } /> 
             }
        </Routes>
    );
}