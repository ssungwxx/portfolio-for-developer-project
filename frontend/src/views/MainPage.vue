<template>
    <div>
        <div class="des">
            <ImgBanner imgSrc="https://picsum.photos/1280/520">
                <div style="line-height:1.2em;font-size:1.2em;" slot="text">개인의 포트폴리오 페이지를 만들어 드려요</div>
            </ImgBanner>
            <div>
                <v-btn @click="chk">쳌!</v-btn>
            </div>

            <img src="../../public/img/posts.png" alt="posts sample">
            <img src="../../public/img/repos.png" alt="repos sample">
        </div>
    </div>
</template>

<script>
import GitLab from "../services/GitLabRepoService";
import RestService from "../services/RestService";
import ImgBanner from "@/components/ImgBanner";

export default {
    name: "mainpage",
    components: {
        ImgBanner,
    },
    data() {
        return {};
    },
    methods: {
        async chk() {
            // console.log(this.$store.state.isAuth)
            const data = {
                post_no: 6,
                user_id: "jiseon",
                pcom_content: "들어가",
            };
            const res = await RestService.insertPostComment(data);
            console.log(res)
        }
    }
};
</script>

<style>
.des {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
}

.des > img {
    width: 70%;
    border: 1px solid gray;
}
</style>
