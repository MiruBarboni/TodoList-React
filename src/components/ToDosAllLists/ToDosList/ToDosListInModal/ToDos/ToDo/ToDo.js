import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { updateToDo } from '../../../../../../api/todoList/updateToDo';

import ToDoCheckbox from './ToDoCheckbox/ToDoCheckbox';
import DeleteToDoButton from './DeleteToDoButton/DeleteToDoButton';
import ToDoInput from './ToDoInput/ToDoInput';

import cssStyle from './ToDo.module.css';

const ToDo = ({ showChecked, todoId, listId }) => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	const updateTodoTextHandler = useCallback(
		(changedTodoText) => {
			dispatch(updateToDo({ text: changedTodoText }, listId, todoId), userId);
		},
		[listId, todoId, dispatch, userId]
	);
	return (
		<div className={cssStyle.container}>
			<ToDoCheckbox showChecked={showChecked} todoId={todoId} listId={listId} />
			<ToDoInput
				todoId={todoId}
				listId={listId}
				showChecked={showChecked}
				updateTodoTextHandler={updateTodoTextHandler}
			/>
			<DeleteToDoButton todoId={todoId} listId={listId} />
		</div>
	);
};

export default ToDo;
