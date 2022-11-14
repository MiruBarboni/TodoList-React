import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssStyle from './ForgotPasswordBtn.module.css';

const ForgotPasswordBtn = () => {
	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	return (
		isLoginFormDisplayed && (
			<Link className={cssStyle.link} to='/auth/passwordLost'>
				Forgot password?
			</Link>
		)
	);
};

export default ForgotPasswordBtn;
