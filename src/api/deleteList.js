import axios from 'axios';

import { FIREBASE_URL } from '../constants/firebase';

import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

import { setHttpError } from '../utils/setHttpError';

export const deleteList = (listId, userId) => {
	return async (dispatch) => {
		const deleteData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}.json`;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.delete(url, headers);

			return response.data;
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			await deleteData();

			dispatch(listsActions.deleteList(listId));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			setHttpError(err, dispatch);
		}
	};
};
