<template>
	<div class="sidebar" ref="sidebar">
        <div class="side-switch">
            <div class="icon-container" @click="changeSideBar()">
                <i class="el-icon-s-fold" v-show="isFold"></i>
                <i class="el-icon-s-unfold" v-show="!isFold"></i>
            </div>
        </div>
        <div v-for="(item, index) in toolList" :key="index" class="single-item-container" @click="selectTool(index)" v-show="isFold" ref="item">
            {{item.name}}
        </div>
        <i class="fa fa-github fa-3x github-icon" aria-hidden="true" @click="goRouter('github')"></i>
        <div class="bei-an-container" v-show="isFold">
            <a href="http://beian.miit.gov.cn">
                {{ICP_beian_text}}
            </a>
            <br>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011202000443">
                {{police_beian_text}}
            </a>
        </div>
        <!-- <div class="width-display">当前页面宽度：{{windowWidth}}</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
            isFold: true, // 侧边栏是否展开，默认为展开
            toolList: [ // 侧边栏列表
                    {
                        id: 0,
                        name: 'Base64和图片转换',
                        link: 'Base64_Image'
                    },
                    {
                        id: 1,
                        name: 'Base64转码',
                        link: 'Base64'
                    },
                // {
                //     id: 2,
                //     name: 'RGB和十六进制转换',
                //     link: 'Color'
                // },
                {
                    id: 3,
                    name: 'MD5加密',
                    link: 'MD5'
                },
                {
                    id: 4,
                    name: '时间戳转换',
                    link: 'TimeStamp'
                },
                {
                    id: 5,
                    name: '哔哩哔哩av和BV号转换',
                    link: 'Bilibili'
                },
            ],
            windowWidth: 0,
            ICP_beian_text: '苏ICP备20037045号', // ICP备案号
            police_beian_text: '苏公网安备32011202000443号', // 公安备案号
		}
	},
	mounted() {
        // this.windowWidth = document.body.getBoundingClientRect().width
	},
	methods: {
        // 选择工具
        selectTool(val) {
            // 跳转路由，并且屏蔽路由重复的错误信息
            this.$router.push(this.toolList[val].link).catch(err => {err})
        },
        // 伸缩侧边栏
        changeSideBar() {
            if (this.isFold) {
                // 收缩
                this.isFold = !this.isFold
                this.$refs.sidebar.style.width = '50px'
                document.getElementById('main-content').style.marginLeft = '50px'
            } else {
                // 伸开
                this.isFold = !this.isFold
                this.$refs.sidebar.style.width = '210px'
                document.getElementById('main-content').style.marginLeft = '210px'
            }
        },
        // 跳转
        goRouter(val) {
            switch (val) {
                case 'github':
                    window.open('https://github.com/RootLeeCoder/front_end_tools')
                    break
            }
        }
	}
}
</script>

<style lang="less" scoped>
@import './SideBar.less';
</style>