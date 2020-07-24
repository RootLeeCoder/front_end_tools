<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
			<h2>长者曰</h2>
            <el-input
				type="textarea"
				:rows="7"
				placeholder="加密前"
				id="encode"
				v-model="encode">
			</el-input>
			<div class="copy_button">
				<el-button type="primary" @click="encode_base64Convert()">提高姿势水平↓↓↓</el-button>
				<el-button type="warning" @click="decode_base64Convert()">听取人生经验↑↑↑</el-button>
				<!-- <el-button type="primary" plain @click="copyEncode()">复制加密前内容↑↑↑</el-button>
				<el-button type="warning" plain @click="copyDecode()">复制加密后内容↓↓↓</el-button> -->
				<el-button type="info" @click="clearInput()">全部清空</el-button>
				<el-button type="primary" class="intro" @click="openIntro()">关于 长者曰</el-button>
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
import ElderCode from './ElderCode.js'
export default {
	components: {
		SideBar
	},
	data() {
		return {
			encode: '',
			decode: '',
            message: '',
            ElderData: [], // 神秘编码
            pre_decode: '', // 加密过程中的Base64预处理代码
            pre_encode: '', // 解密过程中的Base64预处理代码
		}
	},
	mounted() {
        this.ElderData = ElderCode.ElderCode
	},
	methods: {
        // 长者编码
        encode_ElderCode() {
            this.decode = ''
            for (let i=0; i<this.pre_decode.length; i++) {
                for (let j=0; j<this.ElderData.length; j++) {
                    if (this.pre_decode[i] == this.ElderData[j].before) {
                        this.decode += this.ElderData[j].after
                    }
                }
            }
        },
		// 加密
		encode_base64Convert() {
            this.pre_decode = window.btoa(unescape(encodeURIComponent(this.encode)))
            this.encode_ElderCode()
		},
		// 解密
		decode_base64Convert() {
			this.pre_encode = ''
			for (let i=0; i<this.decode.length; i++) {
				for (let j=0; j<this.ElderData.length; j++) {
					if (this.decode[i] == this.ElderData[j].after[0]) {
						this.pre_encode += this.ElderData[j].before
						i += this.ElderData[j].after.length - 1
						break
					}
				}
			}
			console.log(this.pre_encode)
            this.encode = decodeURIComponent(escape(window.atob(this.pre_encode)))
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
				'长者曰是站长自创的一套算法。',
				'关于 长者曰', {
				confirmButtonText: '确定',
			});
		},
	},
}
</script>

<style lang="less" scoped>
@import './ElderSay.less';
</style>