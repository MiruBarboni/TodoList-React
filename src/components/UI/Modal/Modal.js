import ReactDOM from 'react-dom';
import React from 'react';

import cssStyle from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={cssStyle.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = React.forwardRef((props, modalRef) => {
	return (
		<div className={cssStyle.modal} ref={modalRef}>
			<div>{props.children}</div>
			<button
				className={`material-symbols-outlined ${cssStyle.closeModal}`}
				onClick={props.closeModalHandler}
			>
				Close
			</button>
		</div>
	);
});

const Modal = React.forwardRef((props, modalRef) => {
	const portalElement = document.getElementById('overlays');

	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				portalElement
			)}

			{ReactDOM.createPortal(
				<ModalOverlay
					closeModalHandler={props.closeModalHandler}
					ref={modalRef}
				>
					{props.children}
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
});

export default Modal;
