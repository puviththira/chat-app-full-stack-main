import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import './Registration.css'

const Registration = ({addUser}) => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(
        {
            username: "", 
            email: "",
            password:"",
            confirmPassword:""
        }
        );

        const [match, setMatch] = useState(false);

        const handleChange = event => {
            const name = event.target.name;
            const updatedUser = {...newUser}
            updatedUser[name] = event.target.value;
            setNewUser(updatedUser);          
        }

        const handleSubmit = event => {
            event.preventDefault();
            if (match){
                addUser(newUser);
                setMatch(false);          
                setNewUser({
                    username: "", 
                    email: "",
                    password:"",
                    confirmPassword:""    
                })
                navigate('/')
            }
        }

        const checkPassword = event =>{
            if (newUser.password === event.target.value){
                setMatch(true);
            }else{
                setMatch(false)
            }
        }

    return(
        <div className="signup-container">
            <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input id="email" type="email" name="email" 
                placeholder="Email" value={newUser.email} required onChange={handleChange}/>

                <input id="username" type="text" name="username" 
                placeholder="Username" value={newUser.username} required onChange={handleChange}/>

                <input id="password" type="password" name="password" 
                placeholder="Password" value={newUser.password} minLength="1" required onChange={handleChange}/>

                <input id="confirm_password" type="password" name="confirmPassword" 
                placeholder="Confirm Password" value={newUser.confirmPassword} minLength="1" 
                required onChange={handleChange} onKeyUp={checkPassword}/>
                { newUser.confirmPassword !== "" ?
                    <div className="pwd-message">
                    {match? <p>Passwords match ✅</p> : <p>Passwords don't match ❌</p>}
                    </div>
                : <p className="hidden"></p>}

                <input id="create-account-btn" type="submit" value="Create Account" disabled={newUser.confirmPassword !== '' && match? false: true}/>

                <Link to="/">
                    <h4>Already have an account</h4><p>Login</p>
                </Link>
            </form>
            </div>
        </div>
    );

}

export default Registration;