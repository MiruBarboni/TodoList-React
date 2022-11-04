import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoginFormDisplayed: false,
	expirationTime: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		toggleIsLoginFormDisplayed(state) {
			state.isLoginFormDisplayed = !state.isLoginFormDisplayed;
		},

		login(state, action) {
			const { token, expirationTime } = action.payload;

			state.token = token;
			state.expirationTime = expirationTime;

			localStorage.setItem('token', token);
			localStorage.setItem('expirationTime', expirationTime);
		},

		logout(state) {
			state.token = null;
			state.expirationTime = null;

			localStorage.removeItem('token', null);
			localStorage.removeItem('expirationTime', null);
		},

		initializeAuthData(state) {
			state.token = localStorage.getItem('token');
			state.expirationTime = localStorage.getItem('expirationTime');
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
