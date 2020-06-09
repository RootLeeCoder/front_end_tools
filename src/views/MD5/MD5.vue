<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
			<h2>MD5加密</h2>
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
				<el-button type="primary" class="intro" @click="openIntro()">关于 MD5</el-button>
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
import md5 from 'js-md5'
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
		// MD5加密
		encode_MD5Convert() {
			this.decode = md5(this.encode)
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
				'MD5信息摘要算法（英语：MD5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。MD5加密是一种不可逆的加密方式。',
				'关于 MD5', {
				confirmButtonText: '确定',
			});
		},
	},
	watch: {
		// 加密前文本框正在被修改
		encode() {
			this.encode_MD5Convert()
		},
	}
}
</script>

<style lang="less" scoped>
@import './MD5.less';
</style>