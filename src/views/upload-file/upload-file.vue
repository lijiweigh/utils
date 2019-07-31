<template>
	<div class="upload-file">
		<div class="preview-box" ref="preview"></div>
		<div class="upload">
			<div
				class="drag-area"
				@dragenter.stop.prevent
				@dragover.prevent.stop
				@drop.stop.prevent="fileDrop"
			></div>
			<div class="btn" @click="clickFile">
				选择
				<input type="file" ref="file" style="display: none" multiple @change="handleFile" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "upload-file",
	methods: {
		handleFile(e) {
			let preview = this.$refs.preview;
			let files = this.$refs.file.files;
			for (let i = 0; i < files.length; i++) {
				let img = document.createElement("img");
				img.style.height = "100px";
				img.src = URL.createObjectURL(files[i]);
				preview.appendChild(img);
			}
			// file 的change事件有个坑，如果之前上传过一次该文件，再次上传时不会触发change事件，除非手动将value设为空，
			// 这样才可以重复上传同一个文件
			this.$refs.file.value = "";
		},
		fileDrop(e) {
			// console.log(e.dataTransfer.files)
			let files = e.dataTransfer.files;
			let preview = this.$refs.preview;
			for (let i = 0; i < files.length; i++) {
				console.log(files[i].type);
				if (files[i].type.indexOf("image") >= 0) {
					let img = document.createElement("img");
					img.style.height = "100px";
					img.src = URL.createObjectURL(files[i]);
					preview.appendChild(img);
				} else if (files[i].type.indexOf("text") >= 0) {
					let reader = new FileReader();
					reader.onload = function(e) {
						let p = document.createElement("p");
						p.innerHTML = e.target.result;
						preview.appendChild(p);
					};
					reader.readAsText(files[i], "utf-8");
				} else {
				}
			}
		},
		clickFile() {
			this.$refs.file.click();
		}
	}
};
</script>

<style lang="scss" scoped>
.upload-file {
	width: 1440px;
	margin: 50px auto;
}
.preview-box {
	width: 100%;
	height: 500px;
	margin-bottom: 50px;
	border: 1px solid skyblue;
	overflow-y: auto;
}

.upload {
	.drag-area {
		width: 100%;
		height: 200px;
		border: 1px dashed #ccc;
	}

	.btn {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
}
</style>

