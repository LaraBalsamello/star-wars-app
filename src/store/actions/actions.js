import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setMovies = (movies) => {
    console.log(movies)
    return {
        type: actionTypes.SET_MOVIES,
        movies: movies
    };
};

export const initMovies = () => {
    return dispatch => {
        axios.get('/films')
            .then(response => {
                console.log(response)
                dispatch(setMovies(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };
};


export const setCharacters = (characters) => {
    console.log(characters)
    return {
        type: actionTypes.SET_CHARACTERS,
        characters: characters
    };
};

export const initCharacters = () => {
    return dispatch => {
        axios.get('/people')
            .then(response => {
                console.log(response)
                dispatch(setCharacters(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };
};