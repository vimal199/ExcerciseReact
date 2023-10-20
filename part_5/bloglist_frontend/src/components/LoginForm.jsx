import Notification from "./Notification"
import PropTypes from 'prop-types'
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
LoginForm.propTypes = {
    userName: PropTypes.string.isRequired,
    handleOnChangeUserName: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handleOnChangePassword: PropTypes.func.isRequired,
    handleLoginSubmit: PropTypes.func.isRequired
}
export default LoginForm