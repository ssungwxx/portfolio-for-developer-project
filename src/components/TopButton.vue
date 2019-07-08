<template>
    <div :class="!isTop?'top-button':'top-button-d-none'">
        <a href="#">
            <img src="../../public/img/arrow-up.png" alt="logo" height="60px"/>
        </a>
    </div>
</template>


<script>
    export default {
        name: "TopButton",
        props: {},
        data: function () {
            return {
                isTop: true
            };
        },
        methods: {
            handleScroll(event) {
                if (window.scrollY < 1) {
                    this.isTop = true;
                } else {
                    this.isTop = false;
                }
            }
        },
        created() {
            window.addEventListener("scroll", this.handleScroll);
        },
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll);
        }
    };
</script>
<style>
    .top-button {
        position: fixed;
        bottom: 50px;
        left: 50px;
        margin: 0;
        padding: 0;
        height: 60px;
    }

    .top-button-d-none {
        display: none;
        position: fixed;
        bottom: 50px;
        left: 50px;
        margin: 0;
        padding: 0;
    }
</style>