<template>
    <div>
        <v-img class="imgdiv" :src="imgSrc" aspect-ratio="3">
            <v-layout align-center justify-center row fill-height>
                <v-flex text-xs-center>
                    <span class="text-shadow display-3 font-weight-bold">
                        <slot name="text" />
                    </span>
                </v-flex>
            </v-layout>
        </v-img>
    </div>
</template>



<script>
export default {
    name: "ImgBanner",
    props: {
        imgSrc: { type: String },
        text: { type: String }
    }
  };
</script>
<style>
.text-shadow {
    text-shadow: 0 0 5px rgba(255, 255, 150, 0.4);
}

.imgdiv > .v-image__image.v-image__image--cover {
    opacity: 0.5;
    background-size: 120%;
    background-position: center 20% !important;
}

</style>
