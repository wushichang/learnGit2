<template>
	<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="scrollStyle">
		<view class="cate-item">
			<!-- v-show有时候很坑 -->
			<view class="h" v-if="goodsList.length<0">
				<text class="name">{{currentCategory.name}}</text>
				<text class="desc">{{currentCategory.frontName}}</text>
			</view>
			<view class="b">
				<navigator :class="['item' , (iindex + 1) % 2 == 0 ? 'item-b' : '']" :url="'../goods/goods?id='+iitem.id+'&serviceFlag='+iitem.serviceFlag"
				 v-for="(iitem,iindex) in goodsList" :key='iitem.id'>
					<image class="img" :src="iitem.listPicUrl" background-size="cover"></image>
					<text class="name">{{iitem.name}}</text>
					<text class="price">￥{{iitem.retailPrice}}</text>
				</navigator>
			</view>
		</view>

		<view v-show="goodsList.length>4" class="loadmore">
			<template v-if="nomore">
				<text>{{nomoreText}}</text>
			</template>
			<template v-else>
				<text class="iconfont icon-loading loading" space="nbsp"></text>
				<text> {{loadmoreText}}</text>
			</template>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props: ['scrollTop','currentCategory','goodsList','nomore','nomoreText','loadmoreText'],
		data(){
			return{
				scrollHeight: 0
			}
		},
		created() {
			//获取手机信息
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = res.windowHeight;
				}
			})
		},
		computed:{
			scrollStyle(){
				// 不知道动态样式怎么就不能用，对象方法竟然不行，我日他奶奶
				const style =  this.goodsList.length>0? 'height : '+this.scrollHeight+'px' : '';
				return style;
			}
		}
	}
	
</script>

<style>
	
	.cate-item{
	    margin-top: 94rpx;
	    height: auto;
	    overflow: hidden;
	}
	
	.cate-item .h{
	    height: 145rpx;
	    width: 750rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	}
	
	.cate-item .h .name{
	    display: block;
	    height: 35rpx;
	    margin-bottom: 18rpx;
	    font-size: 30rpx;
	    color: #333;
	}
	
	.cate-item .h .desc{
	    display: block;
	    height: 24rpx;
	    font-size: 24rpx;
	    color: #999;
	}
	
	.cate-item .b{
	  width: 750rpx;
	  padding: 0 6.25rpx;
	  height: auto;
	  overflow: hidden;
	}
	
	.cate-item .b .item{
	  float: left;
	  background: #fff;
	  width: 365rpx;
	  margin-bottom: 6.25rpx;
	  padding-bottom: 33.333rpx;
	  height: auto;
	  overflow: hidden;
	  text-align: center;
	}
	
	.cate-item .b .item-b{
	  margin-left: 6.25rpx;
	}
	
	.cate-item .item .img{
	  width: 302rpx;
	  height: 302rpx;
	}
	
	.cate-item .item .name{
	  display: block;
	  width: 365.625rpx;
	  height: 35rpx;
	  margin: 11.5rpx 0 22rpx 0;
	  text-align: center;
	  overflow: hidden;
	  padding: 0 20rpx;
	  font-size: 30rpx;
	  color: #333;
	}
	
	.cate-item .item .price{
	  display: block;
	  width: 365.625rpx;
	  height: 30rpx;
	  text-align: center;
	  font-size: 30rpx;
	  color: #b4282d;
	}
	
	
	.loadmore {
	  height: 100rpx;
	  width: 100%;
	  line-height: 80rpx;
	  text-align: center;
	  margin-top: 0rpx;
	}
	
	.loadmore text {
	  color: #999;
	}
	
	@keyframes loading {
	  0% {transform: rotate(0deg)}
	  50% {transform: rotate(180deg)}
	  100% {transform: rotate(360deg)}
	}
	
	.loading {
	  display: inline-block;
	  transform-origin: 50% 50%;
	  animation: loading 1s linear infinite;
	}
	
</style>
