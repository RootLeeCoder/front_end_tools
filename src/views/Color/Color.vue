<template>
	<div class="container">
		<div id="main-content">
			<h2>RGB和十六进制转换</h2>
			<div class="checkbox-container">
				<el-radio v-model="trans_checked" label="1">无透明度</el-radio>
				<el-radio v-model="trans_checked" label="2">有透明度</el-radio>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>RGB显示</span>
				</div>
				<div class="rgb-container">
					<el-input class="single-color-input" id="red_input" v-model="red" placeholder="红(R:0~255)"></el-input>
					<el-input class="single-color-input" id="green_input" v-model="green" placeholder="绿(G:0~255)"></el-input>
					<el-input class="single-color-input" id="blue_input" v-model="blue" placeholder="蓝(B:0~255)"></el-input>
					<el-input class="single-color-input" id="alpha_input" v-model="alpha" placeholder="透明度(A:0~1)" v-if="showAlpha"></el-input>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>十六进制显示</span>
				</div>
				<div class="rgb-container">
					<el-input class="hex-color-input" id="hex-color_input" v-model="hex_input" placeholder="请输入十六进制字符串">
						<template slot="prepend">#</template>
					</el-input>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>色彩显示(点击可复制)</span>
				</div>
				<el-color-picker
					v-model="colorShow"
					@change="pickerChange()"
					:show-alpha="showAlpha">
				</el-color-picker>
				<span v-if="!showAlpha" class="show_text" id="rgb_show" @click="copyContent('rgb_show')">{{RGB_show}}</span>
				<span v-if="showAlpha" class="show_text" id="rgba_show" @click="copyContent('rgba_show')">{{RGBA_show}}</span>
				<span v-if="!showAlpha" class="show_text" id="hex_show" @click="copyContent('hex_show')">{{HEX_show | toLowerCase}}</span>
				<span v-if="showAlpha" class="show_text" id="hex_show_A" @click="copyContent('hex_show_A')">{{HEX_show_A | toLowerCase}}</span>
			</el-card>
			<el-button type="info" @click="clearAll()">全部清空</el-button>
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
			trans_checked: '1', // 有无透明度，默认为无
			showAlpha: false, // 是否显示透明度，默认为不显示
			red: '',
			green: '',
			blue: '',
			alpha: '', // 透明度
			hex_input: '', // 十六进制显示
			colorShow: null, // 显示的色彩(拾色器)
			RGB_show: '', // rgb显示
			RGBA_show: '', // rgba显示，带透明度
			HEX_show: '', // 十六进制显示
			HEX_show_A: '', // 十六进制显示，带透明度
		}
	},
	mounted() {

	},
	computed: {
		// 每个颜色框改变时都进行实时处理
		changedSingleColor() {
			const {red, green, blue} = this
			return {
				red,
				green,
				blue,
			}
		}
	},
	methods: {
		// 处理单个RGB输入框变化
		handleSingleColorChange() {
			// console.log('处理单个RGB输入框变化')
			this.judge_RGB_isOK()
		},
		// 色彩选择器变化
		pickerChange() {
			// console.log('实时色彩变化')
			if (this.showAlpha == false) {
				this.HEX_show = this.colorShow
				this.RGB_show = this.hex_to_rgb(this.colorShow).str
			} else {

			}
		},
		// 十六进制转RGB算法
		hex_to_rgb(txt) {
			if (txt.length == 7) {
				let r = txt.slice(1,3)
				let g = txt.slice(3,5)
				let b = txt.slice(5,7)
				let str = 'rgb('
				str += parseInt(r, 16) + ', ' + parseInt(g, 16) + ', ' + parseInt(b, 16) + ')'
				return {
					str: str,
					r: parseInt(r, 16),
					g: parseInt(g, 16),
					b: parseInt(b, 16),
				}
				// return str
			} else if (txt.length == 4) {
				let r = txt.slice(1,2)
				let g = txt.slice(2,3)
				let b = txt.slice(3,4)
				r += r
				g += g
				b += b
				let str = 'rgb('
				str += parseInt(r, 16) + ', ' + parseInt(g, 16) + ', ' + parseInt(b, 16) + ')'
				return {
					str: str,
					r: parseInt(r, 16),
					g: parseInt(g, 16),
					b: parseInt(b, 16),
				}
				// return str
			} else {
				console.log('数据格式有误_001')
			}
		},
		// 复制色彩代码
		copyContent(val) {
			let	_input = document.createElement("input")   // 直接构建input
			switch (val) {  // 设置内容
				case 'rgb_show': 
					_input.value = this.RGB_show.toLowerCase()
					break
				case 'rgba_show': 
					_input.value = this.RGBA_show.toLowerCase()
					break
				case 'hex_show': 
					_input.value = this.HEX_show.toLowerCase()
					break
				case 'hex_show_A': 
					_input.value = this.HEX_show_A.toLowerCase()
					break
			}
			document.body.appendChild(_input)    // 添加临时实例
			_input.select()   // 选择实例内容
			document.execCommand("Copy")   // 执行复制
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			document.body.removeChild(_input) // 删除临时实例
		},
		// 检测十六进制的输入是否合法
		check_HEX() {
			let data = this.hex_input
			let length = this.hex_input.length
			if (!this.showAlpha) {
				/* 无透明度 */
				if (length == 0) {
					/* 清空 */
					this.clearAll()
				} else if (length>0 && length<3) {
					/* 不作任何反应 */
				} else if (length == 3) {
					/* 转换 */
					this.red = this.hex_to_rgb('#' + data).r
					this.green = this.hex_to_rgb('#' + data).g
					this.b = this.hex_to_rgb('#' + data).b
					this.colorShow = '#' + data
					this.RGB_show = this.hex_to_rgb('#' + data).str
					this.HEX_show = '#' + data
				} else if (length>3 && length<6) {
					/* 不作任何反应 */
				} else if (length == 6) {
					/* 转换 */
					// console.log(this.hex_to_rgb('#' + data))
					this.red = this.hex_to_rgb('#' + data).r
					this.green = this.hex_to_rgb('#' + data).g
					this.b = this.hex_to_rgb('#' + data).b
					this.colorShow = '#' + data
					this.RGB_show = this.hex_to_rgb('#' + data).str
					this.HEX_show = '#' + data
				} else if (length>6 && length<8) {
					/* 不作任何反应 */
					this.hex_input = data.slice(0,6)
				} else if (length==8) {
					/* 转换 */
				} else if (length>8) {
					/* 删除多余内容 */
				}
			} else if (this.showAlpha) {
				// /* 有透明度 */
				// if (length == 0) {
				// 	/* 清空 */
				// 	this.clearAll()
				// } else if (length>0 && length<3) {
				// 	/* 不作任何反应 */
				// } else if (length == 3) {
				// 	/* 转换 */
				// 	console.log(this.hex_to_rgb('#' + data))
				// } else if (length>3 && length<6) {
				// 	/* 不作任何反应 */
				// } else if (length == 6) {
				// 	/* 转换 */
				// 	console.log(this.hex_to_rgb('#' + data))
				// } else if (length>6 && length<8) {
				// 	/* 不作任何反应 */
				// 	this.hex_input = data.slice(0,6)
				// } else if (length==8) {
				// 	/* 转换 */
				// } else if (length>8) {
				// 	/* 删除多余内容 */
				// }
			}
			return {
				length: length,
				data: data,
			}
		},
		// 清空所有
		clearAll() {
			this.red = ''
			this.green = ''
			this.blue = ''
			this.alpha = ''
			this.hex_input = ''
			this.colorShow = null
			this.RGB_show = ''
			this.RGBA_show = ''
			this.HEX_show = ''
			this.HEX_show_A = ''
		},
		// 判断RGB的值是否都存在
		judge_RGB_isOK() {
			if (parseInt(this.red)>=0 && parseInt(this.red)<=255 && parseInt(this.green)>=0 && parseInt(this.green)<=255 && parseInt(this.blue)>=0 && parseInt(this.blue)<=255) {
				/* 符合条件 */
				let r = this.rgb_to_hex(this.red)
				let g = this.rgb_to_hex(this.green)
				let b = this.rgb_to_hex(this.blue)
				this.hex_input = '' + r + g + b
				this.colorShow = '#' + r + g + b
				this.HEX_show = '#' + r + g + b
			} else {
				/* 不符合条件 */
			}
		},
		// RGB转十六进制算法(单个传入和输出)
		rgb_to_hex(val) {
			if (parseInt(val).toString(16)) {
				return '0' + parseInt(val).toString(16)
			} else {
				return parseInt(val).toString(16)
			}
		}
	},
	watch: {
		// RGB框数据变动
		changedSingleColor() {
			this.handleSingleColorChange()
		},
		// 有无透明度单选框变动
		trans_checked() {
			if (this.trans_checked == '1') {
				this.showAlpha = false
			} else if (this.trans_checked == '2') {
				this.showAlpha = true
			}
		},
		// 色彩显示十六进制框数据变动
		HEX_show() {
			this.hex_input = this.HEX_show
			this.hex_input = this.hex_input.slice(1)
			this.hex_input = this.hex_input.toLowerCase()
			this.red = this.hex_to_rgb(this.HEX_show).r
			this.green = this.hex_to_rgb(this.HEX_show).g
			this.blue = this.hex_to_rgb(this.HEX_show).b
			// console.log(this.hex_to_rgb(this.HEX_show).str)
		},
		// 十六进制显示数据框变动
		hex_input() {
			// console.log('十六进制显示数据框变动')
			// console.log(this.check_HEX().length, this.check_HEX().data)
			this.check_HEX()
		},
	},
	filters: {
		// 转为小写显示
		toLowerCase: function (value) {
			return value.toLowerCase()
		}
	}
}
</script>

<style lang="less" scoped>
@import './Color.less';
</style>