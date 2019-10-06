import mongoose from "mongoose";
import config from "../../../config";
import Post from "../../models/Post";

mongoose.Promise = require("bluebird");
mongoose.connect(config.db, { useNewUrlParser: true });

export const resolvers = {
  Query: {
    getPosts: async (_, args, context) => {
      const users = await Post.find();

      return users;
    },
    getPost: async (_, args) => {
      const user = await Post.findOne({ _id: args.id });

      return user;
    }
  },
  Mutation: {
    addPost: (_, args) => {
      const newPost = new Post({
        user: args.user,
        title: args.title,
        body: args.body,
        tagline: args.tagline
      });

      newPost.save();

      return newPost;
    },
    editPost: async (_, args) => {
      const updatedPost = await Post.findOneAndUpdate({ _id: args.id }, args, {
        new: true
      });

      return updatedPost;
    },
    deletePost: async (_, args) => {
      await Post.findOneAndDelete({ _id: args.id });

      return true;
    }
  }
};
