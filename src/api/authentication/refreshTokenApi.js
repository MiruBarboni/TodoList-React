import { FIREBASE_REFRESH_TOKEN_URL } from '../../constants/firebase';
import { errorActions } from '../../store/error-slice';
import { authActions } from '../../store/auth-slice';
import axios from 'axios';

export const refreshTokenApi = (token) => {
	return async (dispatch) => {
		const refreshTokenData = async () => {
			const body = {
				refresh_token: token,
				grant_type: 'refresh_token',
			};
			const headers = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			};

			const response = await axios.post(
				FIREBASE_REFRESH_TOKEN_URL,
				body,
				headers
			);

			return response.data;
		};

		try {
			const data = await refreshTokenData();

			const expirationTime = new Date(
				new Date().getTime() + +data.expires_in * 1000
			); //expiresIn is a nr of ms in which the ID token expires (string type)

			dispatch(
				authActions.login({
					token: data.id_token,
					expirationTime: expirationTime.getTime(),
					userId: data.user_id,
					refreshToken: data.refresh_token,
				})
			);
		} catch (err) {
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
					errorFunction: 'refreshTokenApi',
					retryInformation: null,
				})
			);
		}
	};
};
