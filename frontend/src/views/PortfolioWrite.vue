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

    const unsplash = new Unsplash({
        applicationId: "f54eed5a9fa625008ff25b3ac52e0af07388084d294f4c2e495f60e6c3ad5e22",
        secret: "35aefe92c645ce07c9817bab7aee76cf088f25eab35540495151176f528c95df"
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
                } else {
                    this.imageName = '';
                    this.imageFile = '';
                    this.imageUrl = '';
                }
            },
            randomPhoto() {
                unsplash.photos.getRandomPhoto({width: 1000, height: 1000})
                    .then(toJson => console.log(toJson))
            },

            uploadImageByImgur(file, callback) {
                const form = new FormData();
                form.append('image', file);
                $.ajax({
                    req: function () {
                        const req = new window.XMLHttpRequest();
                        req.upload.addEventListener("progress", function (event) { // 업로드상태이벤트리스너등록
                            if (event.lengthComputable) {
                                console.log("업로드 진행률:" + parseInt((event.loaded / event.total * 100), 10) + "%");
                            }
                        }, false);
                        return req
                    },
                    url: 'https://api.imgur.com/3/image',// 업로드요청주소
                    headers: {Authorization: 'Client-ID 24321b230a75815'},
                    type: 'POST',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false
                }).always(callback);
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
            },
        }

    }

</script>

<style>
    .port-title {
        font-size: 5vw;
    }
</style>