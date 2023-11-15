const { getVideogamesByName, getAllvideogames, getvideogameById, postVideogames, getAllVideogamesAPI } = require("../controllers/getvideogameByName");


const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const videogames = await getVideogamesByName(name); //Busca en la API por nombre si recibe un nombre en parametros
            videogames ? res.status(200).json(videogames) : res.status(400).send(error)
        } else {
            const allvideogames = await getAllvideogames(); //Busca todos los videojuegos en general si no recibe un nombre en especifico por parametros
            return res.status(200).json(allvideogames);

        }

    } catch (error) {
        return res.status(500).send(`Ocurrió un error en la petición: ${error.message} 500 :( )`)

    }
};

const getvideogameByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const videogame = await getvideogameById(id);
        if (videogame) {
            return res.status(200).json(videogame);
        }
    } catch (error) {
        return res.status(500).send({ error: `El videojuego con id ${id} no se existe. Detalles: ${error.message}` })
    }
};

const postVideogameHandler = async (req, res) => {

    const { name } = req.body;
    try {
        const videogame = await postVideogames(req.body);
        if (videogame !== null) {
            return res.status(200).json(videogame);
        } else {
            return res.status(404).json({ message: `El videojuego ${name} ya existe en la base de datos` })
        }
    } catch (error) {
        return res.status(500).send({ error: `No se pudo crear el videojuego. Error: ${error}` })
    }
}

module.exports = {
    getVideogamesHandler,
    getvideogameByIdHandler,
    postVideogameHandler,
}