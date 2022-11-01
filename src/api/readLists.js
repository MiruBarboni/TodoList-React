import { uiActions } from '../store/ui-slice';
import { listsActions } from '../store/lists-slice';

export const readLists = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://todilist-7d4dd-default-rtdb.firebaseio.com/lists.json'
			);
			if (!response.ok) {
				//avoid warning: Expected an error object to be thrown no-throw-literal
				throw Object.assign(new Error('Could not fetch lists data!'), {
					status: response.status,
				});
			}
			const data = await response.json();
			return data;
		};

		try {
			dispatch(uiActions.setIsLoading(true));
			const listsData = await fetchData();
			if (listsData) {
				const listsArray = Object.values(listsData);
				// firebase does not keep empty arrays. so we need this
				listsArray.forEach((element) => {
					if (!element.hasOwnProperty('todoList')) {
						element.todoList = [];
					}
				});
				dispatch(listsActions.replaceLists(listsArray));
			}
			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));
			dispatch(
				uiActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'readLists',
				})
			);
		}
	};
};
