import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchedValue: '',
	isColorPaletteActive: false,
	isListMenuActive: false,
	isLoading: false,
	openModalOnCopy: false,
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
		setOpenModalOnCopy(state, action) {
			state.openModalOnCopy = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
