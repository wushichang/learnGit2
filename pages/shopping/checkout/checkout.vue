<template>
	<view>
		<view class="container">
			<view class="address-box">
				<view class="address-item" @click="selectAddress" v-if="checkedAddress.id > 0">
					<view class="l">
						<text class="name">{{checkedAddress.userName}}</text>
						<text class="default" v-if="checkedAddress.defaultFlag === 1">默认</text>
					</view>
					<view class="m">
						<text class="mobile">{{checkedAddress.telNumber}}</text>
						<text class="address">{{checkedAddress.provinceName+checkedAddress.cityName+checkedAddress.areaName+checkedAddress.detailInfo}}</text>
					</view>
					<view class="r">
						<image src="/static/images/address_right.png"></image>
					</view>
				</view>
				<view class="address-item address-empty" @click="addAddress" v-if="!checkedAddress.id">
					<view class="m">
						还没有收货地址，去添加
					</view>
					<view class="r">
						<image src="/static/images/address_right.png"></image>
					</view>
				</view>
			</view>
			<view class="goods-items">
				<view class="item" v-for="item in checkedGoodsList" :key="item.id">
					<view class='proName'>{{item.merchantName || ''}}</view>
					<view class='proBox' v-for='(iindex,iitem) in item.cartList' :key='iitem.id'>
						<view class="img">
							<image :src="iitem.listPicUrl"></image>
						</view>
						<view class="info">
							<view class="t">
								<text class="name">{{iitem.goodsName || ''}}</text>
								<text class="number">x{{iitem.number || 1}}</text>
							</view>
							<view class="m">{{iitem.goodsSpecifitionNameValue||''}}</view>
							<view class="b">￥{{iitem.retailPrice || '0.00'}}</view>
						</view>
					</view>
					<view class="coupon-box" :data-merid="item.merchantId" data-price="item.orderTotalPrice" @click='tapCoupon'>
						<view class="coupon-item">
							<view class="l">
								<text class="name">请选择优惠券</text>
								<text class="txt">{{item.couponName?item.couponName:'不使用优惠卷'}}</text>
							</view>
							<view class="r">
								<image src="/static/images/address_right.png"></image>
							</view>
						</view>
					</view>

					<view class="order-box">
						<view class="order-item">
							<view class="l">
								<text class="name">优惠券</text>
							</view>
							<view class="r">
								<text class="txt">-￥{{item.couponPrice || 0}}</text>
							</view>
						</view>
						<view class="order-item">
							<view class="l">
								<text class="name">运费</text>
							</view>
							<view class="r">
								<text class="txt">￥{{item.freightPrice}}</text>
							</view>
						</view>
						<view class="order-item">
							<view class="l">
								<text class="name">商品合计</text>
							</view>
							<view class="r">
								<text class="txt">￥{{item.actualPrice}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="order-total">
				<view class="l">实付：￥{{actualPrice}}</view>
				<!-- 这个变量是用来干什么的？js部分没有去处理它 -->
				<button class="r" :disabled="isY" @click="submitOrder">去付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');
	var app = getApp();

	export default {
		data() {
			return {
				checkedGoodsList: [],
				checkedAddress: {},
				checkedCoupon: [],
				couponList: [],
				goodsTotalPrice: 0.00, //商品总价
				freightPrice: 0.00, //快递费
				couponPrice: 0.00, //优惠券的价格
				orderTotalPrice: 0.00, //订单总价
				actualPrice: 0.00, //实际需要支付的总价
				addressId: 0,
				couponId: 0,
				buyFlag: false,
				couponDesc: '',
				couponCode: '',
				buyType: '',
				couponIdArr: [],
				item: {},
				type: null,
				groupBuyingId: '',
				activityType: 1
			}
		},
		methods: {
			switch1Change(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},

			getCheckoutInfo() {
				var url = api.CartCheckout
				let buyType = this.buyFlag ? 'detailBuy' : 'cart'
				var sumPrice = 0
				console.log(this.addressId)
				util.request(url, {
					addressId: this.addressId,
					couponId: this.couponId,
					type: buyType,
					activityType: this.activityType
				}).then((res)=> {
					if (res.errno === 0) {
						for (var i = 0; i < res.data.checkedGoodsList.length; i++) {
							var param = res.data.checkedGoodsList[i];
							for (var j = 0; j < this.couponIdArr.length; j++) {
								if (param.merchantId == this.couponIdArr[j].merchantId) {
									param.couponName = this.couponIdArr[j].name;
									param.couponPrice = this.couponIdArr[j].typeMoney;
									sumPrice += this.couponIdArr[j].typeMoney
								}
							}
						}
						this.checkedGoodsList = res.data.checkedGoodsList;
						this.checkedAddress = res.data.checkedAddress;
						this.actualPrice = util.accSub(res.data.actualPrice, sumPrice);
						this.couponPrice = res.data.couponPrice;
						this.freightPrice = res.data.freightPrice;
						this.goodsTotalPrice = res.data.goodsTotalPrice;
						this.orderTotalPrice = res.data.orderTotalPrice;
						//设置默认收获地址
						if (this.checkedAddress) {
							let addressId = this.checkedAddress.id;
							if (addressId) {
								this.addressId = addressId;
							}
						} else {
							uni.showModal({
								title: '',
								content: '请添加默认收货地址!',
								success:(res)=>{
									if (res.confirm) {
										this.selectAddress();
										console.log('用户点击确定')
									}
								}
							})
						}
					}
					uni.hideLoading();
				});
			},
			selectAddress() {
				uni.navigateTo({
					url: '/pages/shopping/address/address'
				})
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/shopping/addressAdd/addressAdd',
				})
			},

			/**
			 * 获取优惠券
			 */
			getCouponData() {
				if (app.globalData.userCoupon == 'USE_COUPON') {
					if (this.couponIdArr.length > 0) {
						for (var i = 0; i < this.couponIdArr.length; i++) {
							if (this.couponIdArr[i].merchantId == app.globalData.courseCouponCode.merchantId) {
								this.couponIdArr.splice(i, 1)
							}
						}
					}
					this.couponIdArr = this.couponIdArr.concat(app.globalData.courseCouponCode);
				} else if (app.globalData.userCoupon == 'NO_USE_COUPON') {
					this.couponDesc = "不使用优惠券";
					this.couponId = 0;
				}
			},

			/**
			 * 选择可用优惠券
			 */
			tapCoupon(e) {
				var merid = e.currentTarget.dataset.merid;
				var price = e.currentTarget.dataset.price;
				uni.navigateTo({
					url: '../selCoupon/selCoupon?buyType=' + this.buyType + '&merid=' + merid + '&price=' + price
				})
			},

			submitOrder() {
				if (this.addressId <= 0) {
					util.showErrorToast('请选择收货地址');
					return false;
				}
				uni.showLoading({
					title: '提交中'
				})
				if (this.couponIdArr.length > 0) {
					this.couponId = '';
					for (var i = 0; i < this.couponIdArr.length; i++) {
						this.couponId += this.couponIdArr[i].userCouponId + ','
					}
				}
				if (this.couponId != "" & this.couponId != null & this.couponId != undefined) {
					if (this.couponId.indexOf(',') > -1) {
						this.couponId = this.couponId.substr(0, this.couponId.length - 1)
					}
				}
				var param = {};

				param.addressId = this.addressId;
				param.promoterId = uni.getStorageSync('userId') || 0;
				param.couponId = this.couponId == 0 ? null : this.couponId;
				param.type = this.buyType;
				param.payType = this.type;
				param.groupBuyingId = this.groupBuyingId;
				console.log("{{}}}}}+++++======:", JSON.stringify(param))
				util.request(api.OrderSubmit, param, 'POST').then(res => {
					uni.hideLoading();
					if (res.errno === 0) {
						const orderId = res.data.orderInfo.id;
						console.log('下单了,下单了,思密达');
						// pay.payOrder(orderId).then(res => {
						// 	wx.redirectTo({
						// 		url: '/pages/payResult/payResult?status=1&orderId=' + orderId
						// 	});
						// }).catch(res => {
						// 	wx.redirectTo({
						// 		url: '/pages/payResult/payResult?status=0&orderId=' + orderId
						// 	});
						// });
					} else {
						util.showErrorToast('下单失败');
					}
				});
			}
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			if (options.buyFlag) {
				this.buyFlag = options.buyFlag;
			}
			if (options.addressId) {
				this.addressId = options.addressId;
			}
			if (options.type) {
				this.type = options.type;
			}
			if (options.groupBuyingId) {
				this.groupBuyingId = options.groupBuyingId;
			}
			if (options.activityType) {
				this.activityType = options.activityType;
			}
			this.buyType = this.buyFlag ? 'detailBuy' : 'cart';
			//每次重新加载界面，清空数据
			app.globalData.userCoupon = 'NO_USE_COUPON';
			app.globalData.courseCouponCode = {};
		},

		onShow() {
			// 页面显示
			this.getCouponData()
			uni.showLoading({
				title: '加载中...',
			})
			this.getCheckoutInfo();
		}

	}
</script>

<style>
	page {
		height: 100%;
		background: #f4f4f4;
	}

	.address-box {
		width: 100%;
		height: 166.55rpx;
		background: url('http://shop.beastiot.com/haoyaoshopvf/icon/address-bg-bd30f2bfeb.png') 0 0 repeat-x;
		background-size: 62.5rpx 10.5rpx;
		margin-bottom: 20rpx;
		padding-top: 10.5rpx;
	}

	.address-item {
		display: flex;
		height: 155.55rpx;
		background: #fff;
		padding: 41.6rpx 0 41.6rpx 31.25rpx;
	}

	.address-item.address-empty {
		line-height: 75rpx;
		text-align: center;
	}

	.address-box .l {
		width: 155rpx;
		height: 100%;
	}

	.address-box .l .name {
		margin-left: 6.25rpx;
		margin-top: -7.25rpx;
		display: block;
		width: 155rpx;
		height: 43rpx;
		line-height: 43rpx;
		font-size: 30rpx;
		color: #333;
		margin-bottom: 5rpx;

	}

	.address-box .l .default {
		margin-left: 6.25rpx;
		display: block;
		width: 62rpx;
		height: 33rpx;
		border-radius: 5rpx;
		border: 1px solid #b4282d;
		font-size: 20.5rpx;
		text-align: center;
		line-height: 29rpx;
		color: #b4282d;
	}

	.address-box .m {
		flex: 1;
		height: 72.25rpx;
		color: #999;
	}

	.address-box .mobile {
		display: block;
		height: 29rpx;
		line-height: 29rpx;
		margin-bottom: 6.25rpx;
		font-size: 30rpx;
		color: #333;
	}

	.address-box .address {
		display: block;
		height: 37.5rpx;
		line-height: 37.5rpx;
		font-size: 25rpx;
		color: #666;
	}

	.address-box .r {
		width: 77rpx;
		height: 77rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-box .r image {
		width: 52.078rpx;
		height: 52.078rpx;
	}

	.coupon-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.coupon-box .coupon-item {
		width: 100%;
		height: 108.3rpx;
		overflow: hidden;
		background: #fff;
		display: flex;
		/* padding-left: 31.25rpx; */
	}

	.coupon-box .l {
		flex: 1;
		height: 43rpx;
		line-height: 43rpx;
		padding-top: 35rpx;
	}

	.coupon-box .l .name {
		float: left;
		font-size: 30rpx;
		color: #666;
	}

	.coupon-box .l .txt {
		float: right;
		font-size: 30rpx;
		color: #666;
	}

	.coupon-box .r {
		margin-top: 15.5rpx;
		width: 77rpx;
		height: 77rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.coupon-box .r image {
		width: 52.078rpx;
		height: 52.078rpx;
	}

	.order-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.order-box .order-item {
		height: 104.3rpx;
		overflow: hidden;
		background: #fff;
		display: flex;
		padding-right: 31.25rpx;
		padding-top: 26rpx;
	}

	.order-box .order-item .l {
		float: left;
		height: 52rpx;
		width: 50%;
		line-height: 52rpx;
		overflow: hidden;
	}

	.order-box .order-item .r {
		float: right;
		text-align: right;
		width: 50%;
		height: 60rpx;
		line-height: 52rpx;
		overflow: hidden;
	}

	.order-box .order-item.no-border {
		border-bottom: none;
	}

	.goods-items {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding-bottom: 220rpx;
	}

	.goods-items .item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background: #fff;
		padding-left: 31.25rpx;
		margin-bottom: 5px;
	}

	.goods-items .item .proName {
		color: #000000;
		font-size: 18px;
		width: 100%;
		text-align: left;
		height: 100rpx;
		line-height: 100rpx;
	}

	.goods-items .item .proBox {
		height: 192rpx;
		width: 100%;
		padding-right: 31.25rpx;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid rgba(0,0,0,0.15); */
	}

	.goods-items .item.no-border {
		border-bottom: none;
	}


	.goods-items .item:last-child {
		border-bottom: none;
	}

	.goods-items .img {
		height: 145.83rpx;
		width: 145.83rpx;
		background-color: #f4f4f4;
		margin-right: 20rpx;
	}

	.goods-items .img image {
		height: 145.83rpx;
		width: 145.83rpx;
	}

	.goods-items .info {
		flex: 1;
		height: 145.83rpx;
		padding-top: 5rpx;
	}

	.goods-items .t {
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		font-size: 30rpx;
		color: #333;
	}

	.goods-items .t .name {
		display: block;
		float: left;
	}

	.goods-items .t .number {
		display: block;
		float: right;
		text-align: right;
	}

	.goods-items .m {
		height: 29rpx;
		overflow: hidden;
		line-height: 29rpx;
		margin-bottom: 25rpx;
		font-size: 25rpx;
		color: #666;
	}

	.goods-items .b {
		height: 41rpx;
		overflow: hidden;
		line-height: 41rpx;
		font-size: 30rpx;
		color: #333;
	}

	.order-total {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		width: 100%;
		display: flex;
	}

	.order-total .l {
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		color: #b4282d;
		background: #fff;
		font-size: 33rpx;
		padding-left: 31.25rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.2);
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);
	}

	.order-total .r {
		width: 233rpx;
		height: 100rpx;
		background: #b4282d;
		border: 1px solid #b4282d;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}

	button {
		border: 1px solid #b4282d;
		border-radius: 0;
		color: #fff;
	}
</style>
