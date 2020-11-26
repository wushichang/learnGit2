<template>
	<view class="a-section a-popular" v-if="hotGoods.length > 0">
	    <top-nav url='../hotGoods/hotGoods' :title="title"></top-nav>
	    <view class="goods">
	      <view class="item" v-for="(item,index) in hotGoods" :key="item.id">
	        <navigator :url="'../goods/goods?id='+item.id">
	          <image class="img" :src="item.listPicUrl" background-size="cover"></image>
				<view class="right">
					<view class="text">
					   <text class="name">{{item.name}}</text>
					   <view class="tx price">
						   <text class='pri dzprice'>￥{{item.retailPrice}}</text>
						   <text class='pri yjprice' v-if="item.marketPrice">￥{{item.marketPrice}}</text> 
					   </view>
					</view>
			   </view>
	        </navigator>
	      </view>
	    </view>
	  </view>
</template>

<script>
	import topNav from '../topNav/topNav.vue';
	
	export default {
		props: ['hotGoods','title'],
		components: {
			topNav
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.a-section {
	  width: 750rpx;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  color: #333;
	  margin-bottom: 20rpx;
	}
	
	.a-popular .goods .item {
	    border-bottom: 1px solid #f4f4f4;
	    margin: 0 20rpx;
	    height: 264rpx;
	    width: 710rpx;
	    padding-bottom: 20rpx;
	}
	
	.a-popular .goods .img {
	    margin-top: 12rpx;
	    margin-right: 12rpx;
	    float: left;
	    width: 240rpx;
	    height: 240rpx;
	}
	
	.a-popular .goods .text {
	    display: flex;
	    flex-wrap: nowrap;
	    flex-direction: column;
	    overflow: hidden;
	    height: 264rpx;
	    width: 456rpx;
	}
	
	.a-popular .goods .name {
	    width: 456rpx;
	    display: block;
	    color: #333;
	    line-height: 50rpx;
	    font-size: 30rpx;
	    margin-top: 20rpx;
	}
	
	.a-popular .goods .right {
	  float: left;
	  height: 264rpx;
	  width: 456rpx;
	  display: flex;
	  flex-flow: row nowrap;
	}
	
	.a-popular .goods .price {
	    width: 456rpx;
	    display: block;
	    color: #b4282d;
	    line-height: 50rpx;
	    font-size: 33rpx;
	    margin-top: 30rpx;
	}

	.dzprice {
	    color: #b4282d;
	}
	
	.yjprice {
	    margin-left: 30rpx;
	    text-decoration: line-through;
	    color: #999;
	}
	
	
	
</style>
