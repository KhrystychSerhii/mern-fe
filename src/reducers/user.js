import {
	LOGIN_USER_SUCCESS,
	REGISTRATION_USER_SUCCESS,
	GET_USER_PROFILE_SUCCESS,
	CLEAR_USER_PROFILE
} from '../constants';

const initialState = {
	user: null,
	error: null
};
export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER_SUCCESS:
		case REGISTRATION_USER_SUCCESS:
		case GET_USER_PROFILE_SUCCESS:
			return Object.assign({}, state, { user: action.user });

		case CLEAR_USER_PROFILE:
			return Object.assign({}, state, { user: null });

		default:
			return state;
	}
};