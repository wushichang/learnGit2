<template>
	<scroll-view class="container">
		<scroll-view class="content">
			<image v-if="topic.itemPicUrl" :src="topic.itemPicUrl"></image>
			<view v-html="htmlVal" style="padding-left: 30rpx;"></view>
		</scroll-view>
		<comments :commentList='commentList' :commentCount='commentCount' :topic='topic' :idVal='id'></comments>
		<scroll-view class="rec-box">
			<view class="h">
				<text class="txt">专题推荐</text>
			</view>
			<view class="b">
				<navigator class="item" v-for="item in  topicList" :key='item.id' :url="'../topicDetail/topicDetail?id='+item.id">
					<image class="img" :src="item.scenePicUrl"></image>
					<text class="title">{{item.title}}</text>
				</navigator>
			</view>
		</scroll-view>
	</scroll-view>
</template>

<script>
	import comments from '../../components/comments/comments.vue';

	const api = require('../../config/api.js');
	const util = require('../../util/util.js');

	export default {
		components: {
			comments
		},
		data() {
			return {
				id: 0,
				topic: {},
				topicList: [],
				htmlVal: '', //html内容
				commentList: [],
				commentCount: 0
			}
		},
		methods: {
			getCommentList() {
				util.request(api.CommentList, {
					valueId: this.id,
					typeId: 1,
					size: 5
				}).then((res) => {
					if (res.errno === 0) {
						this.commentList = res.data.data;
						this.commentCount = res.data.count;
					}
				});
			}
		},
		onLoad(options) {
			this.id = options.id;
			util.request(api.TopicDetail, {
				id: this.id
			}).then((res) => {
				if (res.errno === 0) {
					this.topic = res.data;
					//res.data.content中有html数据，但是转化一直没有成功，不搞了，mmp
					this.htmlVal = res.data.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
				}
			});

			util.request(api.TopicRelated, {
				id: this.id
			}).then((res) => {
				if (res.errno === 0) {
					this.topicList = res.data;
				}
			});
		},
		onShow() {
			this.getCommentList();
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: auto;
		font-size: 0;
	}

	.content image {
		display: inline-block;
		width: 100%;
	}

	.rec-box {
		width: 690rpx;
		height: auto;
		margin: 0 30rpx;
	}

	.rec-box .h {
		position: relative;
		width: 690rpx;
		height: 96rpx;
		/*border-bottom: 1px solid #d0d0d0;*/
		margin-bottom: 32rpx;
	}

	.rec-box .h .txt {
		display: inline-block;
		position: absolute;
		background: #f4f4f4;
		top: 59rpx;
		left: 200rpx;
		width: 290rpx;
		height: 45rpx;
		line-height: 45rpx;
		font-size: 30rpx;
		color: #999;
		text-align: center;
	}

	.rec-box .b .item {
		width: 690rpx;
		height: 397rpx;
		padding: 24rpx 24rpx 30rpx 24rpx;
		background: #fff;
		margin-bottom: 30rpx;
	}

	.rec-box .b .item .img {
		height: 278rpx;
		width: 642rpx;
	}

	.rec-box .b .item .title {
		display: block;
		margin-top: 30rpx;
		height: 30rpx;
		width: 642rpx;
		font-size: 28rpx;
	}

	
	.rec-box{
	    width: 690rpx;
	    height: auto;
	    margin: 0 30rpx;
	}
	
	.rec-box .h{
	    position: relative;
	    width: 690rpx;
	    height: 96rpx;
	    /*border-bottom: 1px solid #d0d0d0;*/
	    margin-bottom: 32rpx;
	}
	
	.rec-box .h .txt{
	    display: inline-block;
	    position: absolute;
	    background: #f4f4f4;
	    top: 59rpx;
	    left: 200rpx;
	    width: 290rpx;
	    height: 45rpx;
	    line-height: 45rpx;
	    font-size: 30rpx;
	    color: #999;
	    text-align: center;
	}
	
	.rec-box .b .item{
	    width: 690rpx;
	    height: 397rpx;
	    padding: 24rpx 24rpx 30rpx 24rpx;
	    background: #fff;
	    margin-bottom: 30rpx;
	}
	
	.rec-box .b .item .img{
	    height: 278rpx;
	    width: 642rpx;
	}
	
	.rec-box .b .item .title{
	    display: block;
	    margin-top: 30rpx;
	    height: 30rpx;
	    width: 642rpx;
	    font-size: 28rpx;
	}
	
</style>
