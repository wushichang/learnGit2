<template>
	<view class="search">
	    <navigator url="" class="input">
	      <view class="iconfont iconsousuo"></view>
	      <text class="txt">商品搜索, 共{{goodsCount}}款好物</text>
	    </navigator>
	</view>
</template>

<script>
	export default{
		props: ['goodsCount'],
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.search {
	  height: 88rpx;
	  width: 100%;
	  padding: 0 30rpx;
	  background: #fff;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  color: #666;
	}
	
	.input {
	  width: 710rpx;
	  height: 56rpx;
	  background: #ededed;
	  border-radius: 30rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.txt {
	  line-height: 42rpx;
	  height: 42rpx;
	  padding-left: 8rpx;
	  font-size: 30rpx;
	}
	
	.iconsousuo {
		font-size: 30rpx;
	}
	
	
</style>
