<template>
	<scroll-view class="cate" scroll-y="true">
		<navigator url="url" class="banner">
			<image class="image" :src="currentCategory.wapBannerUrl"></image>
			<view class="txt">{{currentCategory.frontName}}</view>
		</navigator>
		<view class="hd">
			<text class="line"></text>
			<text class="txt">{{currentCategory.name}}分类</text>
			<text class="line"></text>
		</view>
		<view class="bd">
			<navigator
			:url="'../category/category?id='+item.id"
			:class="['item', (index+1) % 3 == 0 ? 'last' : '']"
			v-for="(item,index) in currentCategory.subCategoryList"
			:key='item.id'>
				<image class="icon" :src="item.wapBannerUrl"></image>
				<text class="txt">{{item.name}}</text>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props: ['currentCategory'],
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	
	.cate {
	    border-left: 1px solid #fafafa;
	    flex: 1;
	    height: 100%;
	    padding: 0 30rpx 0 30rpx;
		/* 拆分成组建后，padding显示有问题，就加了这个 */
		box-sizing: border-box;
	}
	
	.banner {
	    display: block;
	    height: 222rpx;
	    width: 100%;
	    position: relative;
	}
	
	.banner .image {
	    position: absolute;
	    top: 30rpx;
	    left: 0;
	    border-radius: 4rpx;
	    height: 192rpx;
	    width: 100%;
	}
	
	.banner .txt {
	    position: absolute;
	    top: 30rpx;
	    text-align: center;
	    color: #fff;
	    font-size: 28rpx;
	    left: 0;
	    height: 192rpx;
	    line-height: 192rpx;
	    width: 100%;
	}
	
	.cate .image {
	    position: absolute;
	    top: 30rpx;
	    left: 0;
	    border-radius: 4rpx;
	    height: 192rpx;
	    width: 100%;
	}
	
	.cate .hd {
	    height: 108rpx;
	    width: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	
	.cate .hd .line {
	    width: 40rpx;
	    height: 1px;
	    background: #d9d9d9;
	}
	
	.cate .hd .txt {
	    font-size: 24rpx;
	    text-align: center;
	    color: #333;
	    padding: 0 10rpx;
	    width: auto;
	}
	
	.cate .hd .line {
	    width: 40rpx;
	    height: 1px;
	    background: #d9d9d9;
	}
	
	.cate .bd {
	    height: auto;
	    width: 100%;
	    overflow: hidden;
	}
	
	.cate .bd .item {
	    display: block;
	    float: left;
	    height: 216rpx;
	    width: 144rpx;
	    margin-right: 34rpx;
	}
	
	.cate .bd .item.last {
	    margin-right: 0;
	}
	
	.cate .bd .item .icon {
	    height: 144rpx;
	    width: 144rpx;
	}
	
	.cate .bd .item .txt {
	    display: block;
	    text-align: center;
	    font-size: 24rpx;
	    color: #333;
	    height: 72rpx;
	    width: 144rpx;
	}

</style>
