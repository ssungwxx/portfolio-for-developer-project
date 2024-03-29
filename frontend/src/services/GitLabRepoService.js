import Api from "../services/Api";

export default {
    async getDate(user_add, project_id, token) {
        const BASE_URL = user_add + "/api/v4";
        const eventsURL = `/projects/${project_id}`;

        const project = await Api(BASE_URL, token).get(eventsURL);
        const response = {
            repo_createdDate:
                this.calendar_time(project.data.created_at) + ":00",
            repo_recentDate:
                this.calendar_time(project.data.last_activity_at) + ":00"
        };

        return response;
    },
    async getMessage(user_add, project_id, token) {
        const BASE_URL = user_add + "/api/v4";
        const eventsURL = `/projects/${project_id}/events?per_page=100&page=`;
        const message = {};

        for (let i = 1; Object.keys(message).length < 10; ++i) {
            let events = await Api(BASE_URL, token).get(eventsURL + String(i));
            if (events.data.length === 0) {
                break;
            }
            for (event of events.data) {
                if (Object.keys(message).length == 10) {
                    break;
                }
                if (event.action_name == "pushed to") {
                    const created_at = this.calendar(event.created_at);
                    const commit = event.push_data.commit_title;
                    message[created_at] = commit;
                }
            }
        }
        return message;
    },
    async getPushed(user_add, project_id, token) {
        const BASE_URL = user_add + "/api/v4";
        const eventsURL = `/projects/${project_id}/events?per_page=100&page=`;
        const date = {};
        const pushed = [0] * 14;

        for (let i = 1; Object.keys(date).length < 14; i++) {
            let events = await Api(BASE_URL, token).get(eventsURL + String(i));
            if (events.data.length === 0) {
                break;
            }
            for (event of events.data) {
                if (Object.keys(date).length == 14) {
                    break;
                }
                const created_at = this.calendar(event.created_at);
                if (!(created_at in date)) {
                    date[created_at] = 0;
                }
                if (event.action_name === "pushed to") {
                    date[created_at] += 1;
                }
            }
        }
        return date;
    },
    calendar(created_at) {
        let year = Number(created_at.slice(0, 4));
        let month = Number(created_at.slice(5, 7));
        let day = Number(created_at.slice(8, 10));
        let hour = Number(created_at.slice(11, 13)) + 9;

        if (hour >= 24) {
            hour -= 24;
            day += 1;
            if (month in [1, 3, 5, 7, 8, 10, 12]) {
                if (day > 31) {
                    day -= 31;
                    month += 1;
                }
            } else {
                if (month === 2) {
                    if (day > 28) {
                        day -= 28;
                        month += 1;
                    }
                } else {
                    if (day > 30) {
                        day -= 30;
                        month += 1;
                    }
                }
            }
            if (month > 12) {
                month -= 12;
                year += 1;
            }
        }
        return String(month) + "-" + String(day);
    },
    calendar_time(created_at) {
        let year = Number(created_at.slice(0, 4));
        let month = Number(created_at.slice(5, 7));
        let day = Number(created_at.slice(8, 10));
        let hour = Number(created_at.slice(11, 13)) + 9;
        let min = Number(created_at.slice(14, 16));

        if (hour >= 24) {
            hour -= 24;
            day += 1;
            if (month in [1, 3, 5, 7, 8, 10, 12]) {
                if (day > 31) {
                    day -= 31;
                    month += 1;
                }
            } else {
                if (month === 2) {
                    if (day > 28) {
                        day -= 28;
                        month += 1;
                    }
                } else {
                    if (day > 30) {
                        day -= 30;
                        month += 1;
                    }
                }
            }
            if (month > 12) {
                month -= 12;
                year += 1;
            }
        }
        return (
            String(year) +
            "-" +
            String(month) +
            "-" +
            String(day) +
            " " +
            String(hour) +
            ":" +
            String(min)
        );
    }
};
