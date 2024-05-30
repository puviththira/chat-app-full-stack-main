import { useState, useContext } from "react"
import UserContext from "../UserContext";
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({fetchLogIn}) => {
    const navigate = useNavigate()
    const {loggedInUser} = useContext(UserContext);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = event => {
        const propertyName = event.target.name
        const copiedUser = {...user}
        copiedUser[propertyName] = event.target.value
        setUser(copiedUser)
    }

    const handleSubmit = event => {
        event.preventDefault()
        fetchLogIn(user).then(savedUser => {
            if(savedUser !== undefined && savedUser.username) {
                setUser({
                    username: "",
                    password: ""
                })
                navigate('/chat')
            }
        })
    }

    return (
        <div className="login-container">
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {loggedInUser !== undefined && loggedInUser.message ? 
                <p className="display">{loggedInUser.message}</p>
                :
                <p className="hidden"></p>
                }
                
                <input type="text"
                id="login-username"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                />

                
                <input type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                />

                <input id="login-btn" type="submit" value="Log in" />

                <Link to="signup">
                    <h4>Don't have an account? </h4><p>Sign up</p>
                </Link>
            </form>
        </div>
        </div>
    )
}

export default Login