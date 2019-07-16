<template>
    <v-container class="title-div">
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
                          prepend-icon='attach_file' v-if="imageUrl"></v-text-field>
            <v-text-field label="Select Image" @click='pickFile' v-model='imageName'
                          prepend-icon='attach_file' v-else="imageUrl" style="margin-top: 150px;"></v-text-field>
            <input id="imgup"
                   type="file"
                   style="display: none;"
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
    import Image from "../image.js"

    export default {
        name: "PortfolioWrite",
        components: {},
        data() {
            return {
                title: "Image Upload",
                dialog: false,
                imageName: '',
                imageUrl: '',
                imageFile: '',
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
            async randomPhoto() {
                const ret = await Image.randomPhoto();
                this.imageName = ret[0];
                this.imageUrl = ret[1];
            },
            imgupload () {
                Image.imgupload();
            }
        }
    }

</script>

<style>
    .port-title {
        font-size: 5vw;
    }

    .title-div {
        margin-top: 50px;
    }
</style>
