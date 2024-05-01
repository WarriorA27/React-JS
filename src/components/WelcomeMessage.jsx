const WelcomMessage = ({ onGetPostClick }) => {
  return (
    <center>
      <h1 className="welcome-message">There are no Posts Yet</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onGetPostClick}
      >
        Get Post from Server
      </button>
    </center>
  );
};

export default WelcomMessage;
