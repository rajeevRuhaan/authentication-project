import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { logInRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOAuthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";

export const routes = [
  testRoute,
  signUpRoute,
  logInRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
];
