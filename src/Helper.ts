import axios, { AxiosError } from 'axios';
import { endpoint } from './config.json';
import router from './router';

export const authHeader = { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }

export async function get(apipath: string) {
	if (localStorage.getItem('accessToken') == undefined) return;
	try {
		console.log('sending request')
		return (await axios.get(`${endpoint}${apipath}`, { headers: { Authorization: `Bearer ${localStorage.accessToken}` } })).data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			if (Math.floor(err.response?.data.code / 1000) == 1) { // bad token -> re-login
				console.log('code', err.response?.data.code)
				localStorage.removeItem('accessToken');
				router.push('/')
			}
			else {
				console.log(err);
				throw err;
			}
		} else {
			console.error(err);
			throw err;
		}
	}
}