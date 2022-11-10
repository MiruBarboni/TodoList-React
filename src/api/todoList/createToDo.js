import { FIREBASE_URL } from '../../constants/firebase';

import { errorActions } from '../../store/error-slice';
import { listsActions } from '../../store/lists-slice';
import { uiActions } from '../../store/ui-slice';

export const createToDo = (todo, listId, userId) => {
	return async (dispatch) => {
		const createData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/${userId}/lists/${listId}/todoList.json`,
				{
					method: 'POST',
					body: JSON.stringify(todo),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not create todo item!'), {
					status: response.status,
				});
			}

			return await response.json(); // new ToDoId
		};
		try {
			dispatch(uiActions.setIsLoading(true));

			const newToDoId = await createData();

			const todoObj = { ...todo, id: newToDoId.name };

			dispatch(listsActions.addTodo({ todoObj, listId }));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'createToDo',
					retryInformation: { listId, todo, userId },
				})
			);
		}
	};
};
