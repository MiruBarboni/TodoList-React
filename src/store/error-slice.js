import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	httpError: null,
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		seHttpError(state, action) {
			state.httpError = action.payload.httpError;
		},
	},
});

export const errorActions = errorSlice.actions;

export default errorSlice;
