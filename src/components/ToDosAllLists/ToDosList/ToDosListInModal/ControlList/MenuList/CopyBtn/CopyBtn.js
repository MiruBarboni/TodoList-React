import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { listsActions } from '../../../../../../../store/lists-slice';
import Icon from '../../../../../../UI/GoogleFontsIcons/Icon';
import MenuListBtn from '../MenuListBtn/MenuListBtn';
import Notification from '../../../../../../UI/Notification/Notification';

import cssStyle from './CopyBtn.module.css';

const CopyBtn = ({ id }) => {
	const [isCopied, setIsCopied] = useState(false);
	const dispatch = useDispatch();

	const copyListHandler = () => {
		dispatch(listsActions.copyList(id));
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};
	return (
		<>
			<MenuListBtn className={cssStyle.copyBtn} onClick={copyListHandler}>
				<Icon>content_copy</Icon> Copy
			</MenuListBtn>
			{isCopied && <Notification>Copied</Notification>}
		</>
	);
};

export default CopyBtn;
