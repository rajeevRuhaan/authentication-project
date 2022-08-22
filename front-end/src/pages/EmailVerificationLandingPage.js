import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    const laodVerification = async () => {
      try {
        const response = await axios.put("/api/verify-email", {
          verificationString,
        });
        const { token: newToken } = response.data;
        setToken(newToken);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsSuccess(false);
      }
    };

    laodVerification();
  }, [setToken, verificationString]);

  if (isLoading) return <p>Loading ...</p>;
  if (!isSuccess) return <EmailVerificationFail />;
  return <EmailVerificationSuccess />;
};
