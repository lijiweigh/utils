<template>
    <div class="test-pubuliu">
        <div class="p">
            <div v-for="(item, index) in list" :key="index">
                <img class="img" :src="item" alt="">
            </div>
        </div>
        <div v-for="(item, index) in list" :key="index + 'aa'">
            <img :src="item" alt="" >
        </div>
        
        <div id="bottom"></div>
    </div>
</template>

<script>
export default {
    name: "test-pubuliu",
    data() {
        return {
            list: [
                "http://m.elongstatic.com/god-pen/img/template-style-banner-group.png",
                "http://m.elongstatic.com/god-pen/img/template-style-banner1.png",
                "http://m.elongstatic.com/god-pen/img/template-style-banner3.png",
                "http://m.elongstatic.com/god-pen/img/template-style-banner2.png",
                "http://m.elongstatic.com/god-pen/img/turntable-template.png",
                "http://m.elongstatic.com/god-pen/img/webApp.jpg",
                "http://m.elongstatic.com/god-pen/img/pic_banner1.png",
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.test-pubuliu {
    width: 220px;
    height: 100vh;
    overflow: scroll;
    .p {
        column-count: 2;
        column-gap: 20px;
        .img {
            width: 100px;
        }
        div {
            width: 100px;
            border: 1px solid #000;
        }
    }
    #bottom {
        height: 20px;
        background: red;
    }
}
</style>