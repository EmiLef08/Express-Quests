require("dotenv").config();
constmysql =require("mysql2/promise");
const database = require("./database");

const getUsers = (req, res) => {
  database.query("select * from express_quests.users")
  .then(([users]) =>{
    res.json(users);
    res.status(200);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
  
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
console.log(id);
  database.query("select * from express_quests.users where id = ?", [id]).then(([users]) => {
    if (users[0] != null) {
      res.status(200).json(users[0]);
    } else {
      res.status(404).send("Not found");
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database.query("INSERT INTO express_quests.users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language]).then(([result]) => {
    res.location(`/api/users/${result.insertId}`).sendStatus(201);
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the user");
  });

  //  console.log(req.body);
  // res.send("Post route os working 🎉");
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database.query("update express_quests.users set firstname = ?, lastname = ?, email = ?, city =?, language = ? where id = ?", [firstname, lastname, email, city, language, id]).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not found");
    } else {
      res.sendStatus(204);
    }
  }).catch((err)=> {
    console.error(err);
    res.status(500).send("Error editing the user");
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
};