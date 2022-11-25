import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../../../store/auth-slice';

import cssStyle from './Navigation.module.css';

const Navigation = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { token } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(authActions.logout());
		history.push('/auth');
	};

	return (
		<nav className={cssStyle.nav}>
			<ul>
				{/* {!token && (
					<li>
						<Link to='/auth'>Login</Link>
					</li>
				)} */}
				{/* {token && <li>Profile</li>} */}
				{token && (
					<li>
						<button onClick={logoutHandler}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
