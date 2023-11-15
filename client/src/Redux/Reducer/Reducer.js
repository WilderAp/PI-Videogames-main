import { FILTER_BY_GENRES, FILTER_BY_ORIGIN, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMES, GET_VIDEOGAMESNAME, ORDER_BY_NAME, ORDER_BY_RATING, } from "../Actions/action-types";


let initialState = {
    videogames: [],
    allVideogames: [],
    allVideogamesBackUp: [],
    createdVideogames: [],
    genres: [],
    platforms: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            if (state.videogames.length === 0) {

                return {
                    ...state,
                    allVideogames: action.payload,
                    videogames: action.payload,
                    allVideogamesBackUp: action.payload,
                }
            } //porsilas
            return {
                ...state,
                allVideogames: action.payload,
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload,
            }
        case GET_VIDEOGAMESNAME:
            return {
                ...state,
                allVideogames: action.payload,
                videogames: action.payload,
            }
        case ORDER_BY_RATING:
            const type2 = action.payload;
            let sortedRating = [...state.allVideogames];
            let sortedRating2 = [...state.allVideogames];

            if (type2 === "lowest") {
                sortedRating.sort((a, b) => a.rating - b.rating);
                sortedRating2.sort((a, b) => a.rating - b.rating);
                return {
                    ...state,
                    allVideogames: sortedRating,
                    videogames: sortedRating2,
                }
            } else if (type2 === "higher") {
                sortedRating.sort((a, b) => b.rating - a.rating);
                sortedRating2.sort((a, b) => b.rating - a.rating);
                return {
                    ...state,
                    allVideogames: sortedRating,
                    videogames: sortedRating2,
                }
            } else {
                sortedRating = state.allVideogames;
            }

            return {
                ...state,
                videogames: sortedRating,
            }

        case ORDER_BY_NAME:
            const type = action.payload;
            let sortedVideogames = [...state.allVideogames];
            let sortedVideogames2 = [...state.allVideogames];

            if (type === "A-Z") {
                sortedVideogames.sort((a, b) => a.name.localeCompare(b.name));
                sortedVideogames2.sort((a, b) => a.name.localeCompare(b.name));
                return {
                    ...state,
                    allVideogames: sortedVideogames,
                    videogames: sortedVideogames2
                }
            }
            else if (type === "Z-A") {
                sortedVideogames.sort((a, b) => b.name.localeCompare(a.name));
                sortedVideogames2.sort((a, b) => b.name.localeCompare(a.name));
                return {
                    ...state,
                    allVideogames: sortedVideogames,
                    videogames: sortedVideogames2
                }
            } else {
                sortedVideogames = state.allVideogames
            }

            return {
                ...state,
                videogames: sortedVideogames
            };

        case FILTER_BY_ORIGIN:
            const { payload } = action;
            const fromVideogames = state.videogames;
            if (payload === "API") {
                const filtered = fromVideogames.filter(game => typeof game.id === "number");
                return {
                    ...state,
                    allVideogames: filtered,
                }
            } else if (payload === "DB") {
                const filteredDB = fromVideogames.filter(game => typeof game.ID === "string");
                return {
                    ...state,
                    allVideogames: filteredDB,
                }
            } else {
                return {
                    ...state,
                    allVideogames: fromVideogames
                }
            }

        case FILTER_BY_GENRES:
            const videogames = state.videogames;
            const filteredVideogames = action.payload === "All" ? videogames :
                videogames.filter(game => game.Genres?.some(genre => genre.name === action.payload));
            return {
                ...state,
                allVideogames: filteredVideogames,
            };



        default: return state;
    }

}

export default rootReducer;