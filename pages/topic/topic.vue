<template>
	<view class="container">
		<top-content :topicList='topicList'>
			<topic-nav :showPage='showPage' :page='page' :count='count' :size='size' @scrollPage='scrollPage'></topic-nav>
		</top-content>
		
	</view>
</template>

<script>
	import topContent from '../../components/topicContent/topicContent.vue';
	import topicNav from '../../components/topicNav/topicNav.vue';
	
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');

	export default {
		components: {
			topContent,
			topicNav
		},
		data() {
			return {
				page: 1, //页码
				size: 10, //行数
				count: 0, //总数
				showPage: false ,//是否显示工具栏
				scrollTop: 0,//滚动条位置
				topicList: []
			}
		},
		methods: {
			getTopic() {
				this.scrollTop = 0;
				this.showPage = false;
				this.topicList = [];
				// 页面渲染完成
				uni.showToast({
					title: '加载中...',
					icon: 'loading',
					duration: 2000
				})
				util.request(api.TopicList, {
					page: this.page,
					size: this.size
				}).then((res)=>{
					if (res.code === 0) {
						this.scrollTop = 0;
						this.topicList = res.data.data;
						this.showPage = true;
						this.count = res.data.count;
					}
					//关闭窗口  此处感觉可以放在complete中，因为可能会有异常发生
					uni.hideToast();
				});
			},
			scrollPage(page){
				console.log('page',page);
			}
		},
		onLoad() {
			this.getTopic();
		}
	}
</script>

<style>
	page,
	.container {
		width: 750rpx;
		height: 100%;
		overflow: hidden;
		background: #f4f4f4;
	}
</style>
