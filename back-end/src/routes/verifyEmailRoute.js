import { ObjectId } from "mongodb";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { getDbConnection } from "../db";
import { awsUserPool } from "../util/awsUserPool";
import { CognitoUser } from "amazon-cognito-identity-js";

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put",
  handler: async (req, res) => {
    const { email, verificationString } = req.body;
    //const db = getDbConnection("react-auth-db");
    //const result = await db.collection("users").findOne({ verificationString });

    /* if (!result) {
      return res
        .status(401)
        .json({ message: "The email verification code is incorrect. " });
    } */

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err)
          return res
            .status(401)
            .json({ message: "The verification is incorrect" });

        const db = getDbConnection("react-auth-db");
        const result = await db.collection("users").findOneAndUpdate(
          { email },
          {
            $set: { isVerified: true },
          },
          {
            returnOrginal: false,
          }
        );
        const { _id: id, info } = result.value;

        jwt.sign(
          { id, email, isVerified: true, info },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (error, token) => {
            if (error) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );

    /*     await db
      .collection("users")
      .updateOne({ _id: ObjectId(id) }, { $set: { isVerified: true } }); */
  },
};
