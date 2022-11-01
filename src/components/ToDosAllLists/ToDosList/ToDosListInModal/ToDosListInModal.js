import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Card from '../../../UI/Card/Card';
import AddToDo from './AddToDo/AddToDo';
import Category from './Category/Category';
import ToDos from './ToDos/ToDos';
import ControlList from './ControlList/ControlList';
import Title from './Title/Title';
import CheckedToDos from './ToDos/CheckedToDos/CheckedToDos';

import { updateList } from '../../../../api/updateList';

import cssStyle from './ToDosListInModal.module.css';

const ToDosListInModal = ({ id }) => {
	const { color } = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);

	const dispatch = useDispatch();

	const titleHandler = useCallback(
		(changedTitle) => {
			dispatch(updateList({ title: changedTitle }, id));
		},
		[id, dispatch]
	);

	return (
		<>
			<Card backgroundColor={color} className={cssStyle.container}>
				<Title id={id} titleHandler={titleHandler} />
				<Category id={id} />
				<AddToDo id={id} />
				<ToDos id={id} showChecked={false} />
				<CheckedToDos id={id} />
				<ToDos id={id} showChecked={true} />
				<ControlList id={id} />
			</Card>
		</>
	);
};

export default ToDosListInModal;
