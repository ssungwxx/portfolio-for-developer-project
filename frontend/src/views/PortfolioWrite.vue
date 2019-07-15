<template>
    <v-container>
        <div>
            <p class="port-title">Write New Portfolio</p>
        </div>
        <div>
            <div class="markdown">
                <v-flex>
                    <v-text-field label="title"></v-text-field>
                </v-flex>
                <markdown-editor></markdown-editor>
            </div>
        </div>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <v-text-field label="Select Image" @click='pickFile' v-model='imageName'
                          prepend-icon='attach_file'></v-text-field>
            <input id="imgup"
                   type="file"
                   style="display: none"
                   ref="image"
                   accept="image/*"
                   @change="onFilePicked"
            >
        </v-flex>

        <v-btn @click="imgupload">
            Submit
        </v-btn>
        <v-btn @click="randomPhoto">
            Get Random Photo
        </v-btn>


    </v-container>
</template>

<script>
    import FirebaseService from '@/services/FirebaseService'
    import Unsplash from "unsplash-js";

    const ClientId = "f54eed5a9fa625008ff25b3ac52e0af07388084d294f4c2e495f60e6c3ad5e22";
    const unsplash = new Unsplash({
        applicationId: ClientId,
    });


    export default {
        name: "PortfolioWrite",
        components: {},
        data() {
            return {
                title: "Image Upload",
                dialog: false,
                imageName: '',
                imageUrl: '',
                imageFile: ''
            }
        },
        methods: {
            pickFile() {
                this.$refs.image.click();
            },

            onFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else if (this.imageUrl !== "") {
                    this.imageName = "Random_Image";
                    const fr = new FileReader();
                    fr.readAsDataURL(this.imageUrl);
                    fr.addEventListener("load", () => {
                        this.imageFile = this.imageUrl;
                    });
                } else {
                    this.imageName = '';
                    this.imageFile = '';
                    this.imageUrl = '';
                }
            },
            randomPhoto() {
                unsplash.photos.getRandomPhoto({width: 1000, height: 1000})
                    .then(function (toJson) {
                        return toJson.url + "&client_id=" + ClientId;
                    })
                    .then(imgurl => axios.get(imgurl)
                        .then(res => res.data.urls.custom)
                        .then(image => this.imageUrl = image)
                    )
            },

            uploadImageByImgur(file) {
                const form = new FormData();
                form.append('image', file);

                const URL = "https://api.imgur.com/3/image";
                axios.post(URL, form, {
                    headers: {
                        // Bearer 뒤에 window.localStorage.getItem("imgur_token") 으로 발급받은 token 추가해야 함
                        "Authorization": "Bearer "
                    }
                })
                    .then(req => console.log(req))
            },
            /* 파일 변경 이벤트가 감지되면 자동으로 이미지 업로드 */
            imgupload() { // 사용자가 파일을 변경했을때 발생됨
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
            }
            ,
        }

    }

</script>

<style>
    .port-title {
        font-size: 5vw;
    }
</style>