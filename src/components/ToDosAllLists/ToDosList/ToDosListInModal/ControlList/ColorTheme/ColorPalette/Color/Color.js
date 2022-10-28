import { useDispatch } from 'react-redux';
import { listsActions } from '../../../../../../../../store/lists-slice';

import cssStyle from './Color.module.css';

const Color = ({ id, ...props }) => {
	const dispatch = useDispatch();

	const changeListColorHandler = () => {
		dispatch(
			listsActions.updateList({
				id,
				toUpdate: { color: props.color },
			})
		);
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
