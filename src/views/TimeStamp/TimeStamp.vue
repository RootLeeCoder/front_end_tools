<template>
	<div class="container">
		<div id="main-content">
            <h2>时间戳转换</h2>
			<el-radio-group v-model="is_MS">
				<el-radio :label="false">秒级时间戳</el-radio>
				<el-radio :label="true">毫秒级时间戳</el-radio>
			</el-radio-group>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>实时时间</span>
				</div>
				<div class="content-container">
					<div class="now-content">
						<label>当前时间：</label>
						<el-input v-model="now_time" class="time-box"></el-input>
						<i @click="copyContent(1)" class="el-icon-document-copy" id="now_time_copy"></i>
						<label>Unix时间戳：</label>
						<el-input v-model="now_stamp" class="time-box"></el-input>
						<i @click="copyContent(2)" class="el-icon-document-copy" id="now_stamp_copy"></i>
						<el-button type="success" plain icon="el-icon-video-play" @click="startTime()" v-show="is_Paused">开始</el-button>
						<el-button type="danger" plain icon="el-icon-video-pause" @click="pauseTime()" v-show="!is_Paused">暂停</el-button>
						<el-button icon="el-icon-refresh" @click="refreshTime()">刷新</el-button>
					</div>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>时间戳转标准时间</span>
				</div>
				<div class="stamp-time-content">
					<label>时间戳：</label>
					<el-input v-model="second_stamp" class="time-box"></el-input>
					<i @click="copyContent(3)" class="el-icon-document-copy" id="second_time_copy"></i>
					<el-button type="primary" plain class="trans-button" @click="stampTimeConvert()">转换<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
					<label>标准时间：</label>
					<el-input v-model="second_time" class="time-box"></el-input>
					<i @click="copyContent(4)" class="el-icon-document-copy" id="second_time_copy"></i>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>标准时间转时间戳</span>
				</div>
				<div class="time-stamp-content">
					<label>标准时间：</label>
					<el-input v-model="third_time" class="time-box"></el-input>
					<i @click="copyContent(5)" class="el-icon-document-copy" id="third_time_copy"></i>
					<el-button type="primary" plain class="trans-button" @click="timeStampConvert()">转换<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
					<label>时间戳：</label>
					<el-input v-model="third_stamp" class="time-box"></el-input>
					<i @click="copyContent(6)" class="el-icon-document-copy" id="third_time_copy"></i>
				</div>
			</el-card>
        </div>
	</div>
</template>

<script>
import SideBar from './../../components/SideBar/SideBar.vue'
import moment from 'moment'
export default {
	components: {
		SideBar
	},
	data() {
		return {
			now_time: '', // 实时时间——当前时间
			now_stamp: '', // 实时时间——Unix时间戳
			second_stamp: '', // 时间戳转标准时间——时间戳
			second_time: '', // 时间戳转标准时间——标准时间
			third_time: '', // 标准时间转时间戳——标准时间
			third_stamp: '', // 标准时间转时间戳——时间戳
			is_MS: false, // 是否为毫秒级时间戳，默认为秒级
			timer: '', // 定时器控件
			is_Paused: false, // 是否暂停了
		}
	},
	mounted() {
		// 初始化时间
		this.initTime()
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	methods: {
		// 初始化时间
		initTime() {
			let time = new Date()
			this.now_time = moment(time).format('YYYY-MM-DD HH:mm:ss').toString()
			if (!this.is_MS) {
				// 秒级
				this.now_stamp = time.getTime().toString().slice(0,10)
			} else {
				// 毫秒级
				this.now_stamp = time.getTime()
			}
			this.timer = setInterval(() => {
				let time = new Date()
				this.now_time = moment(time).format('YYYY-MM-DD HH:mm:ss').toString()
				if (!this.is_MS) {
					// 秒级
					this.now_stamp = time.getTime().toString().slice(0,10)
				} else {
					// 毫秒级
					this.now_stamp = time.getTime()
				}
			}, 1000)
		},
		// 开始时间
		startTime() {
			this.is_Paused = false
			this.initTime()
		},
		// 暂停时间
		pauseTime() {
			this.is_Paused = true
			clearInterval(this.timer)
		},
		// 刷新时间
		refreshTime() {
			if (this.is_Paused) {
				let time = new Date()
				this.now_time = moment(time).format('YYYY-MM-DD HH:mm:ss').toString()
				if (!this.is_MS) {
					// 秒级
					this.now_stamp = time.getTime().toString().slice(0,10)
				} else {
					// 毫秒级
					this.now_stamp = time.getTime()
				}
			}
		},
		// 复制内容
		copyContent(val) {
			let	_input = document.createElement("input")   // 直接构建input
			switch (val) {  // 设置内容
				case 1:
					_input.value = this.now_time
					break
				case 2:
					_input.value = this.now_stamp
					break
				case 3:
					_input.value = this.second_stamp
					break
				case 4:
					_input.value = this.second_time
					break
				case 5:
					_input.value = this.third_time
					break
				case 6:
					_input.value = this.third_stamp
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
		// 时间戳转标准时间——转换
		stampTimeConvert() {
			if (!this.is_MS) {
				// 秒级
				let timeStamp = parseInt(this.second_stamp + '000')
				this.second_time = moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')
			} else {
				// 毫秒级
				let timeStamp = parseInt(this.second_stamp)
				this.second_time = moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')
			}
		},
		// 标准时间转时间戳——转换
		timeStampConvert() {
			if (!this.is_MS) {
				// 秒级
				let dateTime = new Date(this.third_time)
				this.third_stamp = dateTime.getTime().toString().slice(0,10)
			} else {
				// 毫秒级
				let dateTime = new Date(this.third_time)
				this.third_stamp = dateTime.getTime()
			}
		}
	},
	watch: {
		// 时间戳级数发生变化
		is_MS() {
			if (!this.is_MS) {
				// 毫秒级-->秒级
				if (this.second_stamp.length > 0) {
					this.second_stamp = this.second_stamp.slice(0,10)
				}
				if (this.third_stamp.length > 0) {
					this.third_stamp = this.third_stamp.slice(0,10)
				}
			} else {
				// 秒级-->毫秒级
				if (this.second_stamp.length > 0) {
					this.second_stamp += '000'
				}
				if (this.third_stamp.length > 0) {
					this.third_stamp += '000'
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import './TimeStamp.less';
</style>