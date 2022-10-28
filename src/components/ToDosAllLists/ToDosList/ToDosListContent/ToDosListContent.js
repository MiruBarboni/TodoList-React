import { useSelector } from 'react-redux';
import { useState } from 'react';

import Card from '../../../UI/Card/Card';
import DeleteListBtn from '../DeleteListBtn/DeleteListBtn';
import UnedibleToDos from './UnedibleToDos/UnedibleToDos';

import cssStyle from './ToDosListContent.module.css';

const ToDosListContent = ({ id, ...props }) => {
	const [shownDeleteListBtn, setShownDeleteListBtn] = useState(false);

	const { title, category, color } = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);

	const displayDeleteBtnHandler = () => {
		setShownDeleteListBtn(true);
	};
	const hideDeleteBtnHandler = () => {
		setShownDeleteListBtn(false);
	};

	return (
		<Card
			backgroundColor={color}
			onMouseEnter={displayDeleteBtnHandler}
			onMouseLeave={hideDeleteBtnHandler}
			onClick={props.openModalHandler}
		>
			{shownDeleteListBtn && <DeleteListBtn id={id} />}
			<h4 className={cssStyle.title}>{title ? title : 'Add Title'}</h4>
			<p>{category}</p>
			<UnedibleToDos id={id} />
		</Card>
	);
};

export default ToDosListContent;
