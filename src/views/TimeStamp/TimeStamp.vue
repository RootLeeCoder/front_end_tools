<template>
	<div class="container">
		<SideBar></SideBar>
		<div id="main-content">
            TimeStamp
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

		}
	},
	mounted() {

	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
@import './TimeStamp.less';
</style>