import RestService from "@/services/RestService";
import axios from "axios";

export default {
    async checkAuthorization(user_id) {
        let result = await RestService.checkAccessToken(user_id, {
            jwt: sessionStorage.getItem("jwt")
        });
        console.log(sessionStorage);
        console.log(result);
        if (result.status == 400) {
            if (result.msg == "unmatched userId") {
                alert("경고: 잘못된 접근입니다. 재로그인 하십시오.");
                sessionStorage.clear();
                router.push("/");
            } else {
                let refresh = await RestService.getRefreshToken(user_id);
                let currentTime = Date.now()
                    .toString()
                    .slice(0, 10);
                if (refresh > currentTime) {
                    let newToken = await RestService.getNewAccessToken(user_id);
                    sessionStorage.setItem("jwt", newToken);
                } else {
                    alert("연결이 끊어졌습니다. 다시 로그인 해주세요.");
                    sessionStorage.clear();
                    router.push("/");
                }
            }
        }
    }
};
