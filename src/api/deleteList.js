import { FIREBASE_URL } from '../constants/firebase';

import { errorActions } from '../store/error-slice';
import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

export const deleteList = (listId, userId) => {
	return async (dispatch) => {
		const deleteData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/${userId}/lists/${listId}.json`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not delete this list data!'), {
					status: response.status,
				});
			}
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			await deleteData();

			dispatch(listsActions.deleteList(listId));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'deleteList',
					retryInformation: { listId: listId },
				})
			);
		}
	};
};
