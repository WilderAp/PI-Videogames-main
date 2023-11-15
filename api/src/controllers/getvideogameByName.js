const axios = require('axios');
const { Videogame, Genres } = require('../db');
const { Op } = require('sequelize');
const ALLURL = "https://api.rawg.io/api/games?key=";
const URL = "https://api.rawg.io/api/games?search=";
const IDURL = "https://api.rawg.io/api/games/";
require('dotenv').config();
const { API_KEY } = process.env;

const getAllVideogamesDB = async () => {
    try {
        const videogamesDB = await Videogame.findAll({
            include: [
                {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    },
                }
            ]
        });
        if (!videogamesDB.length) null;

        return videogamesDB;
    } catch (error) {
        throw error;
    }


}

const getAllVideogamesAPI = async () => {
    try {
        
        const response = await axios.get(`${ALLURL}${API_KEY}`);
        const videogames = response.data.results;
        console.log(videogames);
        const sendVideogames = videogames.map((game) => {
            return {
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.parent_platforms.map((platform) => platform.platform.name),
                image: game.background_image,
                date: game.released,
                rating: game.rating,
                Genres: game.genres,
            }
        });

        return sendVideogames;
    } catch (error) {
        throw new Error("Couldn't get API videogames")
    }

};

const getAllvideogames = async () => {
    try {
        const dbVideogames = await getAllVideogamesDB();
        const apiVideogames = await getAllVideogamesAPI();
        if (dbVideogames) {
            const allVideogames = [...dbVideogames, ...apiVideogames];
            return allVideogames;
        } else {
            const apiGames = [...apiVideogames];
            return apiGames;
        }
    } catch (error) {
        error;
    }



}



const getVideogamesByName = async (name) => {
    try {
        const response = await axios.get(`${URL}${name}&key=${API_KEY}`)
        if (response) {
            const videogames = response.data.results;
            const videogames15 = videogames.length > 15 ? videogames.slice(0, 15) : videogames; // Para verificar si la respuesta de la API trae menos de 15 videojuegos y no hacer el slice
            if (videogames15.length > 1) {
                const sendVideogames = videogames15.map((game) => {
                    return {
                        id: game.id,
                        name: game.name,
                        description: game.description,
                        platforms: game.parent_platforms.map((platform) => platform.platform.name),
                        image: game.background_image,
                        date: game.released,
                        rating: game.rating,
                        Genres: game.genres,
                    }
                })
                return sendVideogames;
                // } else {
                // return `No se encontró el videojuego con el nombre ${name}, verifica si está correctamente escrito, si es el caso entonces probablemente aún no lo hemos agregado a la lista, quiza tú puedas hacerlo en nuestro formulario ;)`
                // }
            }
        } else {
            const videogames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                limit: 15,
            })
            return videogames;
        }

    } catch (error) {
        throw new Error({ error: `Server Error: ${error.message}` })
    }
};

const getvideogameById = async (id) => {
    console.log(id);
    try {
        const source = isNaN(id) ? "BD" : "API"

        if (source === "API") {
            const response = await axios.get(`${IDURL}${id}?key=${API_KEY}`);
            if (response) {
                const dataApi = response.data;
                const { name, description, parent_platforms, background_image, released, rating, genres } = dataApi;

                const videogame = {
                    id: id,
                    name: name,
                    description: description,
                    platforms: parent_platforms.map((platform) => platform.platform.name),
                    image: background_image,
                    date: released,
                    rating: rating,
                    Genres: genres,
                }
                
                return videogame;
            }
        } else {
            const videogameBD = await Videogame.findByPk(id, {
                include: {
                    model: Genres,
                    through: { attributes: [] },
                }
            })
            if (videogameBD) {
                console.log(videogameBD);
                return videogameBD;
            }
        }

    } catch (error) {
        throw new Error({
            error: {
                message: `Server petition Error: ${error.message}`
            }
        })
    }
};

const postVideogames = async (data) => {
    try {
        const { name, description, platforms, image, date, rating, genres, precio } = data;

        const verifiVideogameExisting = await Videogame.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        if (verifiVideogameExisting) {
            return null; // Ya existe un videojuego con el mismo nombre
        }

        const videogame = await Videogame.create({
            name: name,
            description: description,
            platforms: platforms,
            image: image,
            date: date,
            rating: rating,
            precio: precio,
        });
        const genresFounded = await Genres.findAll({
            where: {
                name: {
                    [Op.in]: genres
                }
            }
        });
        await videogame.setGenres(genresFounded);



        const videogameWithGenres = await Videogame.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [
                {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                }]
        });
        // const videogameWithGenresFiltered = {
        //     id: videogameWithGenres.id,
        //     name: videogameWithGenres.name,
        //     description: videogameWithGenres.description,
        //     platforms: videogameWithGenres.platforms,
        //     image: videogameWithGenres.image,
        //     date: videogameWithGenres.date,
        //     rating: videogameWithGenres.rating,
        //     genres: videogameWithGenres.Genres?.map((genre) => genre.dataValues.name) // Extraer el nombre de los géneros

        // };
        // console.log(videogameWithGenres);
        // return videogameWithGenresFiltered;
        return videogameWithGenres;

    } catch (error) {
        throw error;
    };


};


module.exports = {
    getAllvideogames,
    getVideogamesByName,
    getAllVideogamesDB,
    getAllVideogamesAPI,
    getvideogameById,
    postVideogames,
};