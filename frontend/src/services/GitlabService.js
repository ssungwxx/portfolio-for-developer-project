// import Api from '@/services/Api'
//
// const BASE_URL = 'https://gitlab.com/api/v4'
//
// export default {
// 	getRepos(userName) {
// 		return Api(BASE_URL).get(`/users/${userName}/projects`)
// 	},
// 	getCommits(fullName) {
// 		let d = new Date()
// 		d.setMonth(d.getMonth() - 1)
//
// 		return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?since=${d.toISOString()}`)
// 	}
// }


import Api from '@/services/Api'

const BASE_URL = 'https://lab.ssafy.com/api/v4'


export default {
	getRepos(userName, access_token) {
		return Api(BASE_URL, access_token).get(`/namespaces`)
		// return Api(BASE_URL, access_token).get(`/users/${userName}/projects`)
	},
	getCommits(id, access_token, beforeD) {
		let d = new Date()
		d.setMonth(d.getMonth() - 1)
		// return Api(BASE_URL, access_token).get(`/users/${fullName}/repository/commits?since=${d.toISOString()}`)
		return Api(BASE_URL, access_token).get(`/users/${id}/events?after=${d.toISOString()}&per_page=100&before=${beforeD}`)
	}
}