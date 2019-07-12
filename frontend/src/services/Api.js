import axios from 'axios'

export default (baseURL) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false,
		headers: {
			'Private-Token': 'wTE9n9Ye1MZujw4BPd2j',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	})
}