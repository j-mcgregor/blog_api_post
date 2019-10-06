import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String
  },
  tagline: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  images: [
    {
      url: { type: String }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      body: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Post', PostSchema);
