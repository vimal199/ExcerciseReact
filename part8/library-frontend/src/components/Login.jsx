import React, { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";
const Login = (props) => {
    if (!props.show) {
        return null;
    }
    let setToken = props.setToken;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [changeLogIn, loginResult] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
        }
    }

    )
    const handleLogin = (event) => {
        event.preventDefault();
        changeLogIn({ variables: { username, password } })
    }
    useEffect(() => {
        if (loginResult.data) {
            console.log('useeffect');
            const token = loginResult.data.login.value
            localStorage.setItem('library-user-token', token)
            setToken(token)
        }
    }, [loginResult.data])


    return (
        <div>
            <form onSubmit={handleLogin}>
                UserName : <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <br />
                Password: <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login