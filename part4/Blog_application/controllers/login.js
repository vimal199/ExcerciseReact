const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");
loginRouter.post("/", async (request, response) => {
  const { userName, password } = request.body;
  const user = await User.findOne({ userName });
  // console.log('bcrypt.compare(password, user.passwordHash ', bcrypt.compare(password, user.passwordHash))
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "invalid username or password" });
  }
  const userForToken = {
    userName: user.userName,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .send({ token, userName: user.userName, name: user.name });
});
module.exports = loginRouter;
