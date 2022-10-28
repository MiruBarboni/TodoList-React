import { useDispatch } from 'react-redux';

import { listsActions } from '../../../../../../../store/lists-slice';

import cssStyle from './DeleteToDoButton.module.css';

const DeleteToDoButton = ({ todoId, listId }) => {
	const dispatch = useDispatch();

	const deleteToDoHandler = () => {
		dispatch(listsActions.deleteToDo({ listId, todoId }));
	};
	return (
		<button className={cssStyle.btn} onClick={deleteToDoHandler}>
			X
		</button>
	);
};

export default DeleteToDoButton;
