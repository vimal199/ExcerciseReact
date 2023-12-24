const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");
usersRouter.post("/", async (request, response) => {
  const { userName, name, password } = request.body;
  if (password == undefined || password == "") {
    response.status(400).json({ error: "Password cannot be empty" });
    return;
  }
  if (password != undefined && password.length < 3) {
    response.status(400).json({ error: "Enter password greater than 3" });
    return;
  }
  console.log("Printing?");
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    userName,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});
usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({}).populate("blogs");
  response.json(allUsers);
});
module.exports = usersRouter;
