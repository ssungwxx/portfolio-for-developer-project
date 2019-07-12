// import axios from 'axios'
//
// export default (baseURL) => {
// 	return axios.create({
// 		baseURL: baseURL,
// 		withCredentials: false,
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		}
// 	})
// }

import axios from 'axios'

export default (baseURL, token) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Private-Token': token
		}
	})
}