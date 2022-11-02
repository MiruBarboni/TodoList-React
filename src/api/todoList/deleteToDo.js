import { FIREBASE_URL } from '../../constants/firebase';

import { errorActions } from '../../store/error-slice';
import { listsActions } from '../../store/lists-slice';
import { uiActions } from '../../store/ui-slice';

export const deleteToDo = (listId, todoId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/lists/${listId}/todoList/${todoId}.json`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw Object.assign(new Error('Could not delete todo item!'), {
					status: response.status,
				});
			}

			return await response.json();
		};
		try {
			dispatch(uiActions.setIsLoading(true));

			await fetchData();

			dispatch(listsActions.deleteToDo({ listId, todoId }));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'deleteToDo',
					retryInformation: { listId, todoId },
				})
			);
		}
	};
};
