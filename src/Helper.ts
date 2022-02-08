import axios, { AxiosError } from 'axios';
import { http_endpoint } from './config.json';
import router from './router';

export const authHeader = { headers: { Authorization: `Bearer ${localStorage.accessToken}` } };

export async function get(apipath: string) {
	if (localStorage.getItem('accessToken') == undefined) return;
	try {
		console.log('sending request');
		return (await axios.get(`${http_endpoint}${apipath}`, { headers: { Authorization: `Bearer ${localStorage.accessToken}` } })).data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.log(err.code);
			if (err.code == '401') { // bad token -> re-login
				console.log('code', err.response?.data.code);
				localStorage.removeItem('accessToken');
				router.push('/');
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

export function fullDurationString(ms): string {
	let str = "";
	const days = Math.floor(ms / 86400000);
	const hours = Math.floor(ms % 86400000 / 3600000);
	const mins = Math.floor(ms % 3600000 / 60000);
	const secs = Math.floor(ms % 60000 / 1000);
	if (days) str += `${days}d `;
	if (hours) str += `${hours}h `;
	if (mins) str += `${mins}m `;
	if (secs) str += `${secs}s`;
	return str;
}