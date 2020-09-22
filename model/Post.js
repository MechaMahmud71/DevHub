const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
        required: false
      }
    }
  ],
  count: {
    like: Number,
    comment: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
})

postSchema.pre('save', function (next) {
  this.count.comment = this.comments.length;
  this.count.like = this.likes.length;
  next();
})



module.exports = mongoose.model("Post", postSchema);