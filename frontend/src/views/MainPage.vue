<template>
    <div>
        <div class="des">
            <ImgBanner imgSrc="https://picsum.photos/id/9/1280/520">
                <div style="line-height:1.2em;font-size:1.2em;" slot="text">개인의 포트폴리오 페이지를 만들어 드려요</div>
            </ImgBanner>
            <div class="service">
                <p>11stagram 서비스 소개</p>
            </div>
            <img src="../../public/img/001(T).png" alt="mainImg1" />
            <img src="../../public/img/002(T).png" alt="mainImg2" />
            <img src="../../public/img/003(T).png" alt="mainImg3" />
            <img src="../../public/img/004(T).png" alt="mainImg4" />
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
        ImgBanner
    },
    data() {
        return {};
    },
    methods: {
    },
};
</script>

<style>
.des {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    font-family: Consolas;
}

.des > img {
    width: 70%;
    border: 1px solid gray;
}

.service {
    margin-bottom: 30px;
}

.service > p {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 3vw;
}
</style>
