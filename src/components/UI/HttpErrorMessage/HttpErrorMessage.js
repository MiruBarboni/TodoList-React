import { useDispatch, useSelector } from 'react-redux';
import { createList, fetchListsData } from '../../../store/lists-actions';

import Icon from '../GoogleFontsIcons/Icon';

import cssStyle from './HttpErrorMessage.module.css';

const HttpErrorMessage = () => {
	const dispatch = useDispatch();
	const { httpError, errorFunction } = useSelector((state) => state.ui);

	const ReloadPageHandler = () => {
		if (errorFunction) {
			switch (errorFunction) {
				case 'fetchListsData':
					dispatch(fetchListsData());
					break;
				case 'createList':
					dispatch(createList());
					break;

				default:
					break;
			}
		}
	};
	return (
		<section className={cssStyle.errContainer}>
			<Icon className={cssStyle.errIcon}>error</Icon>
			<h1 className={cssStyle.errTitle}>Uh, oh!</h1>
			<p>{httpError.status + ' - ' + httpError.message}</p>
			<button className={cssStyle.errBtn} onClick={ReloadPageHandler}>
				Retry
			</button>
		</section>
	);
};

export default HttpErrorMessage;
