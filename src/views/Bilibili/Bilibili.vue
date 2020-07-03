<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
			<h2 class="little-title">哔哩哔哩av和BV号转换</h2>
			<div class="av-input">
				<!-- <span class="front_link">https://www.bilibili.com/video/av</span> -->
				<el-input class="back_link" size="small" v-model="av_input" ref='av_'>
					<template slot="prepend">https://www.bilibili.com/video/av</template>
				</el-input>
			</div>
			<div class="copy_button">
				<el-button type="primary" plain @click="copy_av()">复制av号↑↑↑</el-button>
				<el-button type="primary" @click="copy_av_full()">复制完整av号链接↑↑↑</el-button>
				<el-button type="warning" plain @click="copy_BV()">复制BV号↓↓↓</el-button>
				<el-button type="warning" @click="copy_BV_full()">复制完整BV号链接↓↓↓</el-button>
				<el-button type="info" @click="clearInput()">全部清空</el-button>
			</div>
			<div class="BV-input">
				<!-- <span class="front_link">https://www.bilibili.com/video/BV</span> -->
				<el-input class="back_link" size="small" v-model="BV_input" ref='BV_'>
					<template slot="prepend">https://www.bilibili.com/video/</template>
				</el-input>
			</div>
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
			av_input: '',
			BV_input: '',
		}
	},
	mounted() {

	},
	methods: {
		// 清空全部内容
		clearInput() {
			this.$refs.av_.value = ''
			this.$refs.BV_.value = ''
		},
		// 加密(av转BV)
		enc(x) {
			let table='fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
			let tr={}
			for (let i=0; i<58; i++) {
				tr[table[i]]=i
			}
			let s=[11,10,3,8,4,6]
			let xor=177451812
			let add=8728348608
			x=(x^xor)+add
			let res = 'BV1' + table[parseInt(x/Math.pow(58,2))%58] + table[parseInt(x/Math.pow(58,4))%58] + '4' +  table[parseInt(x/Math.pow(58,5))%58] + '1' + table[parseInt(x/Math.pow(58,3))%58] + '7' + table[parseInt(x/Math.pow(58,1))%58] + table[parseInt(x/Math.pow(58,0))%58]
			this.BV_input = res
		},
		// 解密(BV转av)
		dec(x) {
			let table='fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
			let tr={}
			for (let i=0; i<58; i++) {
				tr[table[i]]=i
			}
			let s=[11,10,3,8,4,6]
			let xor=177451812
			let add=8728348608
			let r=0
			for (let i=0; i<6; i++) {
				r+=tr[x[s[i]]]*58**i
			}
			this.av_input = (r-add)^xor
		},
		// 复制av号
		copy_av() {
			let	_input = document.createElement("input");   // 直接构建input
			_input.value = 'av' + this.av_input;  // 设置内容
			document.body.appendChild(_input);    // 添加临时实例
			_input.select();   // 选择实例内容
			document.execCommand("Copy");   // 执行复制
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input); // 删除临时实例
		},
		// 复制完整av链接
		copy_av_full() {
			let	_input = document.createElement("input");   // 直接构建input
			_input.value = 'https://www.bilibili.com/video/av' + this.av_input;  // 设置内容
			document.body.appendChild(_input);    // 添加临时实例
			_input.select();   // 选择实例内容
			document.execCommand("Copy");   // 执行复制
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input); // 删除临时实例
		},
		// 复制BV号
		copy_BV() {
			let	_input = document.createElement("input");   // 直接构建input
			_input.value = this.BV_input;  // 设置内容
			document.body.appendChild(_input);    // 添加临时实例
			_input.select();   // 选择实例内容
			document.execCommand("Copy");   // 执行复制
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input); // 删除临时实例
		},
		// 复制完整BV链接
		copy_BV_full() {
			let	_input = document.createElement("input");   // 直接构建input
			_input.value = 'https://www.bilibili.com/video/' + this.BV_input;  // 设置内容
			document.body.appendChild(_input);    // 添加临时实例
			_input.select();   // 选择实例内容
			document.execCommand("Copy");   // 执行复制
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input); // 删除临时实例
		},
	},
	watch: {
		// av号改变
		av_input() {
			let x = this.av_input
			this.enc(x)
		},
		// BV号改变
		BV_input() {
			let x = this.BV_input
			this.dec(x)
		}
	}
}
</script>

<style lang="less" scoped>
@import './Bilibili.less';
</style>