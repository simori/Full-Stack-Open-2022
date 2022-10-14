function Notification({ success, message }) {
  if (message === null) {
    return null;
  }

  if (success) {
    return (
      <div className="success">
        {message}
      </div>

    );
  }

  return (
    <div className="error">
      {message}
    </div>

  );
}

export default Notification;
