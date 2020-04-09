<template>
    <div class="uploadImgHandle">
        <input type="file" ref="file" accept="image/*" @change="handleInput"/>
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
    created() {
        
    },
    methods: {
        handleInput(e) {
            let file = e.target.files[0]
            let fr = new FileReader()
            fr.onload = e => {
                let data64 = e.target.result
                this.origin = data64
                let image = new Image()
                let canvas = document.createElement("canvas")
                image.onload = async () => {
                    // 旋转
                    this.rotate = await this.rotateImg(image, canvas)
                    let image2 = new Image()
                    image2.onload = async () => {
                        // 裁剪
                        this.cut = await this.cutImg(image2, canvas, 0.75)
                        let image3 = new Image()
                        image3.onload = async () => {
                            // 压缩
                            this.minimize = await this.minimizeImg(image3, canvas, 500)
                        }
                        image3.src = this.cut
                    }
                    image2.src = this.rotate
                }
                image.src = data64
            }
            fr.readAsDataURL(file)
            e.target.value = ""
        },
        cutImg(image, canvas, percent) {
            return new Promise((resolve, reject) => {
                try {
                    let originWidth = image.width
                    let originHeight = image.height
                    let originPercent = originWidth / originHeight
                    let width, height, startX, startY
                    if(originWidth > originHeight) {
                        startY = 0
                        height = originHeight
                        let midX = Math.round(originWidth / 2)
                        width = height * percent
                        startX = midX - Math.round(width / 2)
                        if(startX < 0) {
                            startX = 0
                        }
                        if(width > originWidth) {
                            width = originWidth
                        }
                    } else {
                        startX = 0
                        width = originWidth
                        let midY = Math.round(originHeight / 2)
                        height = width / percent
                        startY = midY - Math.round(height / 2)
                        if(startY < 0) {
                            startY = 0
                        } 
                        if(height > originHeight) {
                            height = originHeight
                        }
                    }
                    console.log(startX, startY, width, height)
                    canvas.width = width
                    canvas.height = height
                    let ctx = canvas.getContext("2d")
                    ctx.fillStyle = "#fff"
                    ctx.fillRect(0, 0, width, height)
                    ctx.drawImage(image, startX, startY, width, height, 0, 0, width, height)
                    resolve(canvas.toDataURL("image/jpeg"))
                } catch(e) {
                    reject(e)
                }
            })

        },
        rotateImg(image, canvas) {
            let _this = this
            let width = image.width
            let height = image.height
            return new Promise((resolve, reject) => {
                try {
                    EXIF.getData(image, function() {
                        let Orientation = EXIF.getTag(this, "Orientation")
                        console.log("Orientation " + Orientation)
                        if(Orientation) {
                            let ctx = canvas.getContext("2d")
                            ctx.fillStyle = "#fff"
                            switch(Orientation) {
                                case 1: 
                                    canvas.width = width
                                    canvas.height = height
                                    ctx.fillRect(0, 0, width, height)
                                    ctx.drawImage(image, 0, 0)
                                    break;
                                case 3: 
                                    canvas.width = width
                                    canvas.height = height
                                    ctx.rotate(180 * Math.PI / 180);
                                    ctx.fillRect(-width, -height, width, height)
                                    ctx.drawImage(image, -width, -height)
                                    break;
                                case 6: 
                                    canvas.width = height
                                    canvas.height = width
                                    ctx.rotate(90 * Math.PI / 180);
                                    ctx.fillRect(0, -height, height, width)
                                    ctx.drawImage(image, 0, -height)
                                    break;
                                case 8: 
                                    canvas.width = height
                                    canvas.height = width
                                    ctx.rotate(270 * Math.PI / 180);
                                    ctx.fillRect(-width, 0, height, width)
                                    ctx.drawImage(image, -width, 0)
                                    break;
                            }
                            resolve(canvas.toDataURL("image/jpeg"))
                        } else {
                            canvas.width = width
                            canvas.height = height
                            let ctx = canvas.getContext("2d")
                            ctx.fillStyle = "#fff"
                            ctx.fillRect(0, 0, width, height)
                            ctx.drawImage(image, 0, 0)
                            resolve(canvas.toDataURL("image/jpeg"))
                        }  
                    });
                } catch(e) {
                    reject(e)
                }
            })
            
        },
        minimizeImg(image, canvas, maxWidth) {
            return new Promise((resolve, reject) => {
                try {
                    let width = image.width
                    let height = image.height
                    console.log("origin size: " + width + " * " + height)
                    if(width <= maxWidth) {
                        canvas.width = width
                        canvas.height = height
                        let ctx = canvas.getContext("2d")
                        ctx.fillStyle = "#fff"
                        ctx.fillRect(0, 0, width, height)
                        ctx.drawImage(image, 0, 0)
                        let base64 = canvas.toDataURL("image/jpeg")
                        resolve(base64)
                        return base64
                    }
                    let maxHeight = Math.round(maxWidth / width * height)
                    canvas.width = maxWidth
                    canvas.height = maxHeight
                    let ctx = canvas.getContext("2d")
                    ctx.fillStyle = "#fff"
                    ctx.fillRect(0, 0, maxWidth, maxHeight)
                    ctx.drawImage(image, 0, 0, maxWidth, maxHeight)
                    let minimize = canvas.toDataURL("image/jpeg")
                    console.log("minimized size: " + maxWidth + " * " + maxHeight)
                    resolve(minimize)
                    return minimize
                } catch(e) {
                    reject(e)
                }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.uploadImgHandle {
    img {
        width: 500px;
        border: 2px solid orangered;
    }
}
</style>