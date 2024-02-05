import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";

export const UserRoutes = ({ login, handlerLogin }) => {

    return (
        <>
        <Navbar login = { login } handlerLogout = { handlerLogout } />
            <Routes>
                <Route path="/users" element={ <UsersPage /> } />
                <Route path="/" element = { <Navigate to="/users" /> } />
            </Routes>
        </>
    );
}