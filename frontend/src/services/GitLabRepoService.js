import Api from "../services/Api";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
    async getPushed(project_id) {
        const eventsURL = `/projects/${project_id}/events?per_page=100&page=`;
        const date = [];
        for (i = 0; date.length < 20; i++) {
            const events = await Api(BASE_URL).get(
                eventsURL + i
            )
            for (event of events) {

            }
        }
    },
    calendar(created_at) {
        const month
    }
};
