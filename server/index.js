if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: userTypeDef,
  resolvers: userResolver,
} = require("./schemas/user");
const {
  typeDefs: postTypeDef,
  resolvers: postResolver,
} = require("./schemas/post");
const { connection } = require("./config/mongodb");
const {
  typeDefs: followTypeDef,
  resolvers: followResolver,
} = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDef, postTypeDef, followTypeDef],
  resolvers: [userResolver, postResolver, followResolver],
});

const authentication = require("./middlewares/authentication");

async function startServer() {
  try {
    await connection();

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: ({ req }) => {
        return {
          authentication: async () => {
            return await authentication(req);
          },
        };
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (err) {
    console.log(err, "err dari index.js");
  }
}

startServer();
