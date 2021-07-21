import {useState, useContext} from 'react';
import { AppContext } from '../Context';
const Login = () => {
    const { insertUser } = useContext(AppContext);
    const [newUser, setNewNuser] = useState({});

    // Store the insert user from data.
    const addNewUser = (e, field) => {
        setNewNuser({
            ...newUser,
            [field]: e.target.value,
        });
    };

    // Insert user into database.
    const submitUser = (e) => {
        e.preventDefault();
        insertUser(newUser);
        e.target.reset();

    };

    return (
        <form className="insertForm" onSubmit={submitUser}>
            <h2>Create new account</h2>
            <label htmlFor="_name">Username</label>
            <input
                type="text"
                id="_name"
                onChange={(e) => addNewUser(e, "user_name")}
                placeholder="Enter name"
                autoComplete="off"
                required
            />
            <label htmlFor="_email">Email</label>
            <input
                type="email"
                id="_email"
                onChange={(e) => addNewUser(e, "user_email")}
                placeholder="Enter email"
                autoComplete="off"
                required
            />
            
            <label htmlFor="_name">First name</label>
            <input
                type="text"
                id="_name"
                onChange={(e) => addNewUser(e, "user_name")}
                placeholder="Enter name"
                autoComplete="off"
                required
            />
            <label htmlFor="_name">Last name</label>
            <input
                type="text"
                id="_name"
                onChange={(e) => addNewUser(e, "user_name")}
                placeholder="Enter name"
                autoComplete="off"
                required
            />
            
            <input className="Button" type="submit" value="Insert" />
        </form>
    );
  };
  
  export default Login;  
