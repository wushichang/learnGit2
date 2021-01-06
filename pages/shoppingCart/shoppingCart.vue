<template>
	<view class="container">
		<view class="cart-view" v-if="cartGoods.length > 0">
			<view class="list">
				<view class="group-item">
					<view class="goods">
						<view :class="['item' ,isEditCart ? 'edit' : '']" v-for="(item,index) in  cartGoods" :key="item.id">
							<view :class="['checkbox' , item.checked ? 'checked' : '']" @click="checkedItem(index)"></view>
							<view class="cart-goods">
								<image class="img" :src="item.listPicUrl"></image>
								<view class="info">
									<view class="t">
										<text class="name">{{item.goodsName}}</text>
										<text class="num">x{{item.number}}</text>
									</view>
									<view class="attr">{{ isEditCart ? '已选择:' : ''}}{{item.goodsSpecifitionNameValue||''}}</view>
									<view class="b">
										<text class="price">￥{{item.retailPrice}}</text>
										<view class="selnum">
											<view class="cut" @click="cutNumber(index)">-</view>
											<input :value="item.number" class="number" disabled="true" type="number" />
											<view class="add" @click="addNumber(index)">+</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cart-bottom">
				<view :class="['checkbox' , checkedAllStatus ? 'checked' : '']" @click="checkedAll">全选({{cartTotal.checkedGoodsCount}})</view>
				<view class="total">{{!isEditCart ? '￥'+cartTotal.checkedGoodsAmount : ''}}</view>
				<view class="delete" @click="editCart">{{!isEditCart ? '编辑' : '完成'}}</view>
				<view class="checkout" @click="deleteCart" v-if="isEditCart">删除所选</view>
				<view class="checkout" @click="checkoutOrder" v-else>下单</view>
			</view>
		</view>
		<view class="no-cart" v-else>
			<view class="c">
				<view class="title-box">
					购物车空空如也～
				</view>
				<view class="to-index-btn" @click="toIndexPage">
					去逛逛
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');

	export default {
		data() {
			return {
				cartGoods: [],
				cartTotal: 0, //购物车商品总数
				checkedAllStatus: true, //全选状态
				isEditCart: false //
			} 
		},
		methods: {
			toIndexPage() {
				console.log('toIndexPage');
			},
			getCartList() {
				util.request(api.CartList).then((res) => {
					if (res.code === 0) {
						this.cartGoods = res.data.cartList;
						this.cartTotal = res.data.cartTotal;
					}
					this.checkedAllStatus = this.isCheckedAll();
				});
			},
			isCheckedAll() {
				//判断购物车商品已全选
				return this.cartGoods.every(function(element, index, array) {
					// 这个是原来的代码，感觉有点啰嗦了
					// if (element.checked == true) {
					// 	return true;
					// } else {
					// 	return false;
					// }
					return element.checked;
				});
			},
			checkedItem(itemIndex) {
				if (!this.isEditCart) {
					util.request(api.CartChecked, {
						productIds: this.cartGoods[itemIndex].productId,
						isChecked: this.cartGoods[itemIndex].checked ? 0 : 1
					},  true ,"POST" , "application/json;charset=UTF-8").then((res) => {
						if (res.code === 0) {
							// console.log(res.data);
							this.cartGoods = res.data.cartList;
							this.cartTotal = res.data.cartTotal;
						}
						this.checkedAllStatus = this.isCheckedAll();
					});
				} else {
					//编辑状态
					let tmpCartData = this.cartGoods.map(function(element, index, array) {
						if (index == itemIndex) {
							element.checked = !element.checked;
						}
						return element;
					});
					this.cartGoods = this.tmpCartData;
					this.checkedAllStatus = this.isCheckedAll();
					this.cartTotal.checkedGoodsCount = this.getCheckedGoodsCount();
				}
			},
			getCheckedGoodsCount() {
				let checkedGoodsCount = 0;
				this.cartGoods.forEach(function(v) {
					if (v.checked) {
						checkedGoodsCount += v.number;
					}
				});
				// console.log(checkedGoodsCount);
				return checkedGoodsCount;
			},
			addNumber(itemIndex) {
				let cartItem = this.cartGoods[itemIndex];
				cartItem.number++;
				this.cartGoods[itemIndex] = cartItem;
				// console.log('cartGoods', this.cartGoods[itemIndex]);
				this.updateCart(cartItem.productId, cartItem.goodsId, cartItem.number, cartItem.id);

			},
			cutNumber(itemIndex) {
				let cartItem = this.cartGoods[itemIndex];
				cartItem.number = cartItem.number > 1 ? cartItem.number - 1 : 1;
				this.cartGoods[itemIndex] = cartItem;
				this.updateCart(cartItem.productId, cartItem.goodsId, cartItem.number, cartItem.id);
			},
			updateCart(productId, goodsId, number, id) {
				util.request(api.CartUpdate, {
					productId: productId,
					goodsId: goodsId,
					number: number,
					id: id
				}, 'POST').then((res) => {
					if (res.code === 0) {
						console.log(res.data);
						//cartGoods: res.data.cartList,
						//cartTotal: res.data.cartTotal
					}
					this.checkedAllStatus = this.isCheckedAll();
				});

			},
			checkedAll() {
				if (!this.isEditCart) {
					var productIds = this.cartGoods.map(function(v) {
						return v.productId;
					});
					util.request(api.CartChecked, {
						productIds: productIds.join(','),
						isChecked: this.isCheckedAll() ? 0 : 1
					},  true ,"POST" , "application/json;charset=UTF-8").then((res) => {
						if (res.code === 0) {
							// console.log(res.data);
							this.cartGoods = res.data.cartList;
							this.cartTotal = res.data.cartTotal;
						}
						this.checkedAllStatus = this.isCheckedAll();
					});
				} else {
					//编辑状态
					let checkedAllStatus = this.isCheckedAll();
					let tmpCartData = this.cartGoods.map(function(v) {
						v.checked = !checkedAllStatus;
						return v;
					});
					this.cartGoods = tmpCartData;
					this.checkedAllStatus = this.isCheckedAll();
					this.cartTotal.checkedGoodsCount = this.getCheckedGoodsCount();
				}
			},
			editCart() {
				if (this.isEditCart) {
					this.getCartList();
					this.isEditCart = !this.isEditCart;
				} else {
					//编辑状态
					let tmpCartList = this.cartGoods.map(function(v) {
						v.checked = false;
						return v;
					});
					this.editCartList = this.cartGoods;
					this.cartGoods = tmpCartList;
					this.isEditCart = !this.isEditCart;
					this.checkedAllStatus = this.isCheckedAll();
					this.cartTotal.checkedGoodsCount = this.getCheckedGoodsCount();
				}

			},
			deleteCart() {
				//获取已选择的商品
				let productIds = this.cartGoods.filter(function(element, index, array) {
					return element.checked;
					// if (element.checked) {
					// 	return true;
					// } else {
					// 	return false;
					// }
				});

				if (productIds.length <= 0) {
					return false;
				}

				productIds = productIds.map(function(element, index, array) {
					if (element.checked) {
						return element.productId;
					}
				});
				util.request(api.CartDelete, {
					productIds: productIds.join(',')
				},  true ,"POST" , "application/json;charset=UTF-8").then((res) => {
					if (res.code === 0) {
						let cartList = res.data.cartList.map(v => {
							v.checked = false;
							return v;
						});
						this.cartGoods = cartList;
						this.cartTotal = res.data.cartTotal;
					}
					this.checkedAllStatus = this.isCheckedAll();
				});
			},
			checkoutOrder() {
				//获取已选择的商品
				var checkedGoods = this.cartGoods.filter(function(element, index, array) {
					// if (element.checked == true) {
					// 	return true;
					// } else {
					// 	return false;
					// }
					return element.checked;
				});

				if (checkedGoods.length <= 0) {
					return false;
				}
				uni.navigateTo({
					url: '../shopping/checkout/checkout'
				})
			}

		},
		onShow() {
			this.getCartList();
		}
	}
</script>

<style>
	page {
		height: 100%;
		min-height: 100%;
		background: #f4f4f4;
	}

	.container {
		background: #f4f4f4;
		width: 100%;
		height: auto;
		min-height: 100%;
		overflow: hidden;
	}

	.service-policy {
		width: 750rpx;
		height: 73rpx;
		background: #f4f4f4;
		padding: 0 31.25rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.service-policy .item {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/servicePolicyRed-518d32d74b.png) 0 center no-repeat;
		background-size: 10rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		color: #666;
	}

	.no-cart {
		width: 100%;
		height: auto;
		margin: 0 auto;
	}

	.no-cart .c {
		width: 100%;
		height: auto;
		margin-top: 200rpx;
	}

	.no-cart .c image {
		margin: 0 auto;
		display: block;
		text-align: center;
		width: 258rpx;
		height: 258rpx;
	}

	.no-cart .c text {
		margin: 0 auto;
		display: block;
		width: 258rpx;
		height: 29rpx;
		line-height: 29rpx;
		text-align: center;
		font-size: 29rpx;
		color: #999;
	}

	.title-box {
		width: 100%;
		padding-top: 330rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/gwc.png) no-repeat center 205rpx;
		background-size: 100rpx auto;
		margin-bottom: 50rpx;
	}

	.to-index-btn {
		color: #fff;
		background: #e64340;
		border-radius: 6px;
		width: 300rpx;
		height: auto;
		line-height: 70rpx;
		text-align: center;
		font-size: 28rpx;
		margin: 0 auto;
		display: block;
	}

	.cart-view {
		width: 100%;
		height: auto;
		overflow: hidden;

	}

	.cart-view .list {
		height: auto;
		width: 100%;
		overflow: hidden;
		margin-bottom: 120rpx;
	}

	.cart-view .group-item {
		height: auto;
		width: 100%;
		background: #fff;
		margin-bottom: 18rpx;
	}

	.cart-view .item {
		height: 164rpx;
		width: 100%;
		overflow: hidden;
	}

	.cart-view .item .checkbox {
		float: left;
		height: 34rpx;
		width: 34rpx;
		margin: 65rpx 18rpx 65rpx 26rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-0e09baa37e.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-view .item .checkbox.checked {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-checked-822e54472a.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-view .item .cart-goods {
		float: left;
		height: 164rpx;
		width: 672rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.cart-view .item .img {
		float: left;
		height: 125rpx;
		width: 125rpx;
		background: #f4f4f4;
		margin: 19.5rpx 18rpx 19.5rpx 0;
	}

	.cart-view .item .info {
		float: left;
		height: 125rpx;
		width: 503rpx;
		margin: 19.5rpx 26rpx 19.5rpx 0;
	}

	.cart-view .item .t {
		margin: 8rpx 0;
		height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}


	.cart-view .item .name {
		height: 28rpx;
		max-width: 310rpx;
		line-height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}

	.cart-view .item .num {
		height: 28rpx;
		line-height: 28rpx;
		float: right;
	}

	.cart-view .item .attr {
		margin-bottom: 17rpx;
		height: 24rpx;
		line-height: 24rpx;
		font-size: 22rpx;
		color: #666;
		overflow: hidden;
	}

	.cart-view .item .b {
		height: 28rpx;
		line-height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}

	.cart-view .item .price {
		float: left;
	}

	.cart-view .item .open {
		height: 28rpx;
		width: 150rpx;
		display: block;
		float: right;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/arrowDown-d48093db25.png) right center no-repeat;
		background-size: 25rpx;
		font-size: 25rpx;
		color: #333;
	}

	.cart-view .item.edit .t {
		display: none;
	}

	.cart-view .item.edit .attr {
		text-align: right;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/arrow-right1-e9828c5b35.png) right center no-repeat;
		padding-right: 25rpx;
		background-size: 12rpx 20rpx;
		margin-bottom: 24rpx;
		height: 39rpx;
		line-height: 39rpx;
		font-size: 24rpx;
		color: #999;
		overflow: hidden;
	}

	.cart-view .item.edit .b {
		display: flex;
		height: 52rpx;
		overflow: hidden;
	}

	.cart-view .item.edit .price {
		line-height: 52rpx;
		height: 52rpx;
		flex: 1;
	}

	.cart-view .item .selnum {
		display: none;
	}

	.cart-view .item.edit .selnum {
		width: 235rpx;
		height: 52rpx;
		border: 1rpx solid #ccc;
		display: flex;
	}

	.selnum .cut {
		width: 70rpx;
		height: 100%;
		text-align: center;
		line-height: 50rpx;
	}

	.selnum .number {
		flex: 1;
		height: 100%;
		text-align: center;
		line-height: 68.75rpx;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		float: left;
	}

	.selnum .add {
		width: 80rpx;
		height: 100%;
		text-align: center;
		line-height: 50rpx;
	}


	.cart-view .group-item .header {
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		padding: 0 26rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.cart-view .promotion .icon {
		display: inline-block;
		height: 24rpx;
		width: 15rpx;
	}

	.cart-view .promotion {
		margin-top: 25.5rpx;
		float: left;
		height: 43rpx;
		width: 480rpx;
		/*margin-right: 84rpx;*/
		line-height: 43rpx;
		font-size: 0;
	}

	.cart-view .promotion .tag {
		border: 1px solid #f48f18;
		height: 37rpx;
		line-height: 31rpx;
		padding: 0 9rpx;
		margin-right: 10rpx;
		color: #f48f18;
		font-size: 24.5rpx;
	}

	.cart-view .promotion .txt {
		height: 43rpx;
		line-height: 43rpx;
		padding-right: 10rpx;
		color: #333;
		font-size: 29rpx;
		overflow: hidden;
	}

	.cart-view .get {
		margin-top: 18rpx;
		float: right;
		height: 58rpx;
		padding-left: 14rpx;
		border-left: 1px solid #d9d9d9;
		line-height: 58rpx;
		font-size: 29rpx;
		color: #333;
	}

	.cart-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100rpx;
		width: 100%;
		background: #fff;
		display: flex;
	}

	.cart-bottom .checkbox {
		height: 34rpx;

		padding-left: 60rpx;
		line-height: 34rpx;
		margin: 33rpx 18rpx 33rpx 26rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-0e09baa37e.png) no-repeat;
		background-size: 34rpx;
		font-size: 29rpx;
	}

	.cart-bottom .checkbox.checked {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-checked-822e54472a.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-bottom .total {
		height: 34rpx;
		flex: 1;
		margin: 33rpx 10rpx;
		font-size: 29rpx;
	}


	.cart-bottom .delete {
		height: 34rpx;
		width: auto;
		margin: 33rpx 18rpx;
		font-size: 29rpx;
	}

	.cart-bottom .checkout {
		height: 100rpx;
		width: 210rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 29rpx;
		background: #b4282d;
		color: #fff;
	}
</style>
