import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import clientPromise from "../../../lib/mongo/mongodb";
import bcrypt from "bcrypt";

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const secret = process.env.SECRET;

export default async function (req, res) {
  let client;

  const { username, password } = req.body;

  client = await clientPromise;
  const db = client.db(dbName);

  const userDB = await db
    .collection(collectionName)
    .find({ user: username })
    .toArray();

  if (userDB.length === 0 || !userDB) {
    res.status(401).json({ message: "User does not exist!" });
    return;
  }

  const user = userDB[0];

  if (userDB && bcrypt.compareSync(password, user.password)) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
