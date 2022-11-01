import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	httpError: null,
	errorFunction: null,
	retryInformation: null,
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		seHttpError(state, action) {
			state.httpError = action.payload.httpError;
			state.errorFunction = action.payload.errorFunction;
			state.retryInformation = action.payload.retryInformation;
		},
	},
});

export const errorActions = errorSlice.actions;

export default errorSlice;
