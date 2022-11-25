import axios from 'axios';

import { FIREBASE_URL } from '../constants/firebase';

import { listsActions } from '../store/lists-slice';

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
			await updateData();

			dispatch(
				listsActions.updateList({
					id: listId,
					toUpdate: updateValue,
				})
			);
		} catch (err) {
			setHttpError(err, dispatch);
		}
	};
};
