import Notification from "./Notification";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
const LoginForm = ({
  userName,
  handleOnChangeUserName,
  password,
  handleOnChangePassword,
  handleLoginSubmit
}) => {
  // console.log("message in login form ", message);
  return (
    <>
      <h1>Log in to application</h1>
      <Notification status="error"></Notification>
      <Form onSubmit={handleLoginSubmit}>
        <div>
          userName
          <input
            type="text"
            value={userName}
            onChange={handleOnChangeUserName}
            name="userName"
            id="userName"
            style={{ marginLeft: "1%" }}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={handleOnChangePassword}
            style={{ marginLeft: "1.3%" }}
          ></input>
        </div>
        <Button id="login" type="submit" style={{ marginTop: "1%" }}>
          Log in
        </Button>
      </Form>
    </>
  );
};
LoginForm.propTypes = {
  userName: PropTypes.string.isRequired,
  handleOnChangeUserName: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handleOnChangePassword: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
};
export default LoginForm;
