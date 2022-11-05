import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoginFormDisplayed: false,
	expirationTime: null,
	token: null,
	userId: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		toggleIsLoginFormDisplayed(state) {
			state.isLoginFormDisplayed = !state.isLoginFormDisplayed;
		},

		login(state, action) {
			const { token, expirationTime, userId } = action.payload;

			state.token = token;
			state.expirationTime = expirationTime;
			state.userId = userId;

			localStorage.setItem('token', token);
			localStorage.setItem('expirationTime', expirationTime);
			localStorage.setItem('userId', userId);
		},

		logout(state) {
			state.token = null;
			state.expirationTime = null;
			state.userId = null;

			localStorage.removeItem('token', null);
			localStorage.removeItem('expirationTime', null);
			localStorage.removeItem('userId', null);
		},

		initializeAuthData(state) {
			state.token = localStorage.getItem('token');
			state.expirationTime = localStorage.getItem('expirationTime');
			state.userId = localStorage.getItem('userId');
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
