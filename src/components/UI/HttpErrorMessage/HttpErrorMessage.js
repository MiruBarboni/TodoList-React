import { useDispatch, useSelector } from 'react-redux';

import { createList } from '../../../api/createList';
import { deleteLists } from '../../../api/deleteLists';
import { readLists } from '../../../api/readLists';
import { deleteList } from '../../../api/deleteList';
import { updateList } from '../../../api/updateList';
import { createToDo } from '../../../api/todoList/createToDo';
import { deleteToDo } from '../../../api/todoList/deleteToDo';
import { updateToDo } from '../../../api/todoList/updateToDo';

import Icon from '../GoogleFontsIcons/Icon';

import cssStyle from './HttpErrorMessage.module.css';
import { fetchAuthData } from '../../../api/authentication/authentication';

const HttpErrorMessage = () => {
	const dispatch = useDispatch();

	const { httpError, errorFunction, retryInformation } = useSelector(
		(state) => state.error
	);

	const ReloadPageHandler = () => {
		if (errorFunction) {
			switch (errorFunction) {
				//Lists
				case 'readLists':
					dispatch(readLists());
					break;

				case 'createList':
					dispatch(createList());
					break;

				case 'deleteLists':
					dispatch(deleteLists());
					break;

				case 'deleteList':
					dispatch(deleteList(retryInformation.listId));
					break;

				case 'updateList':
					dispatch(
						updateList(retryInformation.updateValue, retryInformation.listId)
					);
					break;

				//Todos
				case 'createToDo':
					dispatch(createToDo(retryInformation.todo, retryInformation.listId));
					break;

				case 'deleteToDo':
					dispatch(
						deleteToDo(retryInformation.listId, retryInformation.todoId)
					);
					break;

				case 'updateToDo':
					dispatch(
						updateToDo(
							retryInformation.updatedToDo,
							retryInformation.listId,
							retryInformation.todoId
						)
					);
					break;

				//Authentication
				case 'fetchAuthData':
					dispatch(fetchAuthData());
					break;

				default:
					break;
			}
		}
	};
	return (
		<section className={cssStyle.errContainer}>
			<Icon className={cssStyle.errIcon}>error</Icon>
			<h1 className={cssStyle.errTitle}>Uh, oh!</h1>
			<p>{httpError?.status + ' - ' + httpError?.message}</p>
			<button className={cssStyle.errBtn} onClick={ReloadPageHandler}>
				Retry
			</button>
		</section>
	);
};

export default HttpErrorMessage;
