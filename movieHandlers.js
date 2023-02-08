
const database = require("./database");

const getMovies = (req, res) => {
  database.query("select * from express_quests.movies")
  .then(([movies]) =>{
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
  
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query("select * from express_quests.movies where id = ?", [id]).then(([movies]) => {
    if (movies[0] != null) {
      res.status(200).json(movies[0]);
    } else {
      res.status(404).send("Not found");
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });

  // const movie = movies.find((movie) => movie.id === id);

  // if (movie != null) {
  //   res.json(movie);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database.query("INSERT INTO express_quests.movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", [title, director, year, color, duration]).then(([result]) => {
    res.location(`/api/movies/${result.insertId}`).sendStatus(201);
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the movie");
  });
  
  // console.log(req.body);
  // res.send("Post route os working 🎉");
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};