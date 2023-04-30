import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;
const usernameSystem = process.env.USERNAME;
const passwordSystem = process.env.PASSWORD;

export default async function (req, res) {
  const { username, password } = req.body;

  if (username === usernameSystem && password === passwordSystem) {
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
