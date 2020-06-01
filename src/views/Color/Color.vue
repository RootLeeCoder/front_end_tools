<template>
	<div class="container">
		<SideBar></SideBar>
		<div class="main-content">
            Color
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
@import './Color.less';
</style>