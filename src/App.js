import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { readLists } from './api/readLists';

import ControlLists from './components/ControlLists/ControlLists';
import ToDosAllLists from './components/ToDosAllLists/ToDosAllLists';
import SearchLists from './components/SearchLists/SearchLists';
import Loading from './components/UI/Loading/Loading';
import HttpErrorMessage from './components/UI/HttpErrorMessage/HttpErrorMessage';
import Layout from './components/Layout/Layout';

import AuthPage from './pages/AuthPage';
import { authActions } from './store/auth-slice';

function App() {
	const dispatch = useDispatch();

	const { isLoading, httpError } = useSelector((state) => state.ui);
	const { token, expirationTime } = useSelector((state) => state.auth);

	const userId = useSelector((state) => state.auth.userId);

	useEffect(() => {
		if (userId) dispatch(readLists(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		dispatch(authActions.initializeAuthData());
	}, [dispatch]);

	useEffect(() => {
		const currentTime = new Date().getTime();
		if (expirationTime && currentTime > expirationTime) {
			console.log(currentTime, expirationTime);
			dispatch(authActions.logout());
		}
	}, [expirationTime]);

	return (
		<>
			<Layout />
			{isLoading && <Loading />}
			{httpError && <HttpErrorMessage />}

			<Switch>
				{token && (
					<Route path='/' exact>
						<SearchLists />
						<ControlLists />
						<ToDosAllLists />
					</Route>
				)}

				{!token && (
					<Route path='/auth'>
						<AuthPage />
					</Route>
				)}

				<Route path='*'>
					{token ? <Redirect to='/' /> : <Redirect to='/auth' />}
				</Route>

				{/* <Route path='/profile'>
					{token && <UserProfile />}
					{!token && <Redirect to='/auth' />}
				</Route> */}
			</Switch>
		</>
	);
}

export default App;
