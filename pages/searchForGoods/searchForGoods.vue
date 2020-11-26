<template>
	<scroll-view class="container" scroll-y="true" style="height: 100%;">
		<view class="search-header">
		    <view class="input-box">
		      <view class="iconfont iconsousuo"></view>
			  <input 
			  name="input" 
			  class="searchValue" 
			  focus="true" 
			  confirm-type="search" 
			  v-model="keyword" 
			  :placeholder="defaultKeyword.keyword"
			  @focus="inputFocus" 
			  @confirm="onKeywordConfirm"/>
			  <view v-show="keyword" class="iconfont iconicon-test del" @click="clearKeyword"></view>
		    </view>
		    <view class="right" @click="closeSearch">取消</view> 
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', //输入框值
				defaultKeyword: {} //输入框提醒
				
			}
		},
		methods: {
			inputFocus(e){
				console.log('inputFocus',e);
			},
			closeSearch(){
				uni.navigateBack();
			},
			clearKeyword(){
				this.keyword = '';
			}
		},
		watch: {
			keyword(newValue){
				
				//
			}
		}
	}
</script>

<style>
	.search-header{
	    position: fixed;
	    top: 0;
	    width: 750rpx;
	    height: 91rpx;
	    display: flex;
	    background: #fff;
	    border-bottom: 1px solid rgba(0,0,0,.15);
	    padding: 0 31.25rpx;
	    font-size: 29rpx;
	    color: #333;
	}
	
	.search-header .input-box{
	    position: relative;
	    margin-top: 16rpx;
	    float: left;
	    width: 0;
	    flex: 1;
	    height: 59rpx;
	    line-height: 59rpx;
	    padding: 0 20rpx;
	    background: #f4f4f4;
	    border-radius: 30rpx;
	}
	
	.iconsousuo{
		font-size: 32rpx;
	}
	
	.search-header .searchValue {
	    position: absolute;
	    top: 0;
	    left: 40rpx;
	    width: 506rpx;
	    height: 59rpx;
	    padding-left: 30rpx;
	}
	
	.search-header .del {
		color: #cccccc;
		font-size: 40rpx;
	    position: absolute;
	    top: 3rpx;
	    right: 10rpx;
	    z-index: 10;
	}
	
	.search-header .right {
	    margin-top: 24rpx;
	    margin-left: 31rpx;
	    margin-right: 6rpx;
	    width: 58rpx;
	    height: 43rpx;
	    line-height: 43rpx;
	    float: right;
	}
	
	
</style>
