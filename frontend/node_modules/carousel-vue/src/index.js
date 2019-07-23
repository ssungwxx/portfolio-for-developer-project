import Carousel from './components/Carousel.vue'
import CarouselItem from './components/Carousel-item.vue'

const install = (Vue) => {
    Vue.component('carousel', Carousel)
    Vue.component('carouselItem', CarouselItem)
}

export default {
    install
}

export {
    Carousel,
    CarouselItem
}