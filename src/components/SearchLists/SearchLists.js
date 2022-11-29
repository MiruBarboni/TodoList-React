import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import SearchInput from '../UI/SearchInput/SearchInput';

import cssStyle from './SearchLists.module.css';

const SearchLists = () => {
	const dispatch = useDispatch();

	const searchListsHandler = useCallback(
		(searchedString) => {
			const searchedValue = searchedString.toLowerCase();
			dispatch(uiActions.setSearchedValue(searchedValue));
		},
		[dispatch]
	);

	return (
		<section className={cssStyle.search}>
			<SearchInput searchHandler={searchListsHandler} />
		</section>
	);
};

export default SearchLists;
