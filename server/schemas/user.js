const { GraphQLError } = require("graphql");
const User = require("../models/user");
const { checkPassword, hashPassword } = require("../helpers/bcrypter");
const { createToken } = require("../helpers/jwt");

const typeDefs = `#graphql

type User {
  _id : ID
  name :  String!
    username : String!
    avatar : String
    email : String!
    password : String!
    following : [Following]
    followers : [Follower]
    posts : [Post]
}

type Token {
    access_token : String
}

type Post {
  content : String
}

type Following {
  followingId : ID
}

type Follower {
  followerId : ID
}

type Register {
    _id : ID
    username : String
    email : String
}

input LoginUser{
    email : String!
    password : String!
}

input RegisterUser{
    name :  String!
    avatar : String
    username : String!
    email : String!
    password : String!
}

type Mutation{
    login(loginUser : LoginUser) : Token
    register(registerUser : RegisterUser) : Register
}

type Query {
  hello : String
    welcome(name : String) : String
    isUserLogin (id : ID) : User
    isAnotherUser (id : ID) : User
  allUser(search : String) : [User]
}

`;

const resolvers = {
  Query: {
    hello: () => "Challenge 01 - Phase 3",
    isUserLogin: async (_, __, contextValue) => {
      const isUser = await contextValue.authentication();
      console.log(isUser, "<<")
      const detailUser = await User.getUserById(isUser.userId);
      console.log(detailUser, "<<<<")

      return detailUser[0];
    },
    isAnotherUser: async (_, args, contextValue) => {
      const isUser = await contextValue.authentication();
      const anotherUser = await User.getUserById(args.id);

      return anotherUser[0];
    },
    allUser: async (_, args, contextValue) => {
      console.log(args.search, "<<<");
      const isUser = await contextValue.authentication();

      if (args.search) {
        const user = await User.allUser(args.search);

        return user;
      } else {
        const allUser = await User.allUser();
        return allUser;
      }
    },
  },

  Mutation: {
    login: async (_, args) => {
      const { email, password } = args.loginUser;

      const isUser = await User.findUserByEmail(email);
      if (!isUser || !checkPassword(password, isUser.password)) {
        throw new GraphQLError("Invalid email/password");
      }

      console.log(isUser, "<<<<");
      const payload = {
        _id: isUser._id,
        email: isUser.email,
        username: isUser.username,
      };
      console.log(payload, "<<<< ini payload");
      const access_token = createToken(payload);
      console.log("Login Success");
      return { access_token };
    },
    register: async (_, args) => {
      const { name, username, email, password, avatar } = args.registerUser;

      if (!name) {
        throw new GraphQLError("Name required");
      }
      if (!username) {
        throw new GraphQLError("Username required");
      }
      if (!email) {
        throw new GraphQLError("Email required");
      }
      if (!password) {
        throw new GraphQLError("Password required");
      }
      const hashedPassword = hashPassword(password);
      const newUser = await User.postRegister({
        name,
        username,
        avatar,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        _id: newUser.insertedId,
        username: username,
        email: email,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
