<template>
	<div class="sidebar" ref="sidebar">
        <div id="switch" @click="changeSideBar()">
            <div class="icon">
                <i class="el-icon-s-fold" v-show="isFold"></i>
                <i class="el-icon-s-unfold" v-show="!isFold"></i>
            </div>
        </div>
        <div class="main_container" v-show="isFold">
            <div class="logo_title">
                <div class="title">
                    WebDev Tools
                </div>
            </div>
            <div class="main_index">
                <div class="main_index_container">
                    <h2 style="color: #ffdd40">加密解密</h2>
                    <ul>
                        <li v-for="(item,index) in itemList_Encode" :key="index" @click="selectTool(1, index)">
                            <span class="item_text">
                                <i :class="item.icon"></i>
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                    <h2 style="color: #47cf73">实用转换</h2>
                    <ul>
                        <li v-for="(item,index) in itemList_TransForm" :key="index" @click="selectTool(2, index)">
                            <span class="item_text">
                                <i :class="item.icon"></i>
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                    <h2 style="color: #0ebeff">外部链接</h2>
                    <ul>
                        <li v-for="(item,index) in extLink" :key="index" @click="selectTool(3, index)">
                            <span class="item_text">
                                <i :class="item.icon"></i>
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer_beian">
                
            </div>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
            isFold: true, // 侧边栏是否展开，默认为展开
            itemList_Encode: [ // 加密解密
                {
                    id: 0,
                    name: 'MD5加密',
                    icon: 'fa fa-lock',
                    link: 'MD5'
                },
                {
                    id: 1,
                    name: 'Base64转码',
                    icon: 'fa fa-bold',
                    link: 'Base64'
                },
            ],
            itemList_TransForm: [ // 实用转换
                {
                    id: 0,
                    name: 'Base64和图片转换',
                    icon: 'fa fa-file-image-o',
                    link: 'Base64_Image'
                },
                // {
                //     id: 1,
                //     name: 'RGB和十六进制转换',
                //     icon: 'fa fa-tachometer',
                //     link: 'Color'
                // },
                {
                    id: 2,
                    name: '时间戳转换',
                    icon: 'fa fa-clock-o',
                    link: 'TimeStamp'
                },
                {
                    id: 3,
                    name: '哔哩哔哩av和BV号转换',
                    icon: 'fa fa-television',
                    link: 'Bilibili'
                },
            ],
            extLink: [
                {
                    id: 0,
                    name: '我的博客',
                    icon: 'fa fa-home',
                    link: 'https://exnightmoon.gitee.io/'
                },
                {
                    id: 1,
                    name: '私人图床',
                    icon: 'fa fa-bed',
                    link: 'http://212.64.93.67:8888/'
                },
                {
                    id: 2,
                    name: '项目仓库',
                    icon: 'fa fa-github',
                    link: 'https://github.com/RootLeeCoder/front_end_tools'
                },
            ]
		}
	},
	mounted() {
        this.$refs.sidebar.style.background = '#1e1f26'
	},
	methods: {
        // 伸缩侧边栏
        changeSideBar() {
            if (this.isFold) {
                // 收缩
                this.isFold = !this.isFold
                this.$refs.sidebar.style.width = '12px'
                this.$refs.sidebar.style.background = 'repeating-linear-gradient(45deg,#868ca0,#868ca0 2px,#5a5f73 0,#5a5f73 4px)'
                document.getElementById('view-container').style.marginLeft = '12px'
                document.getElementById('switch').style.left = '0px'
            } else {
                // 伸开
                this.isFold = !this.isFold
                this.$refs.sidebar.style.width = '210px'
                this.$refs.sidebar.style.background = '#1e1f26'
                document.getElementById('view-container').style.marginLeft = '210px'
                document.getElementById('switch').style.left = '210px'
            }
        },
        // 选择工具
        selectTool(type, index) {
            switch (type) {
                case 1:
                    this.$router.push(this.itemList_Encode[index].link).catch(err => {err})
                    break
                case 2:
                    this.$router.push(this.itemList_TransForm[index].link).catch(err => {err})
                    break
                case 3:
                    window.open(this.extLink[index].link)
                    break
            }
        }
	}
}
</script>

<style lang="less" scoped>
@import './NewSideBar.less';
</style>