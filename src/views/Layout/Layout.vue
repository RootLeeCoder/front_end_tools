<template>
	<div class="container">
		<SideBar></SideBar>
		<!-- <NewSideBar></NewSideBar> -->
		<div class="view-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import SideBar from './../../components/SideBar/SideBar.vue'
import NewSideBar from './../../components/NewSideBar/NewSideBar.vue'
export default {
	components: {
		SideBar, NewSideBar
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
@import './Layout.less';
</style>