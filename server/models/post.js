const { ObjectId } = require("mongodb");
const { getMongoDB } = require("../config/mongodb");
const redis = require("../config/ioredis");

class Post {
  static getDB() {
    return getMongoDB().collection("posts");
  }

  static async getAllPost() {
    // return await this.getDB().find().sort({ createdAt: -1 }).toArray();
    try {
      const postCache = await redis.get("post");
      if (postCache) {
        const posts = JSON.parse(postCache);

        return posts;
      }

      const posts = await this.getDB()
        .aggregate([
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "user",
            },
          },
        
        ])
        .toArray();
        console.log(posts)
      await redis.set("posts", JSON.stringify(posts));
      return posts;
    } catch (err) {
      console.log(err);
    }
  }

  static async newPost(data) {
    data.authorId = new ObjectId(data.authorId);

    const newPost = this.getDB().insertOne(data);
    await redis.del("posts");
    return newPost;
  }

  static async getPostById(id) {
    return await this.getDB().findOne({ _id: new ObjectId(id) });
  }

  static async addComment(comment) {
    try {
      await redis.del("posts");
    
      const updateDoc = await this.getDB().updateOne(
        { _id: comment.postId },
        { $push: { comments: comment } }
      );
   
      return updateDoc;
    } catch (err) {
      console.log(err, "error update doc");
    }
  }

  static async likePost(user) {
    const username = user.username;
    try {
      await redis.del("posts");
      const giftLike = await this.getDB().updateOne(
        { _id: user.postId },
        { $push: { likes: { username } } }
      );
      return giftLike;
    } catch (err) {
      console.log(err, "err adding like to post");
    }
  }

  static async getTotalLikeByPost(id) {
    try {
      await redis.del("posts");
      const post = await this.getDB().findOne({ _id: new ObjectId(id) });
      const totalLike = post.likes ? post.likes.length : 0;
      return totalLike;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Post;
