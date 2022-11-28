import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoginFormDisplayed: true,
	expirationTime: null,
	token: null,
	userId: null,
	refreshToken: null,
	error: null,
	succeededMsg: false,
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
			state.error = null;

			localStorage.removeItem('token', null);
			localStorage.removeItem('expirationTime', null);
			localStorage.removeItem('userId', null);
			localStorage.removeItem('refreshToken', null);
			localStorage.removeItem('error', null);
		},

		initializeAuthData(state) {
			state.token = localStorage.getItem('token');
			state.expirationTime = localStorage.getItem('expirationTime');
			state.userId = localStorage.getItem('userId');
			state.refreshToken = localStorage.getItem('refreshToken');
			state.error = localStorage.getItem('error');
		},

		displayAuthError(state, action) {
			state.error = action.payload;
		},
		clearAuthError(state) {
			state.error = null;
		},

		displaySucceededMsg(state) {
			state.succeededMsg = true;
		},
		clearSucceededMsg(state) {
			state.succeededMsg = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
