import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movies: null,
    characters: [],
    loadingChars: false,
    loadingMovies: false,
    error: false,
};

export const setMovies = (state, action) => {
    return updateObject(state, {
        movies: action.movies,
    });
};

export const setCharacters = (state, action) => {
    return {
        ...state,
        characters: state.characters.concat(action.characters)
    }
};

export const setLoadingChars = (state, action) => {
    return {
        ...state,
        loadingChars: action.loadingChars
    }
};

export const setLoadingMovies = (state, action) => {
    return {
        ...state,
        loadingMovies: action.loadingMovies
    }
};

const fetchFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const cleanError = (state, action) => {
    return updateObject(state, { error: false });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        //CALL ACTIONS HERE
        case actionTypes.SET_MOVIES: return setMovies(state, action);
        case actionTypes.SET_CHARACTERS: return setCharacters(state, action);
        case actionTypes.SET_LOADING_MOVIES: return setLoadingMovies(state, action);
        case actionTypes.SET_LOADING_CHARACTERS: return setLoadingChars(state, action);
        case actionTypes.FETCH_FAILED: return fetchFailed(state, action);
        case actionTypes.CLEAN_ERROR: return cleanError(state, action);
        default: return state;
    }
};

export default reducer;