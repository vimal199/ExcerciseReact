import { useSelector } from "react-redux";
const Notification = ({ message, status }) => {
  console.log("status is ", status);
  const messageByRedux = useSelector(state => state.message)
  console.log('messageByRedux', messageByRedux);
  if (messageByRedux == "" || messageByRedux == null) {
    return null;
  }
  return (
    <div className={status === "success" ? "success" : "error"}>{messageByRedux}</div>
  );
};
export default Notification;
