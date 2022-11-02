import { useDispatch } from 'react-redux';
import { updateToDo } from '../../../../../../../api/todoList/updateToDo';

import cssStyle from './ToDoCheckbox.module.css';

const ToDoCheckbox = ({ showChecked, listId, todoId }) => {
	const dispatch = useDispatch();

	const updateTodoCheckStatusHandler = (showChecked) => {
		dispatch(updateToDo({ isChecked: !showChecked }, listId, todoId));
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
