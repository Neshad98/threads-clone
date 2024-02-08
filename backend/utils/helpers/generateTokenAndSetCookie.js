import Jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.cookie("jwt", token, {
    httpOnly: true, //cannot be accessed by the browser
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  })

  return token;
}

export default generateTokenAndSetCookie