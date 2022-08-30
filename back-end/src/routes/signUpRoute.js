import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

/* import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail"; */

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    awsUserPool.signUp(email, password, attributes, null, async (err) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ message: "Unable to sign up" });
      }

      const db = getDbConnection("react-auth-db");

      const startingInfo = {
        hairColor: "",
        favoriteFood: "",
        bio: "",
      };

      const result = await db.collection("users").insertOne({
        email,
        info: startingInfo,
      });

      const { insertedId } = result;

      jwt.sign(
        {
          id: insertedId,
          isVerified: false,
          email,
          info: startingInfo,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (error, token) => {
          if (error) {
            return res.sendStatus(500);
          }

          return res.status(200).json({ token });
        }
      );
    });

    /* const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      return res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid();

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
      verificationString,
    });

    const { insertedId } = result;

    try {
      await sendEmail({
        to: email,
        from: "urrajivin@hotmail.com",
        subject: "Please verify your email",
        text: `
            Thanks for signing up! To verify your email, click here:
            http://localhost:3000/verify-email/${verificationString}
        `,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    ); */
  },
};
