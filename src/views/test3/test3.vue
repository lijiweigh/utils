<template>
    <div class="test3">
        <div class="inner">
            <div class="stick" ref="stick">stick</div>
            <!-- <div>{{aaa?.bbb?.ccc || "aaaaa"}}</div> -->
        </div>
        <div class="testtest" @click="testClick"></div>
    </div>
</template>

<script>
import aCheckboxGroup from "@/components/customize/a-checkbox-group"


export default {
    name: "test2",
    data() {
        return {
            aaa: {bbb: null}
        }
    },
    mounted() {
        /**
         * 执行顺序：
         *  1.同步代码
         *  2.promise (microTask)
         *  3.requestAnimationFrame (渲染UI之前执行)
         *  4.必要的话渲染ui
         *  5.执行异步代码
         * 
         * 
         * offsetTop, offsetLeft, offsetWidth, offsetHeight
            scrollTop, scrollLeft, scrollWidth, scrollHeight
            clientTop, clientLeft, clientWidth, clientHeight
            getComputedStyle() (currentStyle in IE)
            这些属性、方法会强制刷新队列
         */
        // alert(getComputedStyle(this.$refs.stick).position)
        let div = document.createElement("div")
        div.id = "appendDiv"
        div.style.height = "0.5px"
        div.style.background = "red"
        this.$refs.stick.appendChild(div)
        // setTimeout(() => {
        //     console.log(document.getElementById("appendDiv"))
        // }, 0);
        // // console.log(div.offsetHeight)
        console.log(div.offsetHeight)
        
        let d = new Date().getTime()
        // new Promise(resolve => {
        //     resolve("new Promise")
        // }).then(v => {
        //     alert(v)
        // })
        // Promise.resolve().then(() => {
        //     // while(new Date().getTime() - d < 5000) {
        //     //     // console.log(new Date().getTime() - d)
        //     // }
        //     alert("Promise")
        // })
        
        // requestAnimationFrame(() => {
        //     alert("requestAnimationFrame")
        //     console.log("requestAnimationFrame")
        // })
        // setTimeout(() => {
        //     alert("5s")
        //     console.log("5s")
            
        // }, 1000);

        let obj = {a: null}
        console.log(obj?.a || "aaa")
    },
    methods: {
        testClick() {
            console.log("testClick")
        }
    }
   
}
</script>

<style lang="scss" scoped>
.test3 {
    height: 100vh;
    overflow: auto;
    .inner {
        height: 2000px;
        .stick {
            margin-top: 500px;
            position: sticky;
            top: 0;
        }
    }
    .testtest {
        width: 100px;
        height: 100px;
        background: red;
        position: relative;
        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
    }
}
</style>