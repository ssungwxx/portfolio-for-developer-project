import qs from "qs";
import Unsplash from "unsplash-js";

const queryString = {
    client_id: "24321b230a75815",
    response_type: "token"
};

const ClientId =
    "7c08f904a84425ce56207b5d9c829f1b03bbb142292b245d63046f2b974269ca";
const unsplash = new Unsplash({
    applicationId: ClientId
});

export default {
    async randomPhoto() {
        let ret = [];
        await unsplash.photos
            .getRandomPhoto({ width: 1000, height: 1000 })
            .then(function(toJson) {
                return toJson.url + "&client_id=" + ClientId;
            })
            .then(imgurl =>
                axios.get(imgurl).then(res => {
                    ret.push(res.data.alt_description);
                    ret.push((URL = res.data.urls.custom));
                })
            );
        return ret;
    },

    async uploadImageByImgur(file) {
        const form = new FormData();
        form.append("image", file);
        let ret = "";
        const URL = "https://api.imgur.com/3/image";
        await axios
            .post(URL, form, {
                headers: {
                    Authorization:
                        "Bearer 84a29a6a9b36e0eed1e745b25d6a89a4f7c07ca0"
                }
            })
            .then(res => (ret = res.data.data.link));
        return ret;
    },
    async imgupload() {

        // const hash = `https://api.imgur.com/oauth2/authorize?${qs.stringify(queryString)}`;
        // console.log(hash)
        // return

        const inputImg = document.querySelector("#imgup");
        if (inputImg.files.length === 1) {
            const file = inputImg.files[0];
            const ret = await this.uploadImageByImgur(file)
            return ret
            }
        }
    }
};