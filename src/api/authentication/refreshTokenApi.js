import axios from 'axios';

import { FIREBASE_REFRESH_TOKEN_URL } from '../../constants/firebase';
import { authActions } from '../../store/auth-slice';

import { setHttpError } from '../../utils/setHttpError';

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
			setHttpError(err, dispatch);
		}
	};
};
