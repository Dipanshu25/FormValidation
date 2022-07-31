import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  selectedFile: String,
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
