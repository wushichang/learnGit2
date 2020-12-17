<template>
	<view class="container">
		<view class="order_me">
			<view :class="['li' , orderId == -1  ? 'active' : '']" :data-id="-1" @click="switchCate">全部</view>
			<view :class="['li', orderId ==0  ? 'active' : '']" :data-id="0" @click="switchCate">待付款</view>
			<view :class="['li' , orderId ==202  ? 'active' : '']" :data-id="202" @click="switchCate">待分享</view>
			<view :class="['li' , orderId ==201  ? 'active' : '']" :data-id="201" @click="switchCate">待发货</view>
			<view :class="['li' , orderId ==300  ? 'active' : '']" :data-id="300" @click="switchCate">待收货</view>
			<view :class="['li' , orderId ==301  ? 'active' : '']" :data-id="301" @click="switchCate">已完成</view>
			<!-- <view class="li {{ orderId == 101 ? 'active' : ''}}" data-id="101" @click="switchCate">已取消</view> -->
		</view>
		<view class="orders">
			<view class="order" v-for="(item,index) in orderList" :key="item.id">
				<view class="order-goods">
					<navigator :url="'../orderDetail/orderDetail?id='+item.id">

						<view class="h">
							<view class="label">商品信息</view>
							<view class="status" v-if="item.groupBuying!=null && item.groupBuying.types==0 && item.orderStatus<400">还差{{item.groupBuying.successNum-item.groupBuying.groupNum}}人成功拼团</view>
							<view class="status" v-else>{{item.orderStatusText}}</view>
						</view>
						<view class="goods">
							<view class="item">
								<view class="img">
									<image :src="item.listPicUrl"></image>
								</view>
								<view class="info">
									<view class="t">
										<text class="name">{{item.goodsName}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="b">
							<view class="r">共{{item.goodsCount}}件商品 需付款：￥{{item.actualPrice}} </view>
						</view>
					</navigator>
					<view class="b" style="background-color:#fff;">
						<view class="r">
							<!-- <button class="btn gopay" open-type="share" data-type="toParents" id="{{item.listPicUrl}}_{{item.consignee}}_{{index}}"
							 @click="onShareAppMessage" v-if="{{item.groupBuying!=null && item.groupBuying.types==0 && item.orderStatus==202}}">分享拼团</button> -->
							<!-- <button class="btn gopay" open-type="contact">
								<navigator>
									联系客服/售后
								</navigator>
							</button> -->
							<button class="btn gopay" :data-order-index="index" @click.stop="payOrder" v-if="item.handleOption.pay">去付款</button>
							<button class="btn gocancel" :data-order-index="index" @click.stop="cancelOrder" v-if="item.handleOption.cancel">取消订单</button>
							<button class="btn gopay" :data-order-index="index" @click.stop="remindOrder" v-if="item.orderStatus==201">提醒发货</button>
							<button class="btn gopay" :data-order-index="index" @click.stop="confirmOrder" v-if="item.handleOption.confirm">确认收货</button>
							<!-- <button class="btn gopay" data-order-index="{{index}}" catchtap="buyOrder" v-if="{{item.handleOption.buy}}">再次购买</button> -->
							<!-- <button class="btn gopay" data-order-index="{{index}}" catchtap="commentOrder" v-if="{{item.handleOption.comment}}">评价</button> -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="orderList.length>6" class="loadmore">
			<block v-if="nomore">
				<text>{{nomoreText}}</text>
			</block>
			<block v-else>
				<text class="iconfont icon-loading loading" space="nbsp"></text>
				<text> {{loadmoreText}}</text>
			</block>
		</view>

		<view class="empty-view" v-if="orderList.length <= 0">
			<image class="icon" src="/static/images/allorder.png"></image>
			<text class="text">无订单数据</text>
		</view>
	</view>

</template>

<script>
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');

	export default {
		data() {
			return {
				orderId: '',
				orderList: [],
				page: 1,
				size: 4,
				loadmoreText: '正在加载更多数据',
				nomoreText: '全部加载完成',
				nomore: false,
				totalPages: 1,
				currentSortType: 'default',
				currentSortOrder: 'desc'
			}
		},
		methods: {
			switchCate(event) {
				uni.showLoading({
					title: '加载中...'
				});
				var currentTarget = event.currentTarget;
				this.orderId = currentTarget.dataset.id;
				this.totalPages = 1;
				this.page = 1;
				this.orderList = [];
				console.log(this.orderId);
				this.getOrderList();
			},
			getOrderList() {
				if (this.totalPages <= this.page - 1) {
					this.nomore = true;
					return;
				}
				util.request(api.OrderList, {
					page: this.page,
					size: this.size,
					orderStatus: this.orderId == -1 ? "" : this.orderId,
					order: this.currentSortOrder,
					sort: this.currentSortType
				}).then((res)=> {
					if (res.errno === 0) {
						this.orderList = this.orderList.concat(res.data.data);
						this.page = res.data.currentPage + 1;
						this.totalPages = res.data.totalPages;
						uni.hideLoading();
					}
					console.log('刷新完成');
					//uni.hideNavigationBarLoading() //完成停止加载
					//uni.stopPullDownRefresh() //停止下拉刷新
				});
			},
			payOrder(event) {
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let order = this.orderList[orderIndex];
				console.log('去支付');
				uni.redirectTo({
					url: '/pages/pay/pay?orderId=' + order.id + '&actualPrice=' + order.actualPrice,
				})
			},
			remindOrder(event) {
				uni.showToast({
					title: '提醒成功',
					icon: 'succes',
					duration: 1500,
					mask: true
				})
			},
			cancelOrder(event) {
				console.log('开始取消订单');
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let order = this.orderList[orderIndex];
				console.log('可以取消订单的情况');
				uni.showModal({
					title: '',
					content: '确定要取消此订单？',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');

							util.request(api.OrderCancel, {
								orderId: order.id
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
											// uni.navigateBack({
											// 	url: 'pages/ucenter/order/order',
											// });
											console.log('取消订单');
											uni.navigateBack();
										}
									});
								}
							});

						}
					}
				});
			},
			confirmOrder(event) {
				//确认收货
				console.log('开始确认收货');
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let order = this.orderList[orderIndex];
				console.log('可以取消订单的情况');
				uni.showModal({
					title: '',
					content: '确定已经收到商品？',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							util.request(api.OrderConfirm, {
								orderId: order.id
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
											// uni.navigateBack({
											// 	url: 'pages/ucenter/order/order',
											// });
											console.log('确认收货');
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
				let order = this.orderList[orderIndex];
				console.log("------------------")
				console.log(order.goodsId)
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + order.goodsId,
				});
			},
			commentOrder(event) {
				let orderIndex = event.currentTarget.dataset.orderIndex;
				let order = this.orderList[orderIndex];
				uni.navigateTo({
					url: '/pages/commentPost/commentPost?typeId=0&valueId=' + order.goodsId,
				});
			}
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.orderId = options.id || -1;
			uni.showLoading({
				title: '加载中...'
			});
			this.getOrderList();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			console.log('到底了');
			this.getOrderList();
		},
		onPullDownRefresh() {
			// 增加下拉刷新数据的功能
			uni.showNavigationBarLoading();
			this.orderList = [];
			this.page = 1;
			this.totalPages = 1;
			this.getOrderList();
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: #f4f4f4;
	}

	.order_me {
		width: 100%;
		background: #ffffff;
		height: 60rpx;
		line-height: 60rpx;
	}

	.order_me .li {
		float: left;
		width: 16.6%;
		color: #666;
		text-align: center;
	}

	.order_me .li.active {
		border-bottom: 2px solid #b4282d;
		font-size: 17px;
	}

	.orders .b {
		height: 103rpx;
		line-height: 103rpx;
		margin-left: 31.25rpx;
		padding-right: 31.25rpx;
		border-top: 1px solid #f4f4f4;
		font-size: 30rpx;
		color: #333;
	}

	.orders .b .l {
		float: left;
	}

	.orders .b .r {
		float: right;
	}

	.orders .b .btn {
		margin-top: 23rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		padding: 0 35rpx;
		font-size: 26rpx;
		background: none;
		border-radius: 30rpx;
		float: left;
		margin-left: 15rpx;
	}

	.gopay {
		color: #b4282d;
		border: 1px solid #b4282d;
	}

	.gocancel {
		color: #666;
		border: 1px solid #666;
	}

	/* 新加 */
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
		margin-top: 28rpx;
		height: 33rpx;
		line-height: 33rpx;
		/* margin-bottom: 10.5rpx; */
	}

	.order-goods .item .t .name {
		display: block;
		float: left;
		height: 33rpx;
		line-height: 33rpx;
		color: #333;
		font-size: 30rpx;
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
		0% {
			transform: rotate(0deg)
		}

		50% {
			transform: rotate(180deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

	.loading {
		display: inline-block;
		transform-origin: 50% 50%;
		animation: loading 1s linear infinite;
	}

	@font-face {
		font-family: "iconfont";
		src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAWkAAsAAAAACCgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kuaY21hcAAAAYAAAAB6AAAByKkz+SxnbHlmAAAB/AAAAYYAAAGYdRuBnWhlYWQAAAOEAAAALwAAADYQt9FAaGhlYQAAA7QAAAAcAAAAJAfeA4dobXR4AAAD0AAAABMAAAAYF+kAAGxvY2EAAAPkAAAADgAAAA4B4AE4bWF4cAAAA/QAAAAfAAAAIAEVAF1uYW1lAAAEFAAAAUUAAAJtPlT+fXBvc3QAAAVcAAAASAAAAFncWPV6eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sM4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVLxcw9zwv4EhhrmBoQEozAiSAwAxqA0feJzFkbENhTAMRJ8hfCHEKEyCmOeLgp6egilYzFPAOYGCCbjoRbmTFUcx0AC1GEQCWzBCf6WW85ou54lRvqel0nn21Tff/ThPpW/3yFT9rHCV7krR0X58Jvuu9Vt93qfbxRzmGz3R14L+DN8KMSffCzErPwo0FyyDIOcAAHicJY+7SgNREIZnzsleotmNe99sks1lkxwlGjBZEy+YiNgoFoKVYKEPoI2FIBZpBAtBwdJKCWgrKFj4ABbWgoKFFxArWxFZ3ejwNwPffD8DHMDPE72mNmjQD8MwAwsAyJcxL5M05phfIWU0cpxh6TJlHssJXr5CJ9HK87pZrfslixf4OMroYi1XrbMKYTjiN8kEVs00YiLpLKrFlEoPsMdm7k4wR07QyHipeHMomB1s6dWsJm7GVDWhqnsiz3EiIZG4jGuWGeWiPXzQ4eKOcZ0ZIBmMJZgzvyRlk+rqrr+eLlpRxHYbtWRWPm0pjhJm2zE1NSH0SaLtSF5Bx83XXluLpUsvEA6Gv+6TDzoKfLhYAlM8hRgPxcsajTwULr7v6FmXAaBbpN1lisiiKCBuECET2MGni6VlwruBjaIb3P/5DolJ/S7LsYal1BR8vi9c1sZCHfW+V+Dfh29hpwTQqOBIExuGjIJuWjfN6cj7+dEtnayPT3WWrr5kX3o8Xjyohxe/NMZLegAAeJxjYGRgYADi0vZZW+P5bb4ycLMwgMC1M277EPT/fhYGZgsgl4OBCSQKAEcNCx8AeJxjYGRgYG7438AQw8IAAkCSkQEVsAEARwwCb3icY2FgYGB+ycDAwoCKARKfAQEAAAAAAAB2AIgAngCwAMwAAHicY2BkYGBgYwhkYGUAASYg5gJCBob/YD4DABFIAXMAeJxlj01OwzAQhV/6B6QSqqhgh+QFYgEo/RGrblhUavdddN+mTpsqiSPHrdQDcB6OwAk4AtyAO/BIJ5s2lsffvHljTwDc4Acejt8t95E9XDI7cg0XuBeuU38QbpBfhJto41W4Rf1N2MczpsJtdGF5g9e4YvaEd2EPHXwI13CNT+E69S/hBvlbuIk7/Aq30PHqwj7mXle4jUcv9sdWL5xeqeVBxaHJIpM5v4KZXu+Sha3S6pxrW8QmU4OgX0lTnWlb3VPs10PnIhVZk6oJqzpJjMqt2erQBRvn8lGvF4kehCblWGP+tsYCjnEFhSUOjDFCGGSIyujoO1Vm9K+xQ8Jee1Y9zed0WxTU/3OFAQL0z1xTurLSeTpPgT1fG1J1dCtuy56UNJFezUkSskJe1rZUQuoBNmVXjhF6XNGJPyhnSP8ACVpuyAAAAHicY2BigAAuBuyAjZGJkZmRhZGVkY2RnYGxgqsoNSc1sThVt7SAIzk/tyAntSSVs6A0J0c3Jb88jz0nPzElMy+dgQEARPMOmw==') format('woff');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-release-up:before {
		content: "\e987";
	}

	.icon-complete:before {
		content: "\e992";
	}

	.icon-pull-down:before {
		content: "\e996";
	}

	.icon-loading:before {
		content: "\e9ac";
	}
</style>
