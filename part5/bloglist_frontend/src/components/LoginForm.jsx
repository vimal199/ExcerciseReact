import Notification from "./Notification"
const LoginForm = ({ userName, handleOnChangeUserName, password, handleOnChangePassword, handleLoginSubmit, message }) => {
    console.log('message in login form ', message);
    return (
        <>
            <h1>log in to application</h1>
            <Notification message={message} status='error'></Notification>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    userName
                    <input type='text' value={userName} onChange={handleOnChangeUserName} name='userName' id='userName'>
                    </input>
                </div>
                <div>
                    password
                    <input type='password' value={password} name='password' id='password' onChange={handleOnChangePassword}>
                    </input>
                </div>
                <button id="login" type="submit">Log in</button>
            </form>
        </>)
}
export default LoginForm