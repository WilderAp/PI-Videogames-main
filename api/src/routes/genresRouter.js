const {Router} = require("express");
const getGenresHandler = require("../handlers/genresHandlers");
//importar los handlers

const genresRouter = Router();

genresRouter.get("/", getGenresHandler); // pedir de la API y luego guardarlos en la DB

module.exports = genresRouter;