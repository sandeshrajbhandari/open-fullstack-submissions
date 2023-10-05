const Notification = ({ notifyObj }) => {
  if (notifyObj.message === null) {
    return null;
  }

  return <div className={notifyObj.style}>{notifyObj.message}</div>;
};

export default Notification;
