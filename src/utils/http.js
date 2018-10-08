import axios from 'axios';

const API_URL = 'http://localhost:2000';
const headers = {
	'Content-Type': 'application/json'
};

class Http {
	baseURL = API_URL;
	http;
	token = localStorage.getItem('token') || null;

	constructor() {
		this.http = axios.create({
			baseURL: API_URL,
			defaultInterceptors: true,
		});
	}

	get(path, config) {
		if (!this.token) this.token = localStorage.getItem('token');
		Object.assign(headers, { 'Authorization': this.token });

		return axios.get(`${this.baseURL}${path}`, { ...config, headers });
	}

	post(path, data) {
		if (!this.token) this.token = localStorage.getItem('token');
		Object.assign(headers, { 'Authorization': this.token });

		return axios.post(`${this.baseURL}${path}`, data, { headers });
	}

	put(path, data) {
		if (!this.token) this.token = localStorage.getItem('token');
		Object.assign(headers, { 'Authorization': this.token });

		return axios.put(`${this.baseURL}${path}`, data, { headers });
	}

	remove(path) {
		if (!this.token) this.token = localStorage.getItem('token');
		Object.assign(headers, { 'Authorization': this.token });

		return axios.delete(`${this.baseURL}${path}`, { headers });
	}
}

export default new Http();