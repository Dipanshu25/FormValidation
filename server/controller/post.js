import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

export const createPost = async (req, res) => {
  const { username, email, phone, password } = req.body;

  const newPostMessage = new PostMessage({ username, email, phone, password });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default createPost;
