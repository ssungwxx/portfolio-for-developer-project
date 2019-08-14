<template>
    <div>
        <div class="information">
            <ImgBanner imgSrc="https://picsum.photos/id/9/1280/520">
                <div style="line-height: 1.2em; font-size: 4vw;" slot="text">개인의 포트폴리오 페이지를 만들어 드려요</div>
            </ImgBanner>
            <div class="information-image">
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
.information {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    font-family: Consolas;
}

.information > img {
    width: 70%;
    /*border: 1px solid gray;*/
}

.information-image {
    margin-top: 50px;
    margin-bottom: 30px;
}

.information-image > p {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 2.5vw;
}
</style>
