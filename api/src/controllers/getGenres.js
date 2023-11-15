const axios = require("axios");
const { Genres } = require("../db");
const { Op } = require("sequelize");
const URL = "https://api.rawg.io/api/genres";
require('dotenv').config();
const { API_KEY } = process.env;


const getGenres = async () => {
    try {
        const response = await axios.get(`${URL}?key=${API_KEY}`)
        const genres = response.data.results
        
        const sendGenres = genres.map((genre)=> {
            return {
                id: genre.ID,
                name: genre.name
            }
        }) 
        return sendGenres;

    } catch (error) {

        throw error;
    }
};

const getGenresFromDB = async () => {
    try {
        const genres = await Genres.findAll()
        if (genres) {
            return genres
        }
        // const genres = await Genres.findOne({
        //     where: {
        //         name: {
        //             [Op.iLike]: `%${name}`
        //         }
        //     }
        // }) En caso de q se deban hacer rutas con los generos
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getGenres,
    getGenresFromDB,
}