import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { updateToDo } from '../../../../../../api/todoList/updateToDo';

import ToDoCheckbox from './ToDoCheckbox/ToDoCheckbox';
import DeleteToDoButton from './DeleteToDoButton/DeleteToDoButton';
import ToDoInput from './ToDoInput/ToDoInput';

import cssStyle from './ToDo.module.css';

const ToDo = ({ showChecked, todoId, listId }) => {
	const dispatch = useDispatch();

	const updateTodoTextHandler = useCallback(
		(changedTodoText) => {
			dispatch(updateToDo({ text: changedTodoText }, listId, todoId));
		},
		[listId, todoId, dispatch]
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
