<template>
	<view class="a-section" :class="className" v-if="newGoods.length > 0">
	    <top-nav url='../newGoods/newGoods' :title="title"></top-nav>
	    <view class="goods">
	      <view class="item" v-for="(item,index) in newGoods" :key="item.id">
	        <navigator :url="'../goods/goods?id='+item.id">
	          <image class="img" :src="item.listPicUrl" background-size="cover"></image>
	          <text class="name">{{item.name || ''}}</text>
	          <view class="tx price">
	           <text class='pri dzprice'>￥{{item.retailPrice || '0.00'}}</text>
	           <text class='pri yjprice' v-if="item.marketPrice">￥{{item.marketPrice}}</text>
	          </view>
	          <!-- <text class="price">￥{{item.retailPrice}}</text> -->
	        </navigator>
	      </view>
	    </view>
	  </view>
</template>

<script>
	import topNav from '../topNav/topNav.vue';
	
	export default {
		props: ['newGoods','title','className'],
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
	
	/* 新品 start */
	
	.a-new .goods {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0 20rpx 45rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
	
	.a-new .goods .item {
	  float: left;
	  width: 350rpx;
	  margin-bottom: 20rpx;
	}
	
	.a-new .goods .img {
		width: 350rpx;
		height: 350rpx;
	}
	
	.a-new .goods .name {
		text-align: center;
		display: block;
		width: 350rpx;
		height: 35rpx;
		margin-bottom: 14rpx;
		overflow: hidden;
		font-size: 30rpx;
		color: #333;
	}
	
	.a-new .goods .price {
	    display: block;
	    text-align: center;
	    line-height: 30rpx;
	    font-size: 30rpx;
	    color: #b4282d;
	}
	
	/* 新品 end */
	
	.dzprice {
	    color: #b4282d;
	}
	
	.yjprice {
	    margin-left: 30rpx;
	    text-decoration: line-through;
	    color: #999;
	}
	
	
	
</style>
