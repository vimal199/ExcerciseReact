const Notification = ({ message, status }) => {
  console.log("status is ", status);
  if (message == "" || message == null) {
    return null;
  }
  return (
    <div className={status === "success" ? "success" : "error"}>{message}</div>
  );
};
export default Notification;
