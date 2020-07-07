<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
            <h2>Base64和图片转换</h2>
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
			img_url: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'
		}
	},
	mounted() {
		this.imageToBase64(this.img_url)
	},
	methods: {
		imageToBase64(file) {
			var reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				console.log('file 转 base64结果：' + reader.result)
				this.iconBase64 = reader.result
			}
			reader.onerror = function (error) {
				console.log('Error: ', error)
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import './Base64_Image.less';
</style>