<template>
  <div id="app">
    <Carousel>
      <carousel-item v-for="(item, index) in list" :key="index" :index="index" class="carousel-item">
        <div class="demo"></div>
      </carousel-item>
    </Carousel>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue'
import CarouselItem from './components/Carousel-item.vue'

export default {
  name: 'app',
  components: {
    Carousel,
    CarouselItem
  },
  data() {
    return {
      list: [
        'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D500/sign=f568d2e4f91fbe09185ec3145b610c30/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=3702fc889b45d688a702b5a694c37dab/0b55b319ebc4b745b75682adc6fc1e178b82154e.jpg',
        'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=25472914a3773912c0268263c8188675/3c6d55fbb2fb4316be6615d32aa4462309f7d31a.jpg',
        'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D500/sign=f568d2e4f91fbe09185ec3145b610c30/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=3702fc889b45d688a702b5a694c37dab/0b55b319ebc4b745b75682adc6fc1e178b82154e.jpg',
        'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=25472914a3773912c0268263c8188675/3c6d55fbb2fb4316be6615d32aa4462309f7d31a.jpg',
        'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D500/sign=f568d2e4f91fbe09185ec3145b610c30/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=3702fc889b45d688a702b5a694c37dab/0b55b319ebc4b745b75682adc6fc1e178b82154e.jpg',
        'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=25472914a3773912c0268263c8188675/3c6d55fbb2fb4316be6615d32aa4462309f7d31a.jpg',
        'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D500/sign=f568d2e4f91fbe09185ec3145b610c30/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=3702fc889b45d688a702b5a694c37dab/0b55b319ebc4b745b75682adc6fc1e178b82154e.jpg',
        'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=25472914a3773912c0268263c8188675/3c6d55fbb2fb4316be6615d32aa4462309f7d31a.jpg',
        'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D500/sign=f568d2e4f91fbe09185ec3145b610c30/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=3702fc889b45d688a702b5a694c37dab/0b55b319ebc4b745b75682adc6fc1e178b82154e.jpg',
        'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=25472914a3773912c0268263c8188675/3c6d55fbb2fb4316be6615d32aa4462309f7d31a.jpg'
      ]
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70%;
  margin: 0 auto;
}

.carousel-item .demo {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #ddd;
}
</style>
