import axios from 'axios';

import { FIREBASE_URL } from '../../constants/firebase';

import { listsActions } from '../../store/lists-slice';
import { uiActions } from '../../store/ui-slice';

import { setHttpError } from '../../utils/setHttpError';

export const deleteToDo = (listId, todoId, userId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}/todoList/${todoId}.json`;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.delete(url, headers);

			return response.data;
		};
		try {
			await fetchData();

			dispatch(listsActions.deleteToDo({ listId, todoId }));
		} catch (err) {
			setHttpError(err, dispatch);
		}
	};
};
