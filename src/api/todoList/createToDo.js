import axios from 'axios';

import { FIREBASE_URL } from '../../constants/firebase';

import { listsActions } from '../../store/lists-slice';

import { setHttpError } from '../../utils/setHttpError';

export const createToDo = (todo, listId, userId) => {
	return async (dispatch) => {
		const createData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists/${listId}/todoList.json`;
			const body = todo;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.post(url, body, headers);

			return response.data;
		};
		try {
			const newToDoId = await createData();

			const todoObj = { ...todo, id: newToDoId.name };

			dispatch(listsActions.addTodo({ todoObj, listId }));
		} catch (err) {
			setHttpError(err, dispatch);
		}
	};
};
