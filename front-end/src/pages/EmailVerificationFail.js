import React from "react";
import { useHistory } from "react-router-dom";

export const EmailVerificationFail = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1> Uh oh ...</h1>
      <p> Something went to wrong while trying to verify email. </p>
      <button onClick={() => history.push("/sign-up")}>Go to home page.</button>
    </div>
  );
};
