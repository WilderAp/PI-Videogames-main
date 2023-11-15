const {getGenresFromDB} = require("../controllers/getGenres");

const getGenresHandler = async (req, res) => {
   
    try {
        const genres = await getGenresFromDB();
        return res.status(200).send(genres);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({error: "Error al solicitar los generos"})

    }
};

module.exports = getGenresHandler;

