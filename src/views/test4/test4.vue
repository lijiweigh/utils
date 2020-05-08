<template>
    <div class="test4">
        <div class="item" :style="{top: position[index] + 'px'}" v-for="(item, index) in list" :key="index">{{item}}</div>

        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
export default {
    name: "test4",
    data() {
        return {
            list: [],
            position: [],
            imgSrc: ""
        }
    },
    created() {
        this.list = new Array(5).fill("aa")
        this.position = this.list.map((item, index) => {
            return index * 22
        })
        setTimeout(() => {
            // this.list.splice(1, 1)
            
            for(let i = 3; i < this.position.length; i++) {
                // this.position[i] += 22
                this.$set(this.position, i, this.position[i] + 22)
            }
            
        }, 2000);
        setTimeout(() => {
            this.list.splice(3, 0, "1")
            this.position.splice(3, 0, 22 * 3)
        }, 3000);

        let img = new Image()
        img.onload = () => {
            this.imgSrc = "https://m.elongstatic.com/god-pen/static/withdraw-center/bg-banner.png"
        }
        img.src = "https://m.elongstatic.com/god-pen/static/withdraw-center/bg-banner.png"
    }
}
</script>

<style lang="scss" scoped>
.test4 {
    // transition: 1s;
    position: relative;
    .item {
        position: absolute;
        height: 20px;
        width: 200px;
        background: orangered;
        margin-bottom: 5px;
        transition: 1s;
        animation: show 1s;
    }
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>