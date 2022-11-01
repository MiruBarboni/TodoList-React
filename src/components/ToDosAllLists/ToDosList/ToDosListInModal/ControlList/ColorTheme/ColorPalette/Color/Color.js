import { useDispatch } from 'react-redux';
import { updateList } from '../../../../../../../../api/updateList';

import cssStyle from './Color.module.css';

const Color = ({ id, ...props }) => {
	const dispatch = useDispatch();

	const changeListColorHandler = () => {
		dispatch(updateList({ color: props.color }, id));
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
