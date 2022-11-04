import { configureStore } from '@reduxjs/toolkit';

import listsSlice from './lists-slice';
import uiSlice from './ui-slice';
import errorSlice from './error-slice';
import authSlice from './auth-slice';

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		lists: listsSlice.reducer,
		error: errorSlice.reducer,
		auth: authSlice.reducer,
	},
});

export default store;
