const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: false
  },
  skills: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: true
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: false
      },
      to: {
        type: Date

      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: false
      },
      degree: {
        type: String,
        required: false
      },
      fieldofstudy: {
        type: String,
        required: false
      },
      from: {
        type: Date,
        required: false
      },
      to: {
        type: Date,
        require: false
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String

      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }

})


module.exports = mongoose.model("Profile", profileSchema);