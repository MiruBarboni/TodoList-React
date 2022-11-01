import { useDispatch, useSelector } from 'react-redux';

import { createList } from '../../../api/createList';
import { deleteLists } from '../../../api/deleteLists';
import { readLists } from '../../../api/readLists';
import { deleteList } from '../../../api/deleteList';

import Icon from '../GoogleFontsIcons/Icon';

import cssStyle from './HttpErrorMessage.module.css';

const HttpErrorMessage = () => {
	const dispatch = useDispatch();

	const { httpError, errorFunction, retryInformation } = useSelector(
		(state) => state.error
	);

	const ReloadPageHandler = () => {
		if (errorFunction) {
			switch (errorFunction) {
				case 'readLists':
					dispatch(readLists());
					break;

				case 'createList':
					dispatch(createList());
					break;

				case 'deleteLists':
					dispatch(deleteLists());
					break;

				case 'deleteList':
					dispatch(deleteList(retryInformation.listId));
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
			<p>{httpError?.status + ' - ' + httpError?.message}</p>
			<button className={cssStyle.errBtn} onClick={ReloadPageHandler}>
				Retry
			</button>
		</section>
	);
};

export default HttpErrorMessage;
