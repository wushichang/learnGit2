<template>
	<view class="container">
		<view class="order-info">
			<view class="item-a">下单时间：{{orderInfo.addTime}}</view>
			<view class="item-b">订单编号：{{orderInfo.orderSn}}</view>
			<view class="item-a" v-if="orderInfo.shippingName">物流公司：{{orderInfo.shippingName}}</view>
			<view class="item-b" v-if="orderInfo.shippingNo">物流编号：{{orderInfo.shippingNo}}</view>
			<view class="item-c">
				<view class="l">实付：<text class="cost">￥{{orderInfo.actualPrice}}</text></view>
				<!-- <view class="r">
	                <view v-if="{{orderInfo.handleOption.pay}}">
	                  <view class="btn" bindtap="cancelOrder">取消订单</view>
	                  <view class="btn active" bindtap="payOrder">去付款</view>
	                </view>
	                <view v-elif="{{orderInfo.handleOption.confirm}}">
	                  <view class="btn" bindtap="cancelOrder">取消订单</view>
	                  <view class="btn active" bindtap="confirmOrder">确认收货</view>
	                </view>
	                <view v-else>
	                  <view class="btn active" bindtap="cancelOrder">取消订单</view>
	                </view>
	            </view> -->
			</view>
		</view>

		<view class="order-goods">
			<view class="h">
				<view class="label">商品信息</view>
				<view class="status">{{orderInfo.orderStatusText}}</view>
			</view>
			<view class="goods">
				<view class="item" v-for="item in orderGoods" :key="item.id">
					<view class="img">
						<image :src="item.listPicUrl"></image>
					</view>
					<view class="info">
						<view class="t">
							<text class="name">{{item.goodsName}}</text>
							<text class="number">x{{item.number}}</text>
						</view>
						<view class="attr">{{item.goodsSpecifitionNameValue||''}}</view>
						<view class="price">￥{{item.retailPrice}}
							<button v-if="orderInfo.orderStatus>=200" class="btn gopay" :data-order-index="index" @click.stop="buyOrder">再次购买</button>
							<button v-if="orderInfo.orderStatus==301 && item.comments==0" class="btn gopay" :data-order-index="index"
							 @click.stop="commentOrder">评价</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="order-bottom">
			<!-- <view class="address">
	            <view class="t">
	                <text class="name">{{orderInfo.consignee}}</text>
	                <text class="mobile">{{orderInfo.mobile}}</text>
	            </view>
	            <view class="b">{{orderInfo.fullRegion + orderInfo.address}}</view>
	        </view> -->
			<view class="total">
				<view class="t">
					<text class="label">商品合计：</text>
					<text class="txt">￥{{orderInfo.goodsPrice}}</text>
				</view>
				<view class="t">
					<text class="label">运费：</text>
					<text class="txt">￥{{orderInfo.freightPrice}}</text>
				</view>
			</view>
			<view class="pay-fee">
				<text class="label">实付：</text>
				<text class="txt">￥{{orderInfo.actualPrice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var timer = null;
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');
	
	export default {
		data() {
			return {
				orderId: 0,
				orderInfo: {},
				orderGoods: [],
				handleOption: {}
			}
		},
		methods: {
			getOrderDetail() {
				util.request(api.OrderDetail, {
					orderId: this.orderId
				}).then((res)=> {
					if (res.errno === 0) {
						console.log(res.data);
						this.orderInfo = res.data.orderInfo;
						this.orderGoods = res.data.orderGoods;
						this.handleOption = res.data.handleOption;
					}
				});
			},
			payTimer() {
				timer = setInterval(() => {
					console.log(orderInfo);
					this.orderInfo.addTime -= 1;
				}, 1000);
			},
			cancelOrder() {
				console.log('开始取消订单');
				let orderInfo = this.orderInfo;
				console.log(orderInfo);

				var orderStatus = orderInfo.orderStatus;
				console.log(orderStatus);

				var errorMessage = '';
				switch (orderStatus) {
					case 300:
						{
							console.log('已发货，不能取消');
							errorMessage = '订单已发货';
							break;
						}
					case 301:
						{
							console.log('已收货，不能取消');
							errorMessage = '订单已收货';
							break;
						}
					case 101:
						{
							console.log('已经取消');
							errorMessage = '订单已取消';
							break;
						}
					case 102:
						{
							console.log('已经删除');
							errorMessage = '订单已删除';
							break;
						}
					case 401:
						{
							console.log('已经退款');
							errorMessage = '订单已退款';
							break;
						}
					case 402:
						{
							console.log('已经退款退货');
							errorMessage = '订单已退货';
							break;
						}
				}

				if (errorMessage != '') {
					console.log(errorMessage);
					util.showErrorToast(errorMessage);
					return false;
				}

				console.log('可以取消订单的情况');
				uni.showModal({
					title: '',
					content: '确定要取消此订单？',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');

							util.request(api.OrderCancel, {
								orderId: orderInfo.id
							}).then((res)=> {
								console.log(res.errno);
								if (res.errno === 0) {
									console.log(res.data);
									uni.showModal({
										title: '提示',
										content: res.data,
										showCancel: false,
										confirmText: '继续',
										success: (res)=> {
											//  util.redirect('/pages/ucenter/order/order');
											uni.navigateBack();
										}
									});
								}
							});

						}
					}
				});
			},
			payOrder() {
				util.request(api.PayPrepayId, {
					orderId: this.orderId || 15
				}).then((res)=> {
					if (res.errno === 0) {
						const payParam = res.data;
						console.log('下单下单');
						// wx.requestPayment({
						// 	'timeStamp': payParam.timeStamp,
						// 	'nonceStr': payParam.nonceStr,
						// 	'package': payParam.package,
						// 	'signType': payParam.signType,
						// 	'paySign': payParam.paySign,
						// 	'success': (res)=> {
						// 		console.log(res);
						// 	},
						// 	'fail': (res)=> {
						// 		console.log(res);
						// 	}
						// });
					}
				});

			},
			confirmOrder() {
				//确认收货
				console.log('开始确认收货');
				let orderInfo = this.orderInfo;
				console.log(orderInfo);

				var orderStatus = orderInfo.orderStatus;
				console.log(orderStatus);

				var errorMessage = '';
				switch (orderStatus) {
					// case 300: {
					//   console.log('已发货，不能取消');
					//   errorMessage = '订单已发货';
					//   break;
					// }
					case 301:
						{
							console.log('已收货，不能再收货');
							errorMessage = '订单已收货';
							break;
						}
					case 101:
						{
							console.log('已经取消');
							errorMessage = '订单已取消';
							break;
						}
					case 102:
						{
							console.log('已经删除');
							errorMessage = '订单已删除';
							break;
						}
					case 401:
						{
							console.log('已经退款');
							errorMessage = '订单已退款';
							break;
						}
					case 402:
						{
							console.log('已经退款退货');
							errorMessage = '订单已退货';
							break;
						}
				}

				if (errorMessage != '') {
					console.log(errorMessage);
					util.showErrorToast(errorMessage);
					return false;
				}

				console.log('可以取消订单的情况');
				uni.showModal({
					title: '',
					content: '确定已经收到商品？',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');

							util.request(api.OrderConfirm, {
								orderId: orderInfo.id
							}).then((res)=> {
								console.log(res.errno);
								if (res.errno === 0) {
									console.log(res.data);
									uni.showModal({
										title: '提示',
										content: res.data,
										showCancel: false,
										confirmText: '继续',
										success: (res)=> {
											//  util.redirect('/pages/ucenter/order/order');
											uni.navigateBack();
										}
									});
								}
							});

						}
					}
				});
			},
			buyOrder(event) {
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let goods = this.orderGoods[orderIndex];
				console.log("------------------")
				console.log(goods.goodsId)
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + goods.goodsId,
				});
			},
			commentOrder(event) {
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let goods = this.orderGoods[orderIndex];
				let orderIds = this.orderId;
				console.log("------------------")
				console.log(goods.goodsId)
				console.log(orderIds)
				uni.navigateTo({
					url: '/pages/commentPost/commentPost?typeId=0&valueId=' + goods.goodsId + '&orderGoodsId=' + goods.id +
						'&orderId=' + orderIds,
				});
			}
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.orderId = options.id;
			this.getOrderDetail();
		},
		destroyed() {
			clearInterval(timer);
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: #f4f4f4;
	}

	.order-info {
		padding-top: 25rpx;
		background: #fff;
		height: auto;
		overflow: hidden;
	}

	.item-a {
		padding-left: 31.25rpx;
		height: 42.5rpx;
		padding-bottom: 12.5rpx;
		line-height: 30rpx;
		font-size: 30rpx;
		color: #666;
	}

	.item-b {
		padding-left: 31.25rpx;
		height: 29rpx;
		line-height: 29rpx;
		margin-top: 12.5rpx;
		margin-bottom: 41.5rpx;
		font-size: 30rpx;
		color: #666;
	}

	.item-c {
		margin-left: 31.25rpx;
		border-top: 1px solid #f4f4f4;
		height: 103rpx;
		line-height: 103rpx;
	}

	.item-c .l {
		float: left;
	}

	.item-c .r {
		height: 103rpx;
		float: right;
		display: flex;
		align-items: center;
		padding-right: 16rpx;
	}

	.item-c .r .btn {
		float: right;
	}

	.item-c .cost {
		color: #b4282d;
	}

	.item-c .btn {
		line-height: 66rpx;
		border-radius: 5rpx;
		text-align: center;
		margin: 0 15rpx;
		padding: 0 20rpx;
		height: 66rpx;
	}

	.item-c .btn.active {
		background: #b4282d;
		color: #fff;
	}

	.order-goods {
		margin-top: 20rpx;
		background: #fff;
	}

	.order-goods .h {
		height: 93.75rpx;
		line-height: 93.75rpx;
		margin-left: 31.25rpx;
		border-bottom: 1px solid #f4f4f4;
		padding-right: 31.25rpx;
	}

	.order-goods .h .label {
		float: left;
		font-size: 30rpx;
		color: #333;
	}

	.order-goods .h .status {
		float: right;
		font-size: 30rpx;
		color: #b4282d;
	}

	.order-goods .item {
		display: flex;
		align-items: center;
		height: 192rpx;
		margin-left: 31.25rpx;
		padding-right: 31.25rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.order-goods .item:last-child {
		border-bottom: none;
	}

	.order-goods .item .img {
		height: 145.83rpx;
		width: 145.83rpx;
		background: #f4f4f4;
	}

	.order-goods .item .img image {
		height: 145.83rpx;
		width: 145.83rpx;
	}

	.order-goods .item .info {
		flex: 1;
		height: 145.83rpx;
		margin-left: 20rpx;
	}

	.order-goods .item .t {
		margin-top: 8rpx;
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10.5rpx;
	}

	.order-goods .item .t .name {
		display: block;
		float: left;
		height: 33rpx;
		line-height: 33rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-goods .item .t .number {
		display: block;
		float: right;
		height: 33rpx;
		text-align: right;
		line-height: 33rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-goods .item .attr {
		height: 29rpx;
		line-height: 39rpx;
		color: #666;
		margin-bottom: 25rpx;
		font-size: 25rpx;
	}

	.order-goods .item .price {
		height: 60rpx;
		line-height: 40rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-bottom {
		margin-top: 20rpx;
		padding-left: 31.25rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.order-bottom .address {
		height: 128rpx;
		padding-top: 25rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.order-bottom .address .t {
		height: 35rpx;
		line-height: 35rpx;
		margin-bottom: 7.5rpx;
	}

	.order-bottom .address .name {
		display: inline-block;
		height: 45rpx;
		width: 140rpx;
		line-height: 45rpx;
		font-size: 40rpx;
	}

	.order-bottom .address .mobile {
		display: inline-block;
		height: 45rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}

	.order-bottom .address .b {
		height: 45rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}

	.order-bottom .total {
		height: 106rpx;
		padding-top: 20rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.order-bottom .total .t {
		height: 45rpx;
		line-height: 45rpx;
		margin-bottom: 7.5rpx;
		display: flex;
	}

	.order-bottom .total .label {
		width: 160rpx;
		display: inline-block;
		height: 45rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}

	.order-bottom .total .txt {
		flex: 1;
		display: inline-block;
		height: 45rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}

	.order-bottom .pay-fee {
		height: 81rpx;
		line-height: 81rpx;
	}

	.order-bottom .pay-fee .label {
		display: inline-block;
		width: 140rpx;
		color: #b4282d;
	}

	.order-bottom .pay-fee .txt {
		display: inline-block;
		width: 140rpx;
		color: #b4282d;
	}

	.btn {
		color: #b4282d;
		border: 1px solid #b4282d;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		padding: 0 35rpx;
		font-size: 26rpx;
		background: none;
		border-radius: 30rpx;
		float: right;
		margin-left: 15rpx;
	}
</style>
