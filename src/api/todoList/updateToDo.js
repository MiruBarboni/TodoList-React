import axios from 'axios';

import { FIREBASE_URL } from '../../constants/firebase';

import { listsActions } from '../../store/lists-slice';

import { setHttpError } from '../../utils/setHttpError';

export const updateToDo = (updatedToDo, listId, todoId, userId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}/todoList/${todoId}.json`;
			const body = updatedToDo;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.patch(url, body, headers);

			return response.data;
		};
		try {
			await fetchData();

			dispatch(
				listsActions.updateToDo({ toUpdate: updatedToDo, listId, todoId })
			);
		} catch (err) {
			setHttpError(err, dispatch);
		}
	};
};
