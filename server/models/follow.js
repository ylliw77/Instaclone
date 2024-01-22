const { ObjectId } = require("mongodb");
const { getMongoDB } = require("../config/mongodb");

class Follow {
  static getDB() {
    return getMongoDB().collection("follows");
  }
  static async getFollower(id) {
    return await this.getDB()
      .aggregate([
        {
          $match: { followerId: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            username: {
              $cond: {
                if: { $eq: ["", "$user.username"] },
                then: "$$REMOVE",
                else: "$user.username",
              },
            },
          },
        },
      ])
      .toArray();
  }

  static async getFollowing(id) {
    return await this.getDB()
      .aggregate([
        {
          $match: { followingId: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            username: {
              $cond: {
                if: { $eq: ["", "$user.username"] },
                then: "$$REMOVE",
                else: "$user.username",
              },
            },
          },
        },
      ])
      .toArray();
  }
  static async addToFollow({ followerId, followingId }) {
    const success = await this.getDB().insertOne({
      followerId: followerId,
      followingId: followingId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return success;
  }
}

module.exports = Follow;
