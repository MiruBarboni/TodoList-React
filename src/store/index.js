import { configureStore } from '@reduxjs/toolkit';

import listsSlice from './lists-slice';
import uiSlice from './ui-slice';
import errorSlice from './error-slice';

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		lists: listsSlice.reducer,
		error: errorSlice.reducer,
	},
});

export default store;
