const { connection } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypter");

const users = [
  {
    name: "fulan",
    username: "fulan",
    email: "fulan@mail.com",
    password: "secret",
  },
  {
    name: "fulano",
    username: "fulano",
    email: "fulano@mail.com",
    password: "secret",
  },
];

async function insertUser() {
  try {
    const db = await connection();

    const dataUser = users.map((user) => {
            user.password = hashPassword(user.password);
         user.createdAt = user.updatedAt = new Date();
      return user;
    });
    // console.log(db.collection("users"));
      await db.collection("users").insertMany(dataUser);
           console.log("Success insert to table");
  } catch (err) {
            console.log(err, "Failed to insert user");
  }
}

insertUser();
