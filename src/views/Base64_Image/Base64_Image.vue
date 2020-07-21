<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
            <h2>Base64和图片转换</h2>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>图片转Base64</span>
				</div>
				<div class="image-to-base64-content">
					<div class="upload-left">
						<a href="javascript:;" class="file">
							<i class="el-icon-folder-add"></i>
							选择图片
							<input @change="processImage()" type="file" id="img_upload" />
						</a>
						<el-button type="success" plain class="copy-button" @click="copyBase64()">
							<i class="el-icon-document-copy"></i>
							复制内容
						</el-button>
					</div>
					<div class="display-right">
						<el-input
							type="textarea"
							:rows="8"
							placeholder="转换之后的Base64编码"
							v-model="base64Converted"
							readonly>
						</el-input>
					</div>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>Base64转图片</span>
				</div>
				<div class="base64-to-image-content">
					<div class="input-up">
						<el-input
							type="textarea"
							:rows="8"
							placeholder="转换之前的Base64编码"
							v-model="base64ReadyToConvert">
						</el-input>
					</div>
					<div class="display-down">
						<div class="button-left">
							<el-button type="primary" @click="base64ToImage()">转换</el-button>
						</div>
						<div class="image-right">
							<el-image
								@click="downloadFile()"
								class="img-container"
								style="width: 100px; height: 100px"
								fit="scale-down"
								:src="img_url">
							</el-image>
							<label style="margin-left: 20px; color: #aaa;">(点击图片即可下载原始尺寸)</label>
						</div>
					</div>
				</div>
			</el-card>
        </div>
	</div>
</template>

<script>
import SideBar from './../../components/SideBar/SideBar.vue'
export default {
	components: {
		SideBar
	},
	data() {
		return {
			img_url: '',
			imgFile: {},
			base64Converted: '', // 转换后的Base64编码
			base64ReadyToConvert: '', // 待转换的Base64编码
		}
	},
	mounted() {

	},
	methods: {
		// 下载文件的方法
		downloadFile() {
			const a = document.createElement("a")
			a.href = URL.createObjectURL(this.imgFile)
			a.download = "fileName" // 这里填保存成的文件名
			a.click()
			URL.revokeObjectURL(a.href)
		　　 a.remove()
		},
		// Base64编码转化为文件的方法
		base64ImgtoFile(dataurl, filename = 'file') {
			let arr = dataurl.split(',')
			let mime = arr[0].match(/:(.*?);/)[1]
			let suffix = mime.split('/')[1]
			let bstr = atob(arr[1])
			let n = bstr.length
			let u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new File([u8arr], `${filename}.${suffix}`, {
				type: mime
			})
		},
		// Base64代码转为图片
		base64ToImage() {
			// base64编码的图片
			let base64Img = this.base64ReadyToConvert
			// 判断是否有前缀，如果没有则加上
			if (!this.judgeHasPrefix(base64Img)) {
				base64Img = 'data:image/png;base64,' + base64Img
			}
			// 转换图片文件
			this.imgFile = this.base64ImgtoFile(base64Img)
			// 创建图片的Base64链接
			this.img_url = URL.createObjectURL(this.imgFile)
		},
		// 判断是否加上前缀
		judgeHasPrefix(str) {
			if (str.indexOf('data:image') != -1) {
				return true
			} else {
				return false
			}
		},
		// 处理上传的图片文件
		processImage() {
			let _this = this
			let img_upload = document.getElementById("img_upload")
			let file = img_upload.files[0]
			if (!/image\/\w+/.test(file.type)) {
				this.$message.error('请确保文件为图像类型')
				return false
			}
			var reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = function () {
				_this.base64Converted = this.result
			}
		},
		// 复制转码后的Base64
		copyBase64() {
			let	_input = document.createElement("input")   // 直接构建input
			_input.value = this.base64Converted // 设置内容
			document.body.appendChild(_input)    // 添加临时实例
			_input.select()   // 选择实例内容
			document.execCommand("Copy")   // 执行复制
			this.$message({ // 消息提示(可选)
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input) // 删除临时实例
		}
	}
}
</script>

<style lang="less" scoped>
@import './Base64_Image.less';
</style>