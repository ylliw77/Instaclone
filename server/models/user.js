const { ObjectId } = require("mongodb");
const { getMongoDB } = require("../config/mongodb");

class User {
  static getDB() {
    return getMongoDB().collection("users");
  }

  static async postRegister(user) {
    return await this.getDB().insertOne(user);
  }

  static async allUser(search) {
    console.log(search);
    if (search) {
      const user = await this.getDB()
        .find({
          $or: [{ username: { $regex: search } }, { name: { $regex: search } }],
        })
        .toArray();
    
      return user
    } else {
      const users = await this.getDB().find().toArray();

      return users;
    }
  }
  static async getUserById(id) {
    return await this.getDB()
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followerId",
            as: "following",
          },
        },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followingId",
            as: "following",
          },
        },
      ])
      .toArray();
  }

  static async findUserByEmail(email) {
    return await this.getDB().findOne({ email });
  }
}

module.exports = User;
