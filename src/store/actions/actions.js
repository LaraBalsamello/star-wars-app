import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setMovies = (movies) => {
    return {
        type: actionTypes.SET_MOVIES,
        movies: movies
    };
};

export const cleanError = () => {
    return {
        type: actionTypes.CLEAN_ERROR,
        error: false
    };
};

export const setCharacters = (characters) => {
    return {
        type: actionTypes.SET_CHARACTERS,
        characters: characters
    };
};

export const setLoadingChars = (loading) => {
    return {
        type: actionTypes.SET_LOADING_CHARACTERS,
        loadingChars: loading
    };
};

export const setLoadingMovies = (loading) => {
    return {
        type: actionTypes.SET_LOADING_MOVIES,
        loadingMovies: loading
    };
};

export const setLoadingMore = (loading) => {
    return {
        type: actionTypes.SET_LOADING_MORE,
        loadingMore: loading
    };
}

export const initMovies = () => {
    return dispatch => {
        dispatch(setLoadingMovies(true));
        axios.get('/films')
            .then(response => {
                dispatch(setMovies(response.data.results));
                dispatch(setLoadingMovies(false));
            })
            .catch(error => {
                dispatch(fetchFailed());
                dispatch(setLoadingMovies(false));
            });
    };
};


export const initCharacters = (e) => {
    return dispatch => {
        if (e === 0) {
            dispatch(setLoadingChars(true));
        } else {
            dispatch(setLoadingMore(true));
        }
        axios.get(`/people/?page=${e}`)
            .then(response => {
                dispatch(setCharacters(response.data.results));
                if (e === 0) {
                    dispatch(setLoadingChars(false));
                } else {
                    dispatch(setLoadingMore(false));
                }
            })
            .catch(error => {
                dispatch(fetchFailed());
                if (e === 0) {
                    dispatch(setLoadingChars(false));
                } else {
                    dispatch(setLoadingMore(false));
                }
            });
    };
};

export const searchCharactersAPI = (e) => {
    return dispatch => {
        dispatch(setLoadingChars(true));
        axios.get(`/people/?search=${e}`)
            .then(response => {
                dispatch(setCharacters(response.data.results));
                dispatch(setLoadingChars(false));
            })
            .catch(error => {
                dispatch(fetchFailed());
                dispatch(setLoadingChars(false));

            });
    };

};


export const searchMoviesAPI = (e) => {
    return dispatch => {
        dispatch(setLoadingChars(true));
        axios.get(`/films/?search=${e}`)
            .then(response => {
                dispatch(setMovies(response.data.results));
                dispatch(setLoadingMovies(false));
            })
            .catch(error => {
                dispatch(fetchFailed());
                dispatch(setLoadingMovies(false));
            });
    };

};

export const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    };
};

