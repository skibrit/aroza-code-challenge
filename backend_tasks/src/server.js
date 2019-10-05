const express = require("express");
const app = express();
const routeList = require("./routelist");
const dbConnecter = require("../config/dbConnecter");
const PORT = process.env.PORT || 6000;

//get connection to the database
dbConnecter();

//add middleware parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//attach routers
app.use("/api/user", routeList.user);
app.use("/api/actors", routeList.actors);
app.use("/api/movies", routeList.movies);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
