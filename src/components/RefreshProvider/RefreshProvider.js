import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';

import { refreshTokenApi } from '../../api/authentication/refreshTokenApi';

import cssStyle from './RefreshProvider.module.css';

const RefreshProvider = (props) => {
	const dispatch = useDispatch();

	const { expirationTime, refreshToken } = useSelector((state) => state.auth);

	const refreshCheckHandler = useCallback(
		(e) => {
			if (e?.target.innerText === 'Logout') return;

			const currentTime = new Date().getTime();

			if (expirationTime && +expirationTime - currentTime < 5 * 60 * 1000) {
				dispatch(refreshTokenApi(refreshToken));
			}
		},
		[dispatch, refreshToken]
	);

	useEffect(() => {
		refreshCheckHandler();
	}, [refreshCheckHandler]);

	return (
		<div onClick={refreshCheckHandler} className={cssStyle.container}>
			{props.children}
		</div>
	);
};

export default RefreshProvider;
