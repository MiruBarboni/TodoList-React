import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { readLists } from './api/readLists';

// import ControlLists from './components/ControlLists/ControlLists';
// import ToDosAllLists from './components/ToDosAllLists/ToDosAllLists';
// import SearchLists from './components/SearchLists/SearchLists';
// import Loading from './components/UI/Loading/Loading';
// import HttpErrorMessage from './components/UI/HttpErrorMessage/HttpErrorMessage';

import AuthPage from './pages/AuthPage';
import Layout from './components/Layout/Layout';
import { authActions } from './store/auth-slice';

function App() {
	const dispatch = useDispatch();

	// const { isLoading } = useSelector((state) => state.ui);
	const expirationTime = useSelector((state) => state.auth.expirationTime);

	useEffect(() => {
		dispatch(readLists());
	}, [dispatch]);

	useEffect(() => {
		dispatch(authActions.initializeAuthData());
	}, [dispatch]);

	useEffect(() => {
		const currentTime = new Date().getTime();
		if (currentTime > expirationTime) {
			dispatch(authActions.logout());
		}
	}, [expirationTime, dispatch]);

	return (
		<>
			<Layout />
			<AuthPage />

			{/* {isLoading && <Loading />}
			<SearchLists />
			<ControlLists />
			{httpError && <HttpErrorMessage />}
			<ToDosAllLists /> */}
		</>
	);
}

export default App;
