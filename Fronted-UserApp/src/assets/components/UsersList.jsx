import { UserRow } from "./UserRow";

export const UserList = ({users = []}) => {

    return(
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Updated</th>
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