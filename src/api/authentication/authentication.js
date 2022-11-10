import { authActions } from '../../store/auth-slice';
import { errorActions } from '../../store/error-slice';
import { uiActions } from '../../store/ui-slice';
import axios from 'axios';

export const authentication = (url, enteredEmail, enteredPassword) => {
	return async (dispatch) => {
		const authData = async () => {
			const body = {
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			};
			const headers = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.post(url, body, headers);

			return response.data;
		};

		try {
			dispatch(uiActions.setIsLoading(true));

			const data = await authData();

			const expirationTime = new Date(
				new Date().getTime() + +data.expiresIn * 1000
			); //expiresIn is a nr of ms in which the ID token expires (string type)

			dispatch(
				authActions.login({
					token: data.idToken,
					expirationTime: expirationTime.getTime(),
					userId: data.localId,
					refreshToken: data.refreshToken,
				})
			);

			dispatch(uiActions.setIsLoading(false));
		} catch (err) {
			dispatch(uiActions.setIsLoading(false));

			const errorMessage = err.response?.data.error.message
				? {
						message: err.response?.data.error.message,
						status: err.response?.status,
				  }
				: {
						message: err.message,
						status: err.code,
				  };
			dispatch(
				errorActions.seHttpError({
					httpError: errorMessage,
					errorFunction: 'authentication',
					retryInformation: null,
				})
			);
		}
	};
};
