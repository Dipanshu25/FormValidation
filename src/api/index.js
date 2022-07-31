import axios from "axios";

const url = "http://localhost:5007/posts";

export const createPost = (newPost) => axios.post(url, newPost);
