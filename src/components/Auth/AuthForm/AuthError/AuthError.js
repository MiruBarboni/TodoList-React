import React from 'react';

import cssStyle from './AuthError.module.css';

const AuthError = ({ error }) => {
	const INVALID_PASSWORD = 'INVALID_PASSWORD';
	const EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND';
	const EMAIL_EXISTS = 'EMAIL_EXISTS';
	const USER_DISABLED = 'USER_DISABLED';
	const TOO_MANNY_ATEMPTS =
		'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';

	switch (error) {
		case INVALID_PASSWORD:
			return (
				<p className={cssStyle.err}>Your password is incorrect.Try again.</p>
			);
		case EMAIL_NOT_FOUND:
			return (
				<p className={cssStyle.err}>
					There is no user record corresponding to this identifier. The user may
					have been deleted.
				</p>
			);

		case EMAIL_EXISTS:
			return (
				<p className={cssStyle.err}>Your email exists already.Try again.</p>
			);
		case USER_DISABLED:
			return (
				<p className={cssStyle.err}>
					The user account has been disabled by an administrator.
				</p>
			);

		case TOO_MANNY_ATEMPTS:
			return (
				<p className={cssStyle.err}>
					Access to this account has been temporarily disabled. Please reset
					your password or try again later.
				</p>
			);

		default:
			return (
				<p className={cssStyle.err}>
					There's been an error during authentication process.
				</p>
			);
	}
};

export default AuthError;
