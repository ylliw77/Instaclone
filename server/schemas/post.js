const { GraphQLError } = require("graphql");
const Post = require("../models/post");
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
    type Post {
   _id : ID!
  content: String!
  tags: [String]
  imgUrl: String!
  authorId: ID
  comments: [Comments]
  likes: [Like]
}

type Comments {
  content: String
  username: String
}

type Like {
  username: String
}

input CommentInput {
  content: String
  username: String
}

input LikeInput {
  username: String
}

type Query {
  post: [Post]
  postById(_id : ID!) : Post
  totalLike(_id : ID!) : Int
}

type Mutation {
  createPost(
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [CommentInput]
    likes: [LikeInput]
  ): Post
 
  addComment(_id : ID!, commentInput : CommentInput) : Comments
  giftLike(_id : ID!, likeInput : LikeInput) : Like 
}



`;

const resolvers = {
  Query: {
    post: async (_, __, contextValue) => {
      const { authentication } = contextValue;
      const user = await authentication();

      const postData = await Post.getAllPost();
      console.log(postData, "<<<")
      return postData;
    },
    postById: async (_, args, contextValue) => {
      const { authentication } = contextValue;
      const { _id } = args;
      const user = await authentication();

      const getPost = await Post.getPostById(_id);
      return getPost;
    },
    totalLike: async (_, args, contextValue) => {
      const { authentication } = contextValue;
      const { _id } = args;
      const user = await authentication();

      const totalLikePost = await Post.getTotalLikeByPost(_id);
      return totalLikePost;
    },
  },
  Mutation: {
    createPost: async (_, args, contextValue) => {
      try {
        const { authentication } = contextValue;
        const user = await authentication();

        const { content, tags, imgUrl, comments, likes } = args;

        const addedPost = await Post.newPost({
          _id: new ObjectId(),
          content,
          tags,
          imgUrl,
          authorId: user.userId,
          comments : [],
          likes : [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        // console.log(addedPost);
        return {
          _id: addedPost.insertedId,
          content,
          tags,
          imgUrl,
          authorId: user.userId,
          comments,
          likes,
        };
      } catch (err) {
        console.log(err);
        throw new GraphQLError("error creating POST");
      }
    },
    addComment: async (_, args, contextValue) => {
      try {
        const { authentication } = contextValue;
        const { content, username } = args.commentInput;
        const user = await authentication();
        const selectedPost = await Post.getPostById(args._id);
        const addComment = await Post.addComment({
          postId: selectedPost._id,
          content,
          username: user.username,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return {
          content,
          username: user.username,
        };
      } catch (err) {
        throw new GraphQLError("error add comment");
      }
    },
    giftLike: async (_, args, contextValue) => {
      try {
        const { authentication } = contextValue;
        const user = await authentication();
        const selectedPost = await Post.getPostById(args._id);

        const getUser = await Post.likePost({
          postId: selectedPost._id,
          username: user.username,
        });
        return {
          username: user.username,
        };
      } catch (err) {
        throw new GraphQLError("error like this post");
      }
    },
  },
};
module.exports = { typeDefs, resolvers };
