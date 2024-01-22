const { GraphQLError } = require("graphql");
const { decodeToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req) {
  let token = req.headers.authorization;

  if (!token) {
    throw new GraphQLError("please provide token", {
      extensions: { code: "INVALID_TOKEN" },
    });
  }

  token = token.replace("Bearer ", "");
  const isValiduser = decodeToken(token);

  const isUserLogin = await User.getUserById(isValiduser._id);

  if (!isUserLogin) {
    throw new GraphQLError("invalid token", {
      extensions: { code: "INVALID_TOKEN" },
    });
  }

  return { userId: isUserLogin[0]._id, username: isUserLogin[0].username };
}

module.exports = authentication;
