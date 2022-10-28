import { useSelector } from 'react-redux';
import { useDebounceCallback } from '../../../../../hooks/useDebounceCallback';

import cssStyle from './Title.module.css';

const Title = ({ id, titleHandler }) => {
	const { title } = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);
	const [titleValue, setTitleValue] = useDebounceCallback(
		title,
		500,
		titleHandler
	);

	return (
		<input
			type='text'
			placeholder='Title'
			className={cssStyle.title}
			onChange={(e) => setTitleValue(e.target.value)}
			value={titleValue}
		/>
	);
};

export default Title;
