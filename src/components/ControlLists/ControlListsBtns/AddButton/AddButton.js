import { useDispatch, useSelector } from 'react-redux';

import { createList } from '../../../../api/createList';
import ControlButton from '../../../UI/ControlButton/ControlButton';

import cssStyle from './AddButton.module.css';

const AddButton = () => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	const addNewListHandler = () => {
		const newList = {
			title: '',
			category: 'Select a category',
			color: '#ead2ac',
			todoList: [],
		};
		dispatch(createList(newList, userId));
	};
	return (
		<ControlButton className={cssStyle.addBtn} onClick={addNewListHandler}>
			+ Add
		</ControlButton>
	);
};

export default AddButton;
