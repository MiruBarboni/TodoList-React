import { FIREBASE_REFRESH_TOKEN_URL } from '../../constants/firebase';
import { errorActions } from '../../store/error-slice';
import { authActions } from '../../store/auth-slice';

export const refreshTokenFn = (token) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(FIREBASE_REFRESH_TOKEN_URL, {
				method: 'POST',
				body: JSON.stringify({
					refresh_token: token,
					grant_type: 'refresh_token',
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw Object.assign(new Error('Sending refresh token failed.'), {
					status: response.status,
				});
			}
			return await response.json();
		};

		try {
			const data = await fetchData();

			const expirationTime = new Date(new Date().getTime() + 2 * 60 * 1000); //expiresIn is a nr of ms in which the ID token expires (string type)

			dispatch(
				authActions.login({
					token: data.id_token,
					expirationTime: expirationTime.getTime(),
					userId: data.user_id,
					refreshToken: data.refresh_token,
				})
			);
		} catch (err) {
			dispatch(
				errorActions.seHttpError({
					seHttpError: { message: err.message, status: err.status },
					errorFunction: 'refreshTokenFn',
					retryInformation: { token },
				})
			);
		}
	};
};
