import PulseLoader from 'react-spinners/PulseLoader';

import cssStyle from './Loading.module.css';

const Loading = () => {
	const color = '#EDF6F9';

	return (
		<section className={cssStyle.container}>
			<PulseLoader color={color} size={10} aria-label='Loading Spinner' />
		</section>
	);
};

export default Loading;
