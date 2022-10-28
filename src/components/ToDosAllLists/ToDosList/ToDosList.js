import { useState, useRef } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

import Modal from '../../UI/Modal/Modal';
import ToDosListInModal from './ToDosListInModal/ToDosListInModal';
import ToDosListContent from './ToDosListContent/ToDosListContent';

const ToDoList = ({ id }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModalHandler = () => {
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
					<ToDosListInModal id={id} />
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
