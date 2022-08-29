import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useQueryParams } from "../util/useQueryParams";

export const LogInPage = () => {
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailVAlue] = useState("");
  const [passwordValue, setPasswordVAlue] = useState("");

  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token: oauthToken } = useQueryParams();

  const history = useHistory();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      history.push("/");
    }
  }, [oauthToken, setToken, history]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");

        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.errorMessage);
      }
    };
    loadOauthUrl();
  }, []);

  const onLogInClicked = async () => {
    const response = await axios.post("/api/login", {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    history.push("/");
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
      <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>
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
      <button
        disabled={!googleOauthUrl}
        onClick={() => {
          window.location.href = googleOauthUrl;
        }}
      >
        Login with Google
      </button>
    </div>
  );
};
