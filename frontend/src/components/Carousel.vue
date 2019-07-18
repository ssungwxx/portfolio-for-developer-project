<template>
    <carousel class="ca">
        <Slide class="slide" v-for="i in 6">
          <v-img :src="getImgUrl(i)"  aspect-ratio="1.7">
              <v-layout align-center justify-center row fill-height>
                  <v-flex text-xs-center>
                      <span class="text-shadow display-3 font-weight-bold">
                          <slot name="text" />
                      </span>
                  </v-flex>
              </v-layout>
          </v-img>
        </Slide>


    </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {

    components: {
        Carousel,
        Slide
    },
    methods: {
          getImgUrl(i) {
              return require("../assets/"+i+".jpg");
      }
}
}
</script>

<style>

.slide {
    padding: 20px;
}

</style>
