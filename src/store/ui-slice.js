import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openedListId: null,
	searchedValue: '',
	isDisplayCancelSearchBtn: false,
	isColorPaletteActive: false,
	isListMenuActive: false,

	isLoading: false,
	httpError: null,
	errorFunction: null,
};
const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setSearchedValue(state, action) {
			state.searchedValue = action.payload;
		},
		clearSearchedValue(state) {
			state.searchedValue = '';
		},
		displayCancelSearchBtn(state) {
			state.isDisplayCancelSearchBtn = true;
		},
		hideCancelSearchBtn(state) {
			state.isDisplayCancelSearchBtn = false;
		},
		displayColorPalette(state) {
			state.isColorPaletteActive = true;
		},

		hideColorPalette(state) {
			state.isColorPaletteActive = false;
		},
		displayListMenu(state) {
			state.isListMenuActive = true;
		},

		hideListMenu(state) {
			state.isListMenuActive = false;
		},

		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		seHttpError(state, action) {
			state.httpError = action.payload.httpError;
			state.errorFunction = action.payload.errorFunction;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
