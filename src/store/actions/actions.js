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