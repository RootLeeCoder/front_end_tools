<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
            <el-input class="single-color-input" id="red_input" v-model="red" placeholder="红(R:0~255)"></el-input>
            <el-input class="single-color-input" id="green_input" v-model="green" placeholder="绿(G:0~255)"></el-input>
            <el-input class="single-color-input" id="blue_input" v-model="blue" placeholder="蓝(B:0~255)"></el-input>
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
			red: '',
			green: '',
			blue: '',
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
			console.log('处理单个RGB输入框变化')
		}
	},
	watch: {
		changedSingleColor() {
			this.handleSingleColorChange()
		}
	}
}
</script>

<style lang="less" scoped>
@import './Color.less';
</style>