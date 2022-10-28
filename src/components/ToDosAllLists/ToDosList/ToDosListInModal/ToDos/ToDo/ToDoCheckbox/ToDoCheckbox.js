import { useDispatch } from 'react-redux';
import { listsActions } from '../../../../../../../store/lists-slice';

import cssStyle from './ToDoCheckbox.module.css';

const ToDoCheckbox = ({ showChecked, listId, todoId }) => {
	const dispatch = useDispatch();

	const updateTodoCheckStatusHandler = (showChecked) => {
		console.log('here inside updatetoDoCheckStatus');
		dispatch(
			listsActions.updateToDo({
				listId,
				todoId,
				toUpdate: { isChecked: !showChecked },
			})
		);
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
