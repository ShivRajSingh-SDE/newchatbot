const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Shiv:shiv123@cluster0.8csylqn.mongodb.net/React-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
