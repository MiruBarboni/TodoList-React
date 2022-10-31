import { listsActions } from './lists-slice';
import { uiActions } from './ui-slice';

export const fetchListsData = () => {
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

			const listsArray = Object.values(listsData);
			// firebase does not keep empty arrays. so we need this
			listsArray.forEach((element) => {
				if (!element.hasOwnProperty('todoList')) {
					element.todoList = [];
				}
			});
			dispatch(listsActions.replaceLists(listsArray));
			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));
			dispatch(
				uiActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'fetchListsData',
				})
			);
		}
	};
};

export const createList = async (list) => {
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

			// const data = await response.json();
			// console.log('data in createList: ', data);
		};
		try {
			await createData();
		} catch (err) {
			dispatch(
				uiActions.seHttpError({
					httpError: { message: err.message, status: err.status },
					errorFunction: 'createList',
				})
			);
		}
	};
};
