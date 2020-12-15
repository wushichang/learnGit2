<template>
	<view class="container">
		<view class="brand-info">
			<view class="name">
				<image class="img" :src="brand.appListPicUrl" background-size="cover"></image>
				<view class="info-box">
					<view class="info">
						<text class="txt">{{brand.name}}</text>
						<text class="line"></text>
					</view>
				</view>
			</view>
			<view class="desc">
				{{brand.simpleDesc}}
			</view>
		</view>

		<view class="cate-item" v-if="goodsList.length > 0">
			<view class="b">
				<block v-for="(iitem,iindex) in goodsList" :key='iitem.id'>
					<navigator :class="['item' , iindex % 2 == 0 ? 'item-b' : '']" :url="'../goods/goods?id='+iitem.id">
						<image class="img" :src="iitem.listPicUrl" background-size="cover"></image>
						<text class="name">{{iitem.name}}</text>
						<text class="price">￥{{iitem.retailPrice}}</text>
					</navigator>
				</block>
			</view>
		</view>
		<view class="empty-view" v-if="goodsList.length <= 0">
			<image class="icon" src="/static/images/allorder.png"></image>
			<text class="text">无商品信息</text>
		</view>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');

	export default {
		data() {
			return {
				id: 0,
				brand: {},
				goodsList: [],
				page: 1,
				size: 1000
			}
		},
		methods: {
			getBrand() {
				let that = this;
				util.request(api.BrandDetail, {
					id: this.id
				}).then((res)=> {
					if (res.errno === 0) {
						this.brand = res.data.brand;
						this.getGoodsList();
					}
				});
			},
			getGoodsList() {
				util.request(api.GoodsList, {
						brandId: this.id,
						page: this.page,
						size: this.size
					})
					.then((res)=> {
						if (res.errno === 0) {
							this.goodsList = res.data.goodsList;
						}
					});
			}
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.id = options.id;
			this.getBrand();
		}
	}
</script>

<style>
	page {
		background: #f4f4f4;
	}

	.brand-info .name {
		width: 100%;
		height: 290rpx;
		position: relative;
	}

	.brand-info .img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 290rpx;
	}

	.brand-info .info-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 290rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.brand-info .info {
		display: block;
	}

	.brand-info .txt {
		display: block;
		height: 37.5rpx;
		font-size: 37.5rpx;
		color: #fff;
	}

	.brand-info .line {
		margin: 0 auto;
		margin-top: 16rpx;
		display: block;
		height: 2rpx;
		width: 145rpx;
		background: #fff;
	}

	.brand-info .desc {
		background: #fff;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 41.5rpx 31.25rpx;
		font-size: 30rpx;
		color: #666;
		line-height: 41.5rpx;
		text-align: center;
	}

	.cate-item .b {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		border-top: 1rpx solid #f4f4f4;
		margin-top: 20rpx;
	}

	.cate-item .b .item {
		float: left;
		background: #fff;
		width: 375rpx;
		padding-bottom: 33.333rpx;
		border-bottom: 1rpx solid #f4f4f4;
		height: auto;
		overflow: hidden;
		text-align: center;
	}

	.cate-item .b .item-b {
		border-right: 1rpx solid #f4f4f4;
	}

	.cate-item .item .img {
		margin-top: 10rpx;
		width: 302rpx;
		height: 302rpx;
	}

	.cate-item .item .name {
		display: block;
		width: 365.625rpx;
		height: 35rpx;
		padding: 0 20rpx;
		overflow: hidden;
		margin: 11.5rpx 0 22rpx 0;
		text-align: center;
		font-size: 30rpx;
		color: #333;
	}

	.cate-item .item .price {
		display: block;
		width: 365.625rpx;
		height: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #b4282d;
	}
</style>
