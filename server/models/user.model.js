const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},
{ collection: 'collection-user' }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;