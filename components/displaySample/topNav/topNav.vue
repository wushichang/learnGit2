<template>
	<view class="box">
	    <label class="txt" :title="title">{{title}}</label>
	     <navigator class='more' :url="url" :open-type="isSwitchTab?'switchTab':'navigate'">更多</navigator> 
	</view>
</template>

<script>
	export default{
		props:['url','title','isSwitchTab'],
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.box{
	  display: flex;
	  flex-flow: row nowrap;
	  align-items: center;
	  justify-content:space-between;
	  height: 120rpx;
	  padding:0 20rpx;
	}
	
	.txt {
	  display: inline-block;
	  height: 36rpx;
	  font-size: 15px;
	  line-height: 36rpx;
	  color: #1a1a1a;
	}
	
	.more {
	    width: 100rpx;
	    height: 50rpx;
	    line-height: 50rpx;
	    color: #1a1a1a;
	    border: 1px solid #1a1a1a;
	    text-align: center;
	    border-radius: 30rpx;
	    font-size: 26rpx;
	}
	
</style>
