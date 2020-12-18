<template>
	<view class="container">
		<view class='ts-mes'><text class='ca'>长按可取消收藏!</text></view>
		<view class="collect-list">
			<view class="item" @click="openGoods" @touchstart="touchStart" @touchend="touchEnd" v-for="(item,index) in collectList"
			 :key="item.id" :data-index="index">
				<image class="img" :src="item.listPicUrl"></image>
				<view class="info">
					<view class="name">{{item.name || ''}}</view>
					<view class="subtitle">{{item.goodsBrief || ''}}</view>
					<view class="price">￥{{item.retailPrice || '0.00'}}</view>
				</view>
			</view>
		</view>
		<view class="empty-view" v-if="collectList.length <= 0">
			<image class="icon" src="/static/images/allorder.png"></image>
			<text class="text">无收藏信息</text>
		</view>
	</view>
</template>

<script>
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');

	export default {
		data() {
			return {
				typeId: 0,
				collectList: [],
				touch_start: 0,
				touch_end: 0
			}
		},
		methods: {
			getCollectList() {
				util.request(api.CollectList, {
					typeId: this.typeId
				}).then((res) => {
					if (res.errno === 0) {
						console.log(res.data);
						this.collectList = res.data;
					}
				});
			},

			openGoods(event) {
				let goodsId = this.collectList[event.currentTarget.dataset.index].valueId;
				console.log(goodsId);

				//触摸时间距离页面打开的毫秒数  
				var touchTime = this.touch_end - this.touch_start;
				console.log(touchTime);
				//如果按下时间大于350为长按  
				if (touchTime > 350) {
					uni.showModal({
						title: '',
						content: '确定取消收藏吗？',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确认');
								util.request(api.CollectAddOrDelete, {
									typeId: this.typeId,
									valueId: goodsId
								}, 'POST').then((res) => {
									if (res.errno === 0) {
										console.log(res.data);
										uni.showToast({
											title: '取消成功',
											icon: 'success',
											duration: 2000
										});
										this.getCollectList();
									}
								});
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/goods/goods?id=' + goodsId,
					});
				}
			},
			//按下事件开始  
			touchStart(e) {
				this.touch_start = e.timeStamp;
				console.log(e.timeStamp + '- touch-start')
			},
			//按下事件结束  
			touchEnd(e) {
				this.touch_end = e.timeStamp;
				console.log(e.timeStamp + '- touch-end')
			}
		},
		onShow() {
			this.getCollectList();
		}
	}
</script>

<style>
	page {
		background: #f4f4f4;
		min-height: 100%;
	}

	.container {
		background: #f4f4f4;
		min-height: 100%;
	}

	.ts-mes {
		height: 80rpx;
		line-height: 80rpx;
		background: #feeff0;
	}

	.ts-mes .ca {
		margin-left: 20rpx;
		color: #b4282d;
		letter-spacing: 0.1em;
	}

	.collect-list {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
		padding-left: 30rpx;
		border-top: 1px solid #e1e1e1;
	}

	.item {
		height: 212rpx;
		width: 720rpx;
		background: #fff;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #e1e1e1;
	}

	.item:last-child {
		border-bottom: 1px solid #fff;
	}

	.item .img {
		float: left;
		width: 150rpx;
		height: 150rpx;
	}

	.item .info {
		float: right;
		width: 540rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
	}

	.item .info .name {
		font-size: 28rpx;
		color: #333;
		line-height: 40rpx;
	}


	.item .info .subtitle {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #888;
		line-height: 40rpx;
	}

	.item .info .price {
		margin-top: 8rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 40rpx;
	}
</style>
