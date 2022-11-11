import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
	FIREBASE_SIGN_IN_URL,
	FIREBASE_SIGN_UP_URL,
} from '../../../constants/firebase';

import { authentication } from '../../../api/authentication/authentication';

import TitleForm from './TitleForm/TitleForm';
import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import ControlButtons from './ControlButtons/ControlButtons';
import { useInput } from '../../../hooks/useInput';

import cssStyle from './AuthForm.module.css';

const AuthForm = () => {
	const dispatch = useDispatch();

	/* eslint-disable no-useless-escape */
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		inputState: emailState,
		inputChangeHandler: emailChangeHandler,
		inputReset: emailReset,
	} = useInput(emailRegex, '');

	const passwordRegex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //Minimum eight characters, at least one letter, one number and one special character:
	const {
		inputState: passwordState,
		inputChangeHandler: passwordChangeHandler,
		inputReset: passwordReset,
	} = useInput(passwordRegex, '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		isTouched: emailIsTouched,
	} = emailState;

	const {
		value: enteredPasssword,
		isValid: passwordIsValid,
		isTouched: passwordIsTouched,
	} = passwordState;

	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	const submitHandler = (e) => {
		e.preventDefault();
		emailReset();
		passwordReset();

		if (!emailIsValid || !passwordIsValid) return;

		let URL;
		isLoginFormDisplayed
			? (URL = FIREBASE_SIGN_IN_URL)
			: (URL = FIREBASE_SIGN_UP_URL);

		dispatch(authentication(URL, enteredEmail, enteredPasssword));
	};
	return (
		<section className={cssStyle.auth}>
			<form onSubmit={submitHandler}>
				<TitleForm />
				<EmailInput
					emailState={emailState}
					emailChangeHandler={emailChangeHandler}
					emailIsValid={emailIsValid}
					emailIsTouched={emailIsTouched}
				/>
				<PasswordInput
					passwordState={passwordState}
					passwordChangeHandler={passwordChangeHandler}
					passwordIsValid={passwordIsValid}
					passwordIsTouched={passwordIsTouched}
				/>
				<ControlButtons
					emailIsValid={emailIsValid && emailIsTouched}
					passwordIsValid={passwordIsValid && passwordIsTouched}
				/>
			</form>
		</section>
	);
};

export default AuthForm;
