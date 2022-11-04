import { authActions } from '../../store/auth-slice';
import { errorActions } from '../../store/error-slice';
import { calculateRemainingTime } from '../../utils/calculateRemainingTime';

export const fetchAuthData = (url, enteredEmail, enteredPassword) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw Object.assign(new Error('Authentication failed.'), {
					status: response.status,
				});
			}
			return await response.json();
		};

		try {
			const data = await fetchData();

			const expirationTime = new Date(
				new Date().getTime() + +data.expiresIn * 1000
			); //expiresIn is a nr of ms in which the ID token expires (string type)

			dispatch(
				authActions.login({
					token: data.idToken,
					expirationTime: expirationTime.getTime(),
				})
			);

			const remainingTime = calculateRemainingTime(expirationTime);
			setTimeout(() => dispatch(authActions.logout()), remainingTime);
		} catch (err) {
			dispatch(
				errorActions.seHttpError({
					seHttpError: { message: err.message, status: err.status },
					errorFunction: 'fetchAuthData',
				})
			);
		}
	};
};
