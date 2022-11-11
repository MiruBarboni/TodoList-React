import axios from 'axios';

import { FIREBASE_URL } from '../../constants/firebase';

import { listsActions } from '../../store/lists-slice';
import { uiActions } from '../../store/ui-slice';

import { setHttpError } from '../../utils/setHttpError';

export const updateToDo = (updatedToDo, listId, todoId, userId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}/todoList/${todoId}.json`;
			const body = updateToDo;
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

			await fetchData();

			dispatch(
				listsActions.updateToDo({ toUpdate: updatedToDo, listId, todoId })
			);

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			setHttpError(err, dispatch);
		}
	};
};
