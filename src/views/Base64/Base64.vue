<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
			<h2>Base64转码</h2>
            <el-input
				type="textarea"
				:rows="7"
				placeholder="加密前"
				id="encode"
				v-model="encode">
			</el-input>
			<div class="copy_button">
				<el-button type="primary" plain @click="copyEncode()">复制加密前内容↑↑↑</el-button>
				<el-button type="warning" plain @click="copyDecode()">复制加密后内容↓↓↓</el-button>
				<el-button type="info" @click="clearInput()">全部清空</el-button>
				<el-button type="primary" class="intro" @click="openIntro()">关于 Base64</el-button>
			</div>
            <el-input
				type="textarea"
				:rows="7"
				placeholder="加密后"
				id="decode"
				v-model="decode">
			</el-input>
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
			encode: '',
			decode: '',
			message: '',
		}
	},
	mounted() {

	},
	methods: {
		// 加密
		encode_base64Convert() {
			this.decode = window.btoa(unescape(encodeURIComponent(this.encode)))
		},
		// 解密
		decode_base64Convert() {
			this.encode = decodeURIComponent(escape(window.atob(this.decode)))
		},
		// 清空输入的内容
		clearInput() {
			this.encode = ''
			this.decode = ''
		},
		// 复制加密前的内容
		copyEncode() {
			let input = document.getElementById('encode')
			input.select()
			document.execCommand('copy')
			this.$message({
				message: '复制成功',
				type: 'success'
			})
		},
		// 复制加密后的内容
		copyDecode() {
			let input = document.getElementById('decode')
			input.select()
			document.execCommand('copy')
			this.$message({
				message: '复制成功',
				type: 'success'
			})
		},
		// 显示介绍
		openIntro() {
			this.$alert(
				'Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。Base64加密是可以解密的。',
				'关于 Base64', {
				confirmButtonText: '确定',
			});
		},
	},
	watch: {
		// 加密前文本框正在被修改
		encode() {
			this.encode_base64Convert()
		},
		// 加密后文本框正在被修改
		decode() {
			this.decode_base64Convert()
		}
	}
}
</script>

<style lang="less" scoped>
@import './Base64.less';
</style>