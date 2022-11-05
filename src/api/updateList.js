import { FIREBASE_URL } from '../constants/firebase';

import { errorActions } from '../store/error-slice';
import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

export const updateList = (updateValue, listId, userId) => {
	return async (dispatch) => {
		const updateData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/${userId}/lists/${listId}.json`,
				{
					method: 'PATCH',
					body: JSON.stringify(updateValue),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not update this list data!'), {
					status: response.status,
				});
			}
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

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'updateList',
					retryInformation: { listId, updateValue },
				})
			);
		}
	};
};
