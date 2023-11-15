import axios from "axios";
import { FILTER_BY_GENRES, FILTER_BY_ORIGIN, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMES, GET_VIDEOGAMESNAME, ORDER_BY_NAME, ORDER_BY_RATING, } from "./action-types";

export const getVideogames = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogames`)
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data,
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

export const getVideogamesName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: GET_VIDEOGAMESNAME,
                payload: response.data,
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

export const postVideogames = (form) => {
    return async function (dispatch) {
        try {
            await axios.post(`http://localhost:3001/videogames`, form);
            alert("¡Videogame created succesfully! :)");
        } catch (error) {
            alert("The videogame couldn't be created :(")
        }
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        try {
            const genres = await axios.get(`http://localhost:3001/genres`)
            return dispatch({
                type: GET_GENRES,
                payload: genres.data,
            })
        } catch (error) {
            alert("Couldn't get the videogame genres")
        }
    }
}

export const getPlatforms = () => {
    return async function (dispatch) {
        try {
            const platforms = await axios.get(`http://localhost:3001/platforms`)
            return dispatch({
                type: GET_PLATFORMS,
                payload: platforms.data,
            })
        } catch (error) {
            alert("Couldn't get the videogame platforms")
        }
    }
}

//Orden por nombre alfabetico
export function orderByName(sort) {
    return {
        type: ORDER_BY_NAME,
        payload: sort,
    };
}

export function orderByRating(sort) {
    return {
        type: ORDER_BY_RATING,
        payload: sort,
    }
}

export function filterByGenre(genre) {
    return {
        type: FILTER_BY_GENRES,
        payload: genre, 
    }
}

export function filterByOrigin(origin) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,
    }
    
}