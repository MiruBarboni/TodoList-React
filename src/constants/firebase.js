export const FIREBASE_URL =
	'https://todilist-7d4dd-default-rtdb.firebaseio.com';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const FIREBASE_SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export const FIREBASE_SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const FIREBASE_REFRESH_TOKEN_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const FIREBASE_SEND_PASSWORD_RESET_EMAIL_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
