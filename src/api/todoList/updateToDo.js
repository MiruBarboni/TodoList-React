import { FIREBASE_URL } from '../../constants/firebase';

import { errorActions } from '../../store/error-slice';
import { listsActions } from '../../store/lists-slice';
import { uiActions } from '../../store/ui-slice';

export const updateToDo = (updatedToDo, listId, todoId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/lists/${listId}/todoList/${todoId}.json`,
				{
					method: 'PATCH',
					body: JSON.stringify(updatedToDo),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw Object.assign(new Error('Could not update this todo item!'), {
					status: response.status,
				});
			}
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

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'updateToDo',
					retryInformation: { updateToDo, listId, todoId },
				})
			);
		}
	};
};
