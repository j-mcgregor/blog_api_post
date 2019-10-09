import mongoose from 'mongoose';
import Post from '../../models/Post';
import { mongoURL, mongoOptions } from '../../lib/mongoHelper';

mongoose.Promise = require('bluebird');
mongoose.connect(mongoURL, mongoOptions);

export const resolvers = {
  Query: {
    getPosts: async (_, args, context) => {
      const users = await Post.find();

      return users;
    },
    getPost: async (_, args) => {
      const user = await Post.findOne({ _id: args.id });

      return user;
    },
    getPostsByUserId: async (_, args) => {
      // temporary measure until stictching implemented
      const user = await Post.find({ user: args.userId });

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
