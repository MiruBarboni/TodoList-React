import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { readLists } from './api/readLists';
import { authActions } from './store/auth-slice';
import ControlLists from './components/ControlLists/ControlLists';
import ToDosAllLists from './components/ToDosAllLists/ToDosAllLists';
import SearchLists from './components/SearchLists/SearchLists';
import Loading from './components/UI/Loading/Loading';
import HttpErrorMessage from './components/UI/HttpErrorMessage/HttpErrorMessage';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import LostPassword from './pages/LostPassword';

function App() {
	const { isLoading } = useSelector((state) => state.ui);
	const { httpError } = useSelector((state) => state.error);
	const { token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	useEffect(() => {
		if (userId) dispatch(readLists(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		dispatch(authActions.initializeAuthData());
	}, [dispatch]);

	return (
		<>
			<Layout />
			{isLoading && <Loading />}
			{httpError && <HttpErrorMessage />}

			<Switch>
				{token && (
					<>
						<Route path='/home'>
							<SearchLists />
							<ControlLists />
							<ToDosAllLists />
						</Route>
						<Route path='*'>
							<Redirect to='/home' />
						</Route>
					</>
				)}

				{!token && (
					<>
						<Route path='/auth' exact>
							<AuthPage />
						</Route>

						<Route path='/auth/passwordLost'>
							<LostPassword />
						</Route>

						<Route path='*'>
							<Redirect to='/auth' />
						</Route>
					</>
				)}

				{/* <Route path='/profile'>
					{token && <UserProfile />}
					{!token && <Redirect to='/auth' />}
				</Route> */}
			</Switch>
		</>
	);
}

export default App;
