import Unsplash from "unsplash-js";
const ClientId = "7c08f904a84425ce56207b5d9c829f1b03bbb142292b245d63046f2b974269ca";
const unsplash = new Unsplash({
    applicationId: ClientId,
});

export default {
    async randomPhoto() {
        let ret = [];
        await unsplash.photos.getRandomPhoto({width: 1000, height: 1000})
            .then(function (toJson) {return toJson.url + "&client_id=" + ClientId;})
            .then(imgurl => axios.get(imgurl)
            .then(res => {
                ret.push(res.data.alt_description);
                ret.push(URL = res.data.urls.custom);
                }))
        return ret
    },

    uploadImageByImgur(file) {
        const form = new FormData();
        form.append('image', file);

        const URL = "https://api.imgur.com/3/image";
        axios.post(URL, form, {
            headers: {
                "Authorization": "Bearer fdd96e042daf51bfa75e115b4e49daffc7616ef2"
            }
        })
            .then(req => console.log(req)
    )
    },
    imgupload() {
        const inputImg = document.querySelector("#imgup");
        if (inputImg.files.length === 1) {
            const file = inputImg.files[0];
            this.uploadImageByImgur(file, function (result) {
                console.log(result);
                console.log('업로드결과:' + result.status);

                if (result.status != 200) {
                    result = $.parseJSON(result.responseText);
                }
                if (result.data.error) {
                    console.log('지원하지않는 파일형식..');
                } else {
                    console.log('업로드된 파일경로:' + result.data.link);
                }
            });
        }
    },
}