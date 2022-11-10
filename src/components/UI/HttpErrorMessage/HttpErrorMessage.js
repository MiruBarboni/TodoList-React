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
					dispatch(readLists(retryInformation.userId));
					break;

				case 'createList':
					dispatch(createList(retryInformation.userId));
					break;

				case 'deleteLists':
					dispatch(deleteLists(retryInformation.userId));
					break;

				case 'deleteList':
					dispatch(
						deleteList(retryInformation.listId, retryInformation.userId)
					);
					break;

				case 'updateList':
					dispatch(
						updateList(
							retryInformation.updateValue,
							retryInformation.listId,
							retryInformation.userId
						)
					);
					break;

				//Todos
				case 'createToDo':
					dispatch(
						createToDo(
							retryInformation.todo,
							retryInformation.listId,
							retryInformation.userId
						)
					);
					break;

				case 'deleteToDo':
					dispatch(
						deleteToDo(
							retryInformation.listId,
							retryInformation.todoId,
							retryInformation.userId
						)
					);
					break;

				case 'updateToDo':
					dispatch(
						updateToDo(
							retryInformation.updatedToDo,
							retryInformation.listId,
							retryInformation.todoId,
							retryInformation.userId
						)
					);
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
			<p>
				<span className={cssStyle.errCode}> {httpError?.status}</span>
				{' : ' + httpError?.message}
			</p>
			{retryInformation && (
				<button className={cssStyle.errBtn} onClick={ReloadPageHandler}>
					Retry
				</button>
			)}
		</section>
	);
};

export default HttpErrorMessage;
