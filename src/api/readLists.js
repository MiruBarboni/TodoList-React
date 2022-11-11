import axios from 'axios';

import { FIREBASE_URL } from '../constants/firebase';

import { uiActions } from '../store/ui-slice';
import { listsActions } from '../store/lists-slice';

import { setHttpError } from '../utils/setHttpError';

export const readLists = (userId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const url = `${FIREBASE_URL}/${userId}/lists.json`;
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.get(url, headers);

			return response.data;
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			const listsData = await fetchData();

			if (listsData) {
				const listsArray = [];

				Object.entries(listsData).forEach((el) => {
					listsArray.push({
						...el[1],
						id: el[0],
					});
				});

				// firebase does not keep empty arrays. so we need this
				listsArray.forEach((element) => {
					if (!element.hasOwnProperty('todoList')) {
						element.todoList = [];
					} else {
						const todosData = element.todoList;

						if (todosData) {
							const todosArray = [];
							Object.entries(todosData).forEach((el) => {
								todosArray.push({
									...el[1],
									id: el[0],
								});
							});
							element.todoList = todosArray;
						}
					}
				});

				dispatch(listsActions.replaceLists(listsArray));
			}
			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			setHttpError(err, dispatch);
		}
	};
};
