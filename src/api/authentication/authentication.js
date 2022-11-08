import { authActions } from '../../store/auth-slice';
import { errorActions } from '../../store/error-slice';
import { uiActions } from '../../store/ui-slice';

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
			dispatch(uiActions.setIsLoading(true));
			const data = await fetchData();

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
			dispatch(
				errorActions.seHttpError({
					seHttpError: { message: err.message, status: err.status },
					errorFunction: 'fetchAuthData',
				})
			);
		}
	};
};
