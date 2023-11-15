const axios = require("axios");
const URL = "https://api.rawg.io/api/platforms?key=";
require('dotenv').config();
const { API_KEY } = process.env;


const getPlatforms = async (req, res) => {
    try {
        const response = await axios.get(`${URL}${API_KEY}`);
        const platforms = response.data.results;

        const sendPlatforms = platforms.map((platform) => {
            return {
                id: platform.id,
                name: platform.name,
            }
        })
        return res.status(200).json(sendPlatforms);
    } catch (error) {
       return res.status(500).send(error)
    }

};

module.exports = getPlatforms;