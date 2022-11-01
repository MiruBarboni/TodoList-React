import { listsActions } from '../store/lists-slice';
import { uiActions } from '../store/ui-slice';

export const createList = (list) => {
	return async (dispatch) => {
		const createData = async () => {
			//In Firebase, sending a POST request will create a resource
			// which will be stored in body on the fetch API configuration

			const response = await fetch(
				'https://todilist-7d4dd-default-rtdb.firebaseio.com/lists.json',
				{
					method: 'POST',
					body: JSON.stringify(list),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not create the list!'), {
					status: response.status,
				});
			}
		};
		try {
			dispatch(uiActions.setIsLoading(true));

			await createData();

			dispatch(listsActions.addList(list));

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			dispatch(
				uiActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'createList',
				})
			);
		}
	};
};
