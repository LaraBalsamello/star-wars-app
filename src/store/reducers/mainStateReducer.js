import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movies: null
};

export const setMovies = (state, action) => {
    return updateObject(state, {
        movies: action.movies
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        //CALL ACTIONS HERE
        case actionTypes.SET_MOVIES: return setMovies(state, action);
        default: return state;
    }
};

export default reducer;