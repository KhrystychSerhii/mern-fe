import { loginUser, registerUser, fetchUser } from '../services/api';

import { LOGIN_USER_SUCCESS, REGISTRATION_USER_SUCCESS, GET_USER_PROFILE_SUCCESS, CLEAR_USER_PROFILE } from '../constants';

const loginSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
const registrationSuccess = (user) => ({type: REGISTRATION_USER_SUCCESS, user});
const getUserProfileSuccess = (user) => ({type: GET_USER_PROFILE_SUCCESS, user});
const clearUserProfile = () => ({type: CLEAR_USER_PROFILE});


export const login = ({email, password}) => async (dispatch) => {
	try {
		const response = await loginUser(email, password);
		if (response.data.success) {
			localStorage.setItem('token', response.data.token);
			dispatch(loginSuccess(response.data.user));
			return Promise.resolve();
		}
	} catch (e) {
		return Promise.reject();
	}
};

export const registration = (user) => async (dispatch) => {
	try {
		const response = await registerUser(user);
		return dispatch(login(user));
	} catch (e) {
		return Promise.reject();
	}
};

export const getUserProfile = () => async (dispatch) => {
	try {
		const response = await fetchUser();
		if (response.data.success) {
			return dispatch(getUserProfileSuccess(response.data.user))
		}
	} catch (e) {
		console.log('e', e);
		throw e;
	}
};

export const logOut = () => (dispatch) => {
	localStorage.removeItem('token');
	dispatch(clearUserProfile())
};

