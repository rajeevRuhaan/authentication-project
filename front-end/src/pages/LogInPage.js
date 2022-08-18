import { useState } from "react";
import { useHistory } from "react-router-dom";

export const LogInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailVAlue] = useState("");
  const [passwordValue, setPasswordVAlue] = useState("");

  const history = useHistory();
  const onLogInClicked = async () => {
    alert("Log in not implemented yet.");
  };

  return (
    <div clsssName="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        type="email"
        value={emailValue}
        onChange={(e) => setEmailVAlue(e.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordVAlue(e.target.value)}
        placeholder="password"
      />
      <hr></hr>
      <button
        disabled={!emailValue || !passwordValue}
        onClicked={onLogInClicked}
      >
        {" "}
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        {" "}
        Forgot your Password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account. Sign Up
      </button>
    </div>
  );
};
