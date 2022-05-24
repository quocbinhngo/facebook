const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,   
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
    },   
    password: {
      type: String,
      required: [true, "email is required"],
    },
    picture: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    birthYear: {
      type: Number,
      required: true,
      trim: true,
    },
    birthMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    birthDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friendUsers: {
      type: Array,
      default: [],
    },
    followingUsers: {
      type: Array,
      default: [],
    },
    followedByUsers: {
      type: Array,
      default: [],
    },      
    addFriendRequests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
      savedPosts: [
        {
          post: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
          },
          savedAt: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
