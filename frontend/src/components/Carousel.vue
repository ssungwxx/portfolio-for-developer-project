<template>
    <carousel>
        <Slide class="slide">
            <div id="divcont1"></div>
        </Slide>

        <Slide class="slide">
            <div id="divcont2"></div>
        </Slide>

        <Slide class="slide">
            <div id="divcont3"></div>
        </Slide>

        <Slide class="slide">
            <div id="divcont4"></div>
        </Slide>

        <Slide class="slide">
            <div id="divcont5"></div>
        </Slide>

        <Slide class="slide">
            <div id="divcont6"></div>
        </Slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
    components: {
        Carousel,
        Slide
    }
};
</script>

<style>
.slide {
    padding: 20px;
}

#divcont1 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/1.jpg");
}

#divcont2 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/2.jpg");
}

#divcont3 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/3.jpg");
}

#divcont4 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/4.jpg");
}

#divcont5 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/5.jpg");
}

#divcont6 {
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    height: 500px;
    background-image: url("../assets/6.jpg");
}
</style>
