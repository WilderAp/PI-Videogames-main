const {Router} = require("express");
const { getVideogamesHandler, getvideogameByIdHandler, postVideogameHandler } = require("../handlers/videogamesHandlers");
//importar los handlers

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler); //como es por query, puede recibir o no un name, por lo tanto se manejan los dos casos en la misma ruta
videogamesRouter.get("/:id", getvideogameByIdHandler) //params
videogamesRouter.post("/", postVideogameHandler); //crea solo en la DB

module.exports = videogamesRouter;