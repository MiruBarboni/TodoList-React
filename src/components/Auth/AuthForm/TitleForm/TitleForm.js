import React from 'react';
import { useSelector } from 'react-redux';

import cssStyle from './TitleForm.module.css';

const TitleForm = () => {
	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	return (
		<h1 className={cssStyle.title}>
			{isLoginFormDisplayed ? 'Login' : 'Sign Up'}
		</h1>
	);
};

export default TitleForm;
