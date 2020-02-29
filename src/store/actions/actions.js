import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setMovies = (movies) => {
    return {
        type: actionTypes.SET_MOVIES,
        movies: movies
    };
};

export const initMovies = () => {
    return dispatch => {
        axios.get('/films')
            .then(response => {
                dispatch(setMovies(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };
};


export const setCharacters = (characters) => {
    return {
        type: actionTypes.SET_CHARACTERS,
        characters: characters
    };
};


export const initCharacters = () => {
    return dispatch => {
        axios.get('/people/?page=3')
            .then(response => {
                dispatch(setCharacters(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };
};

export const searchCharactersAPI = (e) => {
    return dispatch => {
        axios.get(`/people/?search=${e}`)
            .then(response => {
                dispatch(setCharacters(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };

};


export const searchMoviesAPI = (e) => {
    return dispatch => {
        axios.get(`/films/?search=${e}`)
            .then(response => {
                dispatch(setMovies(response.data.results));
            })
        // .catch(error => {
        //     dispatch(console.error(error));
        // });
    };

};

export const returnPrevCharacters = () => {
    return initCharacters();
};
export const returnPrevMovies = (movies) => {
    return initMovies();
};