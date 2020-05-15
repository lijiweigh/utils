<template>
    <div class="fluid-drag" :style="{height: divCount * 100 + 'px'}">
        <div class="drag-item" ref="dragItem" @mousedown="mousedown" :data-index="item.sort" :style="{transform: `translateY(${10 + index * 100}px)`}" v-for="(item, index) in divList" :key="index">{{index}}</div>
        <!-- <div class="drag-item" @mousedown="mousedown" :style="{top: `${index * 100}px`}" v-for="(item, index) in divCount" :key="index">{{item}}</div> -->
        <!-- <iframe src="http://localhost:8082/#/distribution-create?edit=1&itemId=1&secret_token=98bcfd2e1ec16a4effd16160727d463a&access_token=4768363f8e5562a259c13150c46be660" width="1500px" height="100%"></iframe> -->
    </div>
</template>

<script>

// https://cloud.tencent.com/developer/article/1619938
export default {
    name: "fluid-drag",
    data() {
        return {
            divCount: 10,
            divList: new Array(10).fill("")
        }
    },
    created() {
        
    },
    mounted() {
        this.$refs.dragItem.forEach((item, index) => {
            this.$set(this.divList, index, {
                el: item,
                sort: index,
                index: index
            })
        })
    },
    methods: {
        mousedown(e) {
            let el = e.target
            let curSort = parseInt(el.dataset.index)
            let offsetLeft = e.pageX - e.offsetX
            let offsetTop = e.pageY - e.offsetY
            let startX = e.pageX
            let startY = e.pageY
            el.style["z-index"] = 2
            el.style.transition = "0s"
            let _this = this
            let moveIndex = curSort

            el.addEventListener("mousemove", onmove)
            
            el.addEventListener("mouseup", onup)

            function onmove(e) {
                let curX = e.pageX
                let curY = e.pageY
                let x = curX - startX + offsetLeft
                let y = curY - startY + offsetTop
                moveIndex = Math.round((y - 10) / 100)
                moveIndex < 0 && (moveIndex = 0)
                moveIndex > _this.divList.length - 1 && (divList = _this.divList.length - 1)
                el.style.transform = `translateY(${y}px)`
                move(moveIndex)
            }

            function onup(e) {
                el.removeEventListener("mousemove", onmove)
                el.removeEventListener("mouseup", onup)
                el.style.transition = ".3s"
                el.style["z-index"] = 1
                el.style.transform = `translateY(${10 + moveIndex * 100}px)`
            }

            function move(endSort) {
                if(curSort === endSort) {
                    return
                }
                
                _this.divList.slice(curSort + 1, endSort + 1).forEach((item, index) => {
                    item.sort = curSort + index
                    item.el.style.transform = `translateY(${10 + item.sort * 100}px)`
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fluid-drag {
    border: 1px solid blueviolet;
    padding: 10px;
    position: relative;
    .drag-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 500px;
        height: 100px;
        border: 1px solid orange;
        box-sizing: border-box;
        cursor: move;
        user-select: none;
        transition: .3s;
        z-index: 1;
    }
}
</style>