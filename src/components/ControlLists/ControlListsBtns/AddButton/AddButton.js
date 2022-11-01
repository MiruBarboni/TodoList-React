import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { createList } from '../../../../api/createList';
import ControlButton from '../../../UI/ControlButton/ControlButton';

import cssStyle from './AddButton.module.css';

const AddButton = () => {
	const dispatch = useDispatch();

	const addNewListHandler = () => {
		const id = uuidv4();
		const newList = {
			id,
			title: '',
			category: 'Select a category',
			color: '#ead2ac',
			todoList: [],
		};
		dispatch(createList(newList));
	};
	return (
		<ControlButton className={cssStyle.addBtn} onClick={addNewListHandler}>
			+ Add
		</ControlButton>
	);
};

export default AddButton;
