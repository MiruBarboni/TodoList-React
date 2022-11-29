import { useDispatch, useSelector } from 'react-redux';
import { useDebounceCallback } from '../../../hooks/useDebounce/useDebounceCallback';

import { uiActions } from '../../../store/ui-slice';

import Icon from '../../UI/GoogleFontsIcons/Icon';

import cssStyle from './SearchInput.module.css';

const SearchInput = ({ searchHandler }) => {
	const [searchedValue, setSearchedValue] = useDebounceCallback(
		'',
		500,
		searchHandler
	);

	const dispatch = useDispatch();

	const clearSearchFieldHandler = () => {
		dispatch(uiActions.clearSearchedValue());
		setSearchedValue('');
	};

	return (
		<>
			<label htmlFor='searchInput'>
				<Icon className={cssStyle.icon}>search</Icon>
			</label>
			<input
				type='text'
				className={cssStyle.searchInput}
				placeholder='Search your list'
				id='searchInput'
				onChange={(e) => setSearchedValue(e.target.value)}
				value={searchedValue}
			/>

			{searchedValue.length > 0 && (
				<button className={cssStyle.btn}>
					<Icon className={cssStyle.icon} onClick={clearSearchFieldHandler}>
						cancel
					</Icon>
				</button>
			)}
		</>
	);
};

export default SearchInput;
