import axios from 'axios';

import { FIREBASE_SEND_PASSWORD_RESET_EMAIL_URL } from '../../constants/firebase';
import { authActions } from '../../store/auth-slice';

export const resetPassword = (enteredEmail) => {
	return async (dispatch) => {
		const sentData = async () => {
			const body = {
				requestType: 'PASSWORD_RESET',
				email: enteredEmail,
			};
			const headers = {
				headers: {
					'Content-Type': 'application.json',
				},
			};

			const response = await axios.post(
				FIREBASE_SEND_PASSWORD_RESET_EMAIL_URL,
				body,
				headers
			);

			return response.data;
		};

		try {
			await sentData();
			dispatch(authActions.displaySucceededMsg());
		} catch (err) {
			const errMsg = err.response?.data.error?.message;
			dispatch(authActions.displayAuthError(errMsg));
		}
	};
};
