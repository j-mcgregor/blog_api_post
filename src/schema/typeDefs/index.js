import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Post {
    id: ID
    title: String
    body: String
    tagline: String
    user: ID
    images: [String]
    likes: [Like]
    comments: [Comment]
  }

  type Comment {
    id: ID
    body: String
    user: ID
    date: String
  }

  type Like {
    id: ID
    user: ID
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID): Post
  }

  type Mutation {
    # USERS
    addPost(title: String, body: String, tagline: String, user: ID): Post
    editPost(
      id: ID
      user: ID
      title: String
      body: String
      tagline: String
    ): Post
    deletePost(id: ID): Boolean
  }
`;
