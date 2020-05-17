<template>
	<div class="fluid-drag" ref="divWrap" :style="{ height: divCount * 100 + 'px' }" >
		<!-- <div 
            class="drag-item" 
            ref="dragItem" 
             @mousedown="mousedown($event, item)"
            :data-index="item.sort" 
            v-for="(item, index) in divList" 
            :key="index">
                {{ index }}
        </div> -->

        <draggable v-model="myArray">
            <div style="padding: 5px;" v-for="element in myArray" :key="element.id">{{element.name}}</div>
        </draggable>
		<!-- <div class="drag-item" @mousedown="mousedown" :style="{top: `${index * 100}px`}" v-for="(item, index) in divCount" :key="index">{{item}}</div> -->
		<!-- <iframe src="http://localhost:8082/#/distribution-create?edit=1&itemId=1&secret_token=98bcfd2e1ec16a4effd16160727d463a&access_token=4768363f8e5562a259c13150c46be660" width="1500px" height="100%"></iframe> -->
	</div>
</template>

<script>
// https://cloud.tencent.com/developer/article/1619938
import draggable from 'vuedraggable'
export default {
	name: "fluid-drag",
	data() {
		return {
			divCount: 10,
            divList: new Array(10).fill(""),
            divOffsetBody: 0,
            myArray: []
		}
	},
    created() {
        this.myArray = new Array(10).fill("").map((item, index) => {
            return {
                name: index,
                id: index
            }
        })
    },
    components: {
        draggable,
    },
	mounted() {
		// this.$refs.dragItem.forEach((item, index) => {
		// 	this.$set(this.divList, index, {
		// 		el: item,
		// 		sort: index,
		// 		index: index,
		// 	})
        // })
        // let divWrap = this.$refs.divWrap
        // while(divWrap) {
        //     this.divOffsetBody += divWrap.offsetTop
        //     divWrap = divWrap.offsetParent
        // }
        // this.setPosition()
	},
	methods: {
		mousedown(e, obj) {
			let el = e.target
			let startSort = obj.sort
			let offsetTop = e.pageY - e.offsetY - this.divOffsetBody
			let startY = e.pageY
			el.style["z-index"] = 2
			el.style.transition = "0s"
			let _this = this
            let moveIndex = startSort
            
            let tempDivSort = this.divList.map(i => i.sort)

			el.addEventListener("mousemove", onmove)

			el.addEventListener("mouseup", onup)

			function onmove(e) {
				let curY = e.pageY
				let y = curY - startY
				moveIndex = Math.round(y / 100) + startSort
				moveIndex < 0 && (moveIndex = 0)
				moveIndex > _this.divList.length - 1 && (moveIndex = _this.divList.length - 1)
                el.style.transform = `translateY(${y + offsetTop}px)`
                console.log(startSort, moveIndex)
				move(startSort,  moveIndex)
			}

			function onup(e) {
				el.removeEventListener("mousemove", onmove)
				el.removeEventListener("mouseup", onup)
				el.style.transition = ".3s"
				el.style["z-index"] = 1
                el.style.transform = `translateY(${moveIndex * 100}px)`

                _this.divList[startSort].sort = moveIndex
                _this.divList = _this.divList.sort((a, b) => a.sort - b.sort)
                // let ele = _this.divList.splice(startSort, 1)[0]
                // _this.divList.splice(moveIndex, 0, ele)
			}

			function move(startSort, endSort) {
				if (startSort === endSort) {
					return
                }
                
                let sign = endSort > startSort ? -1 : 1
                let [start, end] = [startSort + 1, endSort + 1].sort((a, b) => a - b)

                for(let i = start; i < end; i++) {
                    let item = _this.divList[i]
                    item.sort = tempDivSort[i] + sign
                    item.el.style.transform = `translateY(${item.sort * 100}px)`
                }
                
                

				// _this.divList.slice(startSort + 1, endSort + 1).forEach((item, index) => {
				// 	item.sort = startSort + index
				// 	item.el.style.transform = `translateY(${item.sort * 100}px)`
				// })
			}
        },
        setPosition() {
            this.divList.forEach(div => {
                div.el.style.transform = `translateY(${div.sort * 100}px)`
            })
        }
	},
}
</script>

<style lang="scss" scoped>
.fluid-drag {
	border: 1px solid blueviolet;
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
		transition: 0.3s;
		z-index: 1;
	}
}
</style>
