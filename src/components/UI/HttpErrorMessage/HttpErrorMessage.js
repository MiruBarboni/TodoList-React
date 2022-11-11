import { useSelector } from 'react-redux';

import Icon from '../GoogleFontsIcons/Icon';

import cssStyle from './HttpErrorMessage.module.css';

const HttpErrorMessage = () => {
	const { httpError } = useSelector((state) => state.error);

	return (
		<>
			<div className={cssStyle.errBackdrop} />

			<section className={cssStyle.errContainer}>
				<Icon className={cssStyle.errIcon}>error</Icon>
				<h1 className={cssStyle.errTitle}>Uh, oh!</h1>
				<div>
					<p className={cssStyle.errCode}>{httpError?.status}</p>
					<p>{httpError?.message}</p>
				</div>
			</section>
		</>
	);
};

export default HttpErrorMessage;
