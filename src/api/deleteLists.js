import { FIREBASE_URL } from '../constants/firebase';

import { errorActions } from '../store/error-slice';
import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

export const deleteLists = (userId) => {
	return async (dispatch) => {
		const deleteData = async () => {
			const response = await fetch(
				`${FIREBASE_URL}/${userId}/lists.json?x-http-method-override=DELETE`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not delete lists data!'), {
					status: response.status,
				});
			}
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			await deleteData();

			dispatch(listsActions.deleteAllLists());

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'deleteLists',
					retryInformation: { userId },
				})
			);
		}
	};
};
