import { useState, useRef } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

import Modal from '../../UI/Modal/Modal';
import ToDosListInModal from './ToDosListInModal/ToDosListInModal';
import ToDosListContent from './ToDosListContent/ToDosListContent';
import { useSelector } from 'react-redux';

const ToDoList = ({ id }) => {
	const shouldOpenModalOnInitialRender = useSelector(
		(state) => state.ui.openModalOnCopy
	);
	const [isModalOpen, setIsModalOpen] = useState(
		shouldOpenModalOnInitialRender
	);

	const openModalHandler = (e) => {
		if (e.target.innerText === 'delete\nDelete List') return;
		setIsModalOpen(true);
	};

	const closeModalHandler = () => {
		setIsModalOpen(false);
	};

	const modalRef = useRef();

	useOnClickOutside(modalRef, closeModalHandler);

	return (
		<>
			{isModalOpen && (
				<Modal closeModalHandler={closeModalHandler} ref={modalRef}>
					<ToDosListInModal id={id} closeModalHandler={closeModalHandler} />
				</Modal>
			)}

			<ToDosListContent
				openModalHandler={openModalHandler}
				id={id}
			></ToDosListContent>
		</>
	);
};

export default ToDoList;
