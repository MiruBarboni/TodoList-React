import axios from 'axios';

import { FIREBASE_URL } from '../constants/firebase';

import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

import { setHttpError } from '../utils/setHttpError';

export const createList = (list, userId) => {
	return async (dispatch) => {
		const createData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists.json`;
			const body = list;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await axios.post(url, body, headers);

			return response.data;
		};
		try {
			dispatch(uiActions.setIsLoading(true));

			const newId = await createData();

			dispatch(listsActions.addList({ ...list, id: newId.name }));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			setHttpError(err, dispatch);
		}
	};
};
