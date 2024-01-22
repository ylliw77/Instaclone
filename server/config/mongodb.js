if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.clear()
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db

function getMongoDB(){
  return db
}

async function connection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // Send a ping to confirm a successful connection
    const database = client.db("Phase-3")
    db = database
    return database
  } catch(err){
    console.log(err, "It's error from connecting to db-mongoDB");
  
  }
}

module.exports = {connection, getMongoDB}
