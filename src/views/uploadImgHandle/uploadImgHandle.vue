<template>
    <div class="uploadImgHandle">
        <input type="file" accept="image/*" @change="handleInput"/>
        <div>
            <p>原始图片</p>
            <img :src="origin" alt="">
        </div>
        <div>
            <p>旋转图片</p>
            <img :src="rotate" alt="">
        </div>
        <div>
            <p>裁剪图片</p>
            <img :src="cut" alt="">
        </div>
        <div>
            <p>压缩图片</p>
            <img :src="minimize" alt="">
        </div>
    </div>
</template>

<script>
/**
** https://segmentfault.com/a/1190000016535556
 */

import EXIF from "exif-js"

export default {
    name: "uploadImgHandle",
    data() {
        return {
            origin: "",
            rotate: "",
            cut: "",
            minimize: "",
        }
    },
    methods: {
        handleInput(e) {
            let file = e.target.files[0]
            let fr = new FileReader()
            fr.onload = e => {
                let data64 = e.target.result
                this.origin = data64
                let image = new Image()
                image.onload = () => {
                    // 图片旋转
                    this.rotateImg(image)
                }
                image.src = data64
            }
            fr.readAsDataURL(file)
        },
        rotateImg(image) {
            EXIF.getData(image, function() {
                let Orientation = EXIF.getTag(this, "Orientation")
                console.log(Orientation)
                console.log(EXIF.getAllTags(this))
                let canvas = document.createElement("canvas")
                let ctx = canvas.getContext("2d")
                canvas.width = image.width
                canvas.height = image.height
                ctx.drawImage(image, 0, 0)
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.uploadImgHandle {
    img {
        width: 500px;
    }
}
</style>