import React, { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export const UsersList = () => {

    const { users } = useContext(UserContext);

    return(
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Updated</th>
                        <th>Edit Route</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( ({id,username,email}) => (
                           <UserRow 
                            key={id} 
                            id = {id}
                            username = {username}
                            email = {email}
                           />
                        ))
                    }
                </tbody>
            </table>
    );
}