import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	FIREBASE_SIGN_IN_URL,
	FIREBASE_SIGN_UP_URL,
} from '../../../constants/firebase';

import { fetchAuthData } from '../../../api/authentication/authentication';

import TitleForm from './TitleForm/TitleForm';
import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import ControlButtons from './ControlButtons/ControlButtons';

import cssStyle from './AuthForm.module.css';

const AuthForm = () => {
	const dispatch = useDispatch();

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		let URL;
		isLoginFormDisplayed
			? (URL = FIREBASE_SIGN_IN_URL)
			: (URL = FIREBASE_SIGN_UP_URL);

		dispatch(fetchAuthData(URL, enteredEmail, enteredPassword));
	};
	return (
		<section className={cssStyle.auth}>
			<form onSubmit={submitHandler}>
				<TitleForm />
				<EmailInput emailInputRef={emailInputRef} />
				<PasswordInput passwordInputRef={passwordInputRef} />
				<ControlButtons />
			</form>
		</section>
	);
};

export default AuthForm;
