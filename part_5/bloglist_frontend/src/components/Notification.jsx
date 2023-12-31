//import { useSelector } from "react-redux";
import { useContext } from "react";
import MessageContext from "../contexts/MessageContext";
const Notification = ({ message, status }) => {
  console.log("status is ", status);
  // const messageByRedux = useSelector(state => state.message)
  const [messageByRedux, dispatch] = useContext(MessageContext)
  console.log('messageByRedux', messageByRedux);
  if (messageByRedux == "" || messageByRedux == null) {
    return null;
  }
  return (
    <div className={status === "success" ? "success" : "error"}>{messageByRedux}</div>
  );
};
export default Notification;
