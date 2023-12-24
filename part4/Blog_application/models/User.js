const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, minLength: 3, unique: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
const User = mongoose.model("User_blog", userSchema);
module.exports = User;
