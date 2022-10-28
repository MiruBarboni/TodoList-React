import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import SearchInput from '../UI/SearchInput/SearchInput';

import cssStyle from './SearchLists.module.css';

const SearchLists = () => {
	const dispatch = useDispatch();

	const searchListsHandler = (searchedString) => {
		const searchedValue = searchedString.toLowerCase();
		dispatch(uiActions.setSearchedValue(searchedValue));

		searchedValue.length > 0
			? dispatch(uiActions.displayCancelSearchBtn())
			: dispatch(uiActions.hideCancelSearchBtn());
	};

	return (
		<section className={cssStyle.search}>
			<SearchInput searchHandler={searchListsHandler} />
		</section>
	);
};

export default SearchLists;
