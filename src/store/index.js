import { configureStore } from '@reduxjs/toolkit';

import listsSlice from './lists-slice';
import uiSlice from './ui-slice';

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		lists: listsSlice.reducer,
	},
});

export default store;
