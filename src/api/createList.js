import { FIREBASE_URL } from '../constants/firebase';

import { errorActions } from '../store/error-slice';
import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

export const createList = (list, userId) => {
	return async (dispatch) => {
		const createData = async () => {
			//In Firebase, sending a POST request will create a resource
			// which will be stored in body on the fetch API configuration

			const response = await fetch(`${FIREBASE_URL}/${userId}/lists.json`, {
				method: 'POST',
				body: JSON.stringify(list),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not create the list!'), {
					status: response.status,
				});
			}

			return await response.json(); //new id
		};
		try {
			dispatch(uiActions.setIsLoading(true));

			const newId = await createData();

			dispatch(listsActions.addList({ ...list, id: newId.name }));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				errorActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'createList',
				})
			);
		}
	};
};
