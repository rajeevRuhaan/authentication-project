import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { ObjectId } from "mongodb";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "unable to verify token" });

      const { id, isVerified } = decoded;

      if (id !== userId) {
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      }
      if (!isVerified)
        return res
          .status(403)
          .json({ message: "You need to verify before you update your data" });

      const db = getDbConnection("react-auth-db");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );

      const { email, info } = result.value;
      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_secret,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
