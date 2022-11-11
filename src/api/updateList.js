import axios from 'axios';

import { FIREBASE_URL } from '../constants/firebase';

import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

import { setHttpError } from '../utils/setHttpError';

export const updateList = (updateValue, listId, userId) => {
	return async (dispatch) => {
		const updateData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}.json`;
			const body = updateValue;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.patch(url, body, headers);

			return response.data;
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			await updateData();

			dispatch(
				listsActions.updateList({
					id: listId,
					toUpdate: updateValue,
				})
			);

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			setHttpError(err, dispatch);
		}
	};
};
