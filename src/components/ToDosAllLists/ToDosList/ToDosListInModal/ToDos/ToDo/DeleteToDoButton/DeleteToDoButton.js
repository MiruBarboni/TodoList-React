import { useDispatch } from 'react-redux';
import { deleteToDo } from '../../../../../../../api/todoList/deleteToDo';

import cssStyle from './DeleteToDoButton.module.css';

const DeleteToDoButton = ({ todoId, listId }) => {
	const dispatch = useDispatch();

	const deleteToDoHandler = () => {
		dispatch(deleteToDo(listId, todoId));
	};
	return (
		<button className={cssStyle.btn} onClick={deleteToDoHandler}>
			X
		</button>
	);
};

export default DeleteToDoButton;
