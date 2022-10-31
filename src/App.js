import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchListsData } from './store/lists-actions';

import ControlLists from './components/ControlLists/ControlLists';
import ToDosAllLists from './components/ToDosAllLists/ToDosAllLists';
import SearchLists from './components/SearchLists/SearchLists';
import Loading from './components/UI/Loading/Loading';
import HttpErrorMessage from './components/UI/HttpErrorMessage/HttpErrorMessage';

function App() {
	const dispatch = useDispatch();
	const { isLoading, httpError } = useSelector((state) => state.ui);

	useEffect(() => {
		dispatch(fetchListsData());
	}, [dispatch]);

	return (
		<>
			{isLoading && <Loading />}
			<SearchLists />
			<ControlLists />
			{httpError && <HttpErrorMessage />}
			<ToDosAllLists />
		</>
	);
}

export default App;
