<template>
	<view class="a-section good-grid"  v-if="item.goodsList.length>0">
		<top-nav :url="'/pages/category/category?id='+item.id" :title="item.name"></top-nav>
	    <view class="goods">
	      <block v-for="(iitem,iindex) in item.goodsList" :key="iitem.id">
	        <view :class="['item',iindex % 2 === 0 ? '' : 'item-b']">
	          <navigator :url="'../goods/goods?id='+iitem.id" class="link">
				  <!-- background-size="cover"搞个这东西我不知道想干嘛 -->
	            <image class="img" :src="iitem.listPicUrl" background-size="cover" mode="aspectFill"></image>
	            <text class="name">{{iitem.name || ''}}</text>
	            <!-- <text class="price">￥{{iitem.retailPrice}}</text> -->
	            <view class="tx price">
	            <text class='pri dzprice'>￥{{iitem.retailPrice || '0.00'}}</text>
	            <text class='pri yjprice' v-if="item.marketPrice">￥{{item.marketPrice}}</text>
	            </view>
	          </navigator>
	        </view>
	      </block>
	    </view>
	  </view>
</template>

<script>
	import topNav from '../topNav/topNav.vue';
	
	export default{
		props:['item'],
		components: {
			topNav
		},
		data(){
			return{
				
			}
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
	
	.good-grid .goods {
	  width: 750rpx;
	  padding: 0 6.25rpx;
	  height: auto;
	  overflow: hidden;
	}
	
	.good-grid .goods .item {
	    float: left;
	    background: #fff;
	    width: 365rpx;
	    margin-bottom: 6.25rpx;
	    height: 452rpx;
	    overflow: hidden;
	    text-align: center;
	}
	
	.good-grid .goods .item-b {
	    margin-left: 6.25rpx;
	}
	
	.good-grid .goods .item .link {
	    height: 452rpx;
	    width: 100%;
	}
	
	.good-grid .item .img {
	    margin-top: 20rpx;
	    width: 302rpx;
	    height: 302rpx;
	}
	
	.good-grid .item .name {
	    display: block;
	    width: 365.625rpx;
	    padding: 0 20rpx;
	    overflow: hidden;
	    height: 35rpx;
	    margin: 11.5rpx 0 22rpx 0;
	    text-align: center;
	    font-size: 30rpx;
		/* #ifdef APP-PLUS */
		line-height: 30rpx;
		/* #endif */
	    color: #333;
	}
	
	.good-grid .item .price {
	    display: block;
	    width: 365.625rpx;
	    height: 30rpx;
	    text-align: center;
	    font-size: 30rpx;
	    color: #b4282d;
	}
	
	.dzprice {
	    color: #b4282d;
	}
	
</style>
