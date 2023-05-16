import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import clientPromise from "../../../lib/mongo/mongodb";
import bcrypt from "bcrypt";

export default async function (req, res) {
  const { username, password } = req.body;

  const client = await clientPromise;
  const db = client.db("Ecommerce");
  const userDB = await db
    .collection("Users")
    .find({ user: username })
    .toArray();

  const userDBlogin = userDB[0].user;
  const userDBpassword = userDB[0].password;

  console.log({ userDB });
  console.log({ userDBlogin });

  if (userDB && bcrypt.compareSync(password, userDBpassword)) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      "secret"
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
