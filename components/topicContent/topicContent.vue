<template>
	<scroll-view class="topic-list" scroll-y="true" :scroll-top="scrollTop">
		<navigator class="item" v-for="item in topicList" :key="item.id" :url="'../topicDetail/topicDetail?id='+item.id">
			<image class="img" :src="item.scenePicUrl"></image>
			<view class="info">
				<text class="title">{{item.title}}</text>
				<text class="desc">{{item.subtitle}}</text>
				<text class="price">{{item.priceInfo}}元起</text>
			</view>
		</navigator>
		<slot></slot>
	</scroll-view>
</template>

<script>
	export default {
		props:['topicList'],
		data() {
			return {
				// 滚动条位置
				scrollTop: 0
			};
		}
	}
</script>

<style>
	
	.topic-list{
	    width: 750rpx;
	    height: 100%;
	    overflow: hidden;
	    background: #f4f4f4;
	}
	
	
	.topic-list .item{
	    width: 100%;
	    height: 625rpx;
	    overflow: hidden;
	    background: #fff;
	    margin-bottom: 20rpx;
	}
	
	.topic-list .img{
	    width: 100%;
	    height: 415rpx;
	}
	
	.topic-list .info{
	    width: 100%;
	    height: 210rpx;
	    overflow: hidden;
	}
	
	.topic-list .title{
	    display: block;
	    text-align: center;
	    width: 100%;
	    height: 33rpx;
	    line-height: 35rpx;
	    color: #333;
	    overflow: hidden;
	    font-size: 35rpx;
	    margin-top: 30rpx;
	}
	
	.topic-list .desc{
	    display: block;
	    text-align: center;
	    position: relative;
	    width: auto;
	    height: 24rpx;
	    line-height: 24rpx;
	    overflow: hidden;
	    color: #999;
	    font-size: 24rpx;
	    margin-top: 16rpx;
	    margin-bottom: 30rpx;
	}
	
	.topic-list .price{
	    display: block;
	    text-align: center;
	    width: 100%;
	    height: 27rpx;
	    line-height: 27rpx;
	    overflow: hidden;
	    color: #b4282d;
	    font-size: 27rpx;
	}

	
</style>
