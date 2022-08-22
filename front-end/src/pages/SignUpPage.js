import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

export const SignUpPage = () => {
  const [, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailVAlue] = useState("");
  const [passwordValue, setPasswordVAlue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordVAlue] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
    const response = await axios.post("api/signup", {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    history.push("/please-verify");
  };

  return (
    <div clsssName="content-container">
      <h1>Sign Up</h1>
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
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordVAlue(e.target.value)}
        placeholder="Confirmpassword"
      />
      <hr></hr>
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        {" "}
        Sign Up
      </button>

      <button onClick={() => history.push("/login")}>
        Already have an account. Log In
      </button>
    </div>
  );
};
