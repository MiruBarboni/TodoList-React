import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../../../../../../../../api/updateList';

import cssStyle from './Color.module.css';

const Color = ({ id, ...props }) => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	const changeListColorHandler = () => {
		dispatch(updateList({ color: props.color }, id, userId));
	};

	return (
		<div
			className={cssStyle.color}
			style={{ backgroundColor: props.color || '#ccc' }}
			onClick={changeListColorHandler}
		></div>
	);
};

export default Color;
