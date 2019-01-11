import {
    ASTEROIDS_REQUEST,
    ASTEROIDS_SUCCEEDED,
	ASTEROIDS_FAILED,
	ADD_SELECTED_ASTEROID,
	REMOVE_SELECTED_ASTEROID
} from "../constants/actionTypes";

const initialState = {
	data: [],
	selected: [],
    error: null
}

const asteroidsReducer = (state = initialState, action) => {
    switch (action.type) {
		case ASTEROIDS_REQUEST: {
			return {
				...state,
                data: [],
                error: null
			};
		}
		case ASTEROIDS_FAILED: {
			return {
				...state,
				data: [],
				error: action.payload.error
			};
		}
		case ASTEROIDS_SUCCEEDED: {
			return {
				...state,
                data: action.payload.asteroids,
                error: null
			};
		}
		case ADD_SELECTED_ASTEROID: {
			return {
				...state,
				selected: [...state.selected, action.payload.asteroid]
			}
		}
		case REMOVE_SELECTED_ASTEROID: {
			return {
				...state,
				selected: state.selected.slice(0).filter(asteroid => asteroid.id !== action.payload.asteroid)
			}
		}
		default:
			return state;
	}
};

export default asteroidsReducer;