import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteLists } from '../../../../api/deleteLists';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import ControlButton from '../../../UI/ControlButton/ControlButton';

import cssStyle from './DeleteButton.module.css';

const DeleteButton = () => {
	const dispatch = useDispatch();

	const lists = useSelector((state) => state.lists);

	const userId = useSelector((state) => state.auth.userId);

	const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

	const removeAllListsHandler = () => {
		lists.length !== 0
			? dispatch(deleteLists(userId))
			: setShowNotFoundMsg(true);
	};
	const showNotFoundMsgRef = useRef();
	useOnClickOutside(showNotFoundMsgRef, () => setShowNotFoundMsg(false));

	return (
		<>
			<ControlButton
				className={cssStyle.removeBtn}
				onClick={removeAllListsHandler}
			>
				Delete All
			</ControlButton>
			{showNotFoundMsg && (
				<div className={cssStyle.notFound} ref={showNotFoundMsgRef}>
					There are no lists to be deleted!
				</div>
			)}
		</>
	);
};

export default DeleteButton;
