/* eslint-disable no-console */
import faker from 'faker';
import mongoose from 'mongoose';
import assert from 'assert';
import MongoClient from 'mongodb';
import Post from '../src/models/Post';
import { mongoURL, mongoOptions } from '../src/lib/mongoHelper';

mongoose.Promise = require('bluebird');
mongoose.connect(mongoURL, mongoOptions);

Post.collection.drop();

const seedPost = async () => {
  const posts = [];

  try {
    MongoClient.connect(mongoUrl, mongoOptions, async (err, client) => {
      assert.equal(null, err);
      const db = client.db(mongoDb);
      console.log('Connected successfully to server');

      const myPromise = () => {
        return new Promise((res, rej) => {
          db.collection('users')
            .find()
            .toArray((err, data) => (err ? rej(err) : res(data)));
        });
      };

      const users = await myPromise();
      // console.log(users);

      for (let i = 0; i < users.length; i++) {
        const postsNumber = Math.floor(Math.random() * 20);
        // for u users, create p posts, each with c comments, l likes and i images
        for (let p = 0; p < postsNumber; p++) {
          // ====== COMMENTS ======
          const commentsNumber = Math.floor(Math.random() * 20);
          const comments = [];
          for (let j = 0; j < commentsNumber; j++) {
            const user = Math.random() * users.length;
            comments.push({
              body: faker.lorem.sentences(),
              user: users[user]
            });
          }

          // ====== LIKES ======
          const likesNumber = Math.floor(Math.random() * 50);
          const likes = [];
          for (let k = 0; k < likesNumber; k++) {
            const user = Math.random() * users.length;
            likes.push({ user: users[user] });
          }

          // ====== IMAGES ======
          const imagesNumber = Math.floor(Math.random() * 5);
          const images = [];
          for (let k = 0; k < imagesNumber; k++) {
            images.push({
              url: faker.image.city()
            });
          }

          const newPost = {
            title: faker.lorem.sentence(),
            tagline: faker.lorem.sentence(),
            body: faker.lorem.sentences(),
            user: users[i],
            likes,
            images,
            comments
          };

          posts.push(newPost);
        }
      }

      await Post.create(posts)
        .then(posts => console.log(`${posts.length} posts created`))
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());

      client.close();
    });

    // ===================================
  } catch (e) {
    console.log(e);
  }
};

async function init() {
  console.log('Seeding posts...');
  await seedPost();
}

init();
