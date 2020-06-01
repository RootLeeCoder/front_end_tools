<template>
	<div class="sidebar">
        <div v-for="(item, index) in toolList" :key="index" class="single-item-container" @click="selectTool(index)">
            {{item.name}}
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
            toolList: [
                {
                    id: 1,
                    name: 'Base64',
                    link: 'Base64'
                },
                {
                    id: 2,
                    name: 'Color',
                    link: 'Color'
                },
                {
                    id: 3,
                    name: 'MD5',
                    link: 'MD5'
                },
            ]
		}
	},
	mounted() {

	},
	methods: {
        selectTool(val) {
            // 跳转路由，并且屏蔽路由重复的错误信息
            this.$router.replace(this.toolList[val].link).catch(err => {err})
        }
	}
}
</script>

<style lang="less" scoped>
@import './SideBar.less';
</style>