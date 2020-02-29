import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movies: null,
    characters: null
};

export const setMovies = (state, action) => {
    return updateObject(state, {
        movies: action.movies
    });
};

export const setCharacters = (state, action) => {
    return updateObject(state, {
        characters: action.characters
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        //CALL ACTIONS HERE
        case actionTypes.SET_MOVIES: return setMovies(state, action);
        case actionTypes.SET_CHARACTERS: return setCharacters(state, action);
        default: return state;
    }
};

export default reducer;