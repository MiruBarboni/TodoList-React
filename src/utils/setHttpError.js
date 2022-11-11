import { errorActions } from '../store/error-slice';

export const setHttpError = (err, dispatch) => {
	const errorMessage = err.response?.data.error?.message
		? {
				message: err.response.data.error.message,
				status: err.response.status,
		  }
		: {
				message: err.message,
				status: err.code,
		  };
	dispatch(
		errorActions.seHttpError({
			httpError: errorMessage,
		})
	);
};
