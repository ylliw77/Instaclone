const { GraphQLError, graphql } = require("graphql");
const Follow = require("../models/follow");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

const typeDefs = `#graphql
type Follow {
    _id : ID
    followingId : ID
    followerId : ID
}

type User {
    _id :ID
    username : String
}

type Query {
    follower : [Follow]
    following : [Follow]
    userById(_id : ID) : User
}

type Mutation {
    follow(followerId : ID) : String
}

`;

const resolvers = {
  Query: {
    follower: async (_, __, contextValue) => {
      const { authentication } = contextValue;
      const user = await authentication();

      const followerUser = await Follow.getFollower(user._id);
      return followerUser;
    },
    following: async (_, __, contextValue) => {
      const { authentication } = contextValue;
      const user = await authentication();
      console.log(user);
      const followingUser = await Follow.getFollowing(user.userId);
      return followingUser;
    },
  },
  Mutation: {
    follow: async (_, args, contextValue) => {
      try {
        const { authentication } = contextValue;
        const user = await authentication();
        const { followerId } = args;
   
        const getUsertoFollow = await User.getUserById(followerId);
    
        if (followerId === user.userId.toString()) {
          throw new GraphQLError("Cant follow user with same user who login");
        }
        if (!getUsertoFollow[0]) {
          throw new GraphQLError("mboh");
        }
        const follow = await Follow.addToFollow({
          followerId: new ObjectId(user.userId),
          followingId: new ObjectId(followerId),
        });
       
        return `Successfully follow this user`;
      } catch (err) {
        console.log(err, "<<<");
        throw new GraphQLError("Unexpected err");
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
