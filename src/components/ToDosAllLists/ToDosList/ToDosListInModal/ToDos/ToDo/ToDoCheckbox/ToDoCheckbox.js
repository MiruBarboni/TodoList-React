import { useDispatch, useSelector } from 'react-redux';
import { updateToDo } from '../../../../../../../api/todoList/updateToDo';

import cssStyle from './ToDoCheckbox.module.css';

const ToDoCheckbox = ({ showChecked, listId, todoId }) => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	const updateTodoCheckStatusHandler = (showChecked) => {
		dispatch(updateToDo({ isChecked: !showChecked }, listId, todoId, userId));
	};

	return (
		<>
			<input
				className={cssStyle.todoCheckbox}
				type='checkbox'
				onChange={() => updateTodoCheckStatusHandler(showChecked)}
			/>
			<span
				className={`${cssStyle.checkmark} ${
					showChecked ? cssStyle.checkmarkChecked : ''
				}`}
			></span>
		</>
	);
};

export default ToDoCheckbox;
