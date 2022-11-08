import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoginFormDisplayed: false,
	expirationTime: null,
	token: null,
	userId: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		toggleIsLoginFormDisplayed(state) {
			state.isLoginFormDisplayed = !state.isLoginFormDisplayed;
		},

		login(state, action) {
			const { token, expirationTime, userId, refreshToken } = action.payload;

			state.token = token;
			state.expirationTime = expirationTime;
			state.userId = userId;
			state.refreshToken = refreshToken;

			localStorage.setItem('token', token);
			localStorage.setItem('expirationTime', expirationTime);
			localStorage.setItem('userId', userId);
			localStorage.setItem('refreshToken', refreshToken);
		},

		logout(state) {
			state.token = null;
			state.expirationTime = null;
			state.userId = null;
			state.refreshToken = null;

			localStorage.removeItem('token', null);
			localStorage.removeItem('expirationTime', null);
			localStorage.removeItem('userId', null);
			localStorage.removeItem('refreshToken', null);
		},

		initializeAuthData(state) {
			state.token = localStorage.getItem('token');
			state.expirationTime = localStorage.getItem('expirationTime');
			state.userId = localStorage.getItem('userId');
			state.refreshToken = localStorage.getItem('refreshToken');
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
