<template>
    <li
        :style="itemStyle">
        <slot></slot>
    </li>
</template>

<script>
export default {
    name: 'Carousel-item',
    props: {
        index: {
            type: Number,
            default: 0
        }
    },
    mounted() {
    },
    computed: {
        itemStyle() {
            const {showList} = this.$parent.$parent;
            let styles = [];
            if (!showList[this.index]) {
                styles = {
                    'visibility': 'hidden',
                    'width': 0,
                    // 'height': 0,
                    'margin-right': 0
                };
            } else {
                styles = {
                    'visibility': 'visible',
                    'width': showList[this.index] + 'px',
                    // 'height': showList[this.index] + 'px',
                    'margin-right': '5px'
                };
            }
            return styles;
        }
    }
}
</script>
<style>
li {
    flex: 0 0 auto;
    width: 0;
    height: 100%;
    transition: all 1s;
    
}
</style>
