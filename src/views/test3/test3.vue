<template>
    <div class="test3">
        <div class="inner">
            <div class="stick" ref="stick">stick</div>
        </div>
    </div>
</template>

<script>
import aCheckboxGroup from "@/components/customize/a-checkbox-group"

export default {
    name: "test2",
    mounted() {
        /**
         * 执行顺序：
         *  1.同步代码
         *  2.promise
         *  3.requestAnimationFrame
         *  4.必要的话渲染ui
         *  5.执行异步代码
         * 
         */
        // alert(getComputedStyle(this.$refs.stick).position)
        let div = document.createElement("div")
        div.style.height = "0.5px"
        div.style.background = "red"
        this.$refs.stick.appendChild(div)
        console.log(div.offsetHeight)
        requestAnimationFrame(() => {
            alert("requestAnimationFrame")
            console.log("requestAnimationFrame")
        })
        let d = new Date().getTime()
        Promise.resolve().then(() => {
            while(new Date().getTime() - d < 5000) {
                // console.log(new Date().getTime() - d)
            }
        })
        setTimeout(() => {
            alert("5s")
            console.log("5s")
            
        }, 1000);
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
}
</style>