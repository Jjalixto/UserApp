import { UserForm } from "./assets/components/UserForm";
import { UserList } from "./assets/components/UsersList";

export const UsersApp = () => {

    const initialUsers = [

        {
            id:1,
            username:'joel',
            password:'12345',
            email:'jjalixtoc@gmail.com'
        },
    ];

    return (
        <div className="container my-4">
            <h4>Users App</h4>
            <div className="row">
                <div className="col">
                    <UserForm />
                </div>
                <div className="col">
                    <UserList users={initialUsers}/>
                </div>
            </div>
        </div>
    );
}