<template>
	<scroll-view class="container" :style="[winHeight , zIndexOptions]" scroll-y="true">
		<view v-if="!openAttr">
			<view class='swiBox'>
				<swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
					<swiper-item v-for="item in gallery" :key="item.id">
						<image :src="item.imgUrl" background-size="cover"></image>
					</swiper-item>
				</swiper>
				<view class='flotbox' v-if="type==2">
					<!-- <count-down-list ntype="1" endTime="{{goods.endTime}}" bind:downEnd="aa"></count-down-list> -->
					<count-down-list ntype="1" :endTime="goods.endTime"></count-down-list>
				</view>
				
			</view>
		</view>
	</scroll-view>
</template>

<script>
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');
	
	import countDownList from '../../components/countDownList/countDownList.vue';

	export default {
		components: {
			countDownList
		},
		data() {
			return {
				winHeight: "",
				id: 0,
				userId: 0,
				goods: {},
				gallery: [],
				// attribute: [],
				issueList: [],
				comment: [],
				brand: {},
				specificationList: [],
				productList: [],
				relatedGoods: [],
				groupBuyLis: [],
				newBuyLis: [],
				newGroup: {},
				cartGoodsCount: 0,
				userHasCollect: 0,
				number: 1,
				checkedSpecText: '请选择规格数量',
				checkedSpecPrice: 0,
				yprice: 0,
				proId: 0,
				proImg: '',
				openAttr: false,
				openCoupon: false,
				openGroup: false,
				openPart: false,
				cimPart: true,
				noCollectImage: "/static/images/icon_collect.png",
				hasCollectImage: "/static/images/icon_collect_checked.png",
				collectBackImage: "/static/images/icon_collect.png",
				nowtime: 0,
				type: 0,
				ntype: '',
				groupprice: 0,
				groupNum: 0,
				groupBuyingId: '',
				zIndexOptions: ' '
			}
		},
		methods: {
			getGoodsInfo() {
				util.request(api.GoodsDetail, {
					id: this.id
				}).then((res) => {
					if (res.errno === 0) {
						this.goods = res.data.info;
						this.gallery = res.data.gallery;
						// attribute: res.data.attribute,
						this.issueList = res.data.issue;
						this.comment = res.data.comment;
						this.brand = res.data.brand;
						this.specificationList = res.data.specificationList;
						this.productList = res.data.productList;
						this.userHasCollect = res.data.userHasCollect;
						//设置默认值
						this.setDefSpecInfo(this.specificationList);
						if (res.data.userHasCollect == 1) {
							this.collectBackImage = this.hasCollectImage;
						} else {
							this.collectBackImage = this.noCollectImage;
						}
						console.log("comment====================================", this.comment);
						console.log('wxparse', res.data.info.goodsDesc);
						// WxParse.wxParse('goodsDetail', 'html', res.data.info.goodsDesc, that);
						this.getGoodsRelated();
					}
				});

			},
			setDefSpecInfo(specificationList) {
				//未考虑规格联动情况
				if (!specificationList) return;
				for (let i = 0; i < specificationList.length; i++) {
					let specification = specificationList[i];
					let specNameId = specification.specificationId;
					//规格只有一个时自动选择规格
					if (specification.valueList && specification.valueList.length == 1) {
						let specValueId = specification.valueList[0].id;
						this.clickSkuValue({
							currentTarget: {
								dataset: {
									"nameId": specNameId,
									"valueId": specValueId
								}
							}
						});
					}
				}
				specificationList.map(function(item) {

				});

			},
			clickSkuValue(event) {
				let specNameId = event.currentTarget.dataset.nameId;
				let specValueId = event.currentTarget.dataset.valueId + "";
				let state = event.currentTarget.dataset.state;
				const proImg = event.currentTarget.dataset.picurl;
				// 禁用则结束
				if (state) {
					return;
				}
				//判断是否可以点击

				//TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
				let _specificationList = this.specificationList;
				// console.log("checkedSpecPrice",this.goods.retailPrice);
				for (let i = 0; i < _specificationList.length; i++) {
					if (_specificationList[i].specificationId == specNameId) {
						for (let j = 0; j < _specificationList[i].valueList.length; j++) {
							if (_specificationList[i].valueList[j].id == specValueId) {
								//如果已经选中，则反选
								if (_specificationList[i].valueList[j].checked) {
									_specificationList[i].valueList[j].checked = false;
									// }
									if (_specificationList.length > 1) {
										this.unSelectValue()
									}
								} else {
									_specificationList[i].valueList[j].checked = true;
									if (_specificationList.length > 1) {
										this.selectValue(specValueId, specNameId)
									}
								}
							} else {
								_specificationList[i].valueList[j].checked = false;
							}
						}
					}
				}
				this.proImg = proImg;
				this.specificationList = _specificationList;
				// this.selectValue(specValueId, specNameId)
				//重新计算spec改变后的信息
				this.changeSpecInfo();
				// 新加
				var key = this.getCheckedSpecKey();
				// console.log("key",key);
				// console.log("this.productList",this.productList);
				// console.log("this.type",this.type);
				for (var i = 0; i < this.productList.length; i++) {
					if (this.productList[i].goodsSpecificationIds == key) {
						this.checkedSpecPrice = this.type == '1' ? this.productList[i].groupPrice : this.productList[i].retailPrice;
						this.yprice = this.productList[i].retailPrice;
						this.proId = this.productList[i].id;
					}
				}
			},
			getGoodsRelated() {
				util.request(api.GoodsRelated, {
					id: this.id
				}).then((res) => {
					if (res.errno === 0) {
						this.relatedGoods = res.data.goodsList;
					}
				});

			},
			unSelectValue() {
				var n = 0;
				for (var z = 0; z < this.specificationList.length; z++) {
					for (var y = 0; y < this.specificationList[z].valueList.length; y++) {
						if (this.specificationList[z].valueList[y].checked) {
							n += 1;
							this.selectValue(this.specificationList[z].valueList[y].id + "", this.specificationList[z].valueList[
								y].specificationId + "")
							break;
						}
					}
				}
				if (n == 0) {
					for (var m = 0; m < this.specificationList.length; m++) {
						for (var n = 0; n < this.specificationList[m].valueList.length; n++) {
							this.specificationList[m].valueList[n].state = false
						}
					}
				}
			},

			selectValue(id, specNameId) {
				var newAttrIds = []
				for (var i = 0; i < this.productList.length; i++) {
					var selArr = [];
					if (this.productList[i].goodsSpecificationIds.indexOf('_') > -1) {
						selArr = this.productList[i].goodsSpecificationIds.split('_')
						if (selArr.indexOf(id) > -1) {
							for (var j = 0; j < selArr.length; j++) {
								if (selArr[j] != id) {
									if (newAttrIds.indexOf(selArr[j]) <= -1) {
										newAttrIds.push(selArr[j])
									}
								}
							}
						}
					}
				}
				for (var z = 0; z < this.specificationList.length; z++) {
					for (var y = 0; y < this.specificationList[z].valueList.length; y++) {
						if (this.specificationList[z].specificationId != specNameId) {
							var nid = this.specificationList[z].valueList[y].id + ""
							if (newAttrIds.indexOf(nid) > -1) {
								this.specificationList[z].valueList[y].state = false
							} else {
								this.specificationList[z].valueList[y].state = true
							}
						}
					}
				}
				this.specificationList = this.specificationList;
			},
			changeSpecInfo() {
				let checkedNameValue = this.getCheckedSpecValue();
				let checkedValue = checkedNameValue.filter(function(v) {
					if (v.valueId != 0) {
						return true;
					} else {
						return false;
					}
				}).map(function(v) {
					return v.valueText;
				});
				if (checkedValue.length > 0) {
					this.checkedSpecText = checkedValue.join('　');
				} else {
					this.checkedSpecText = '请选择规格数量';
				}

			},
			getCheckedSpecValue() {
				let checkedValues = [];
				let _specificationList = this.specificationList;
				for (let i = 0; i < _specificationList.length; i++) {
					let _checkedObj = {
						nameId: _specificationList[i].specificationId,
						valueId: 0,
						valueText: ''
					};
					for (let j = 0; j < _specificationList[i].valueList.length; j++) {
						if (_specificationList[i].valueList[j].checked) {
							_checkedObj.valueId = _specificationList[i].valueList[j].id;
							_checkedObj.valueText = _specificationList[i].valueList[j].value;
						}
					}
					checkedValues.push(_checkedObj);
				}
				return checkedValues;
			},
			getCheckedSpecKey() {
				let checkedValue = this.getCheckedSpecValue().map(function(v) {
					return v.valueId;
				});
				return checkedValue.join('_');
			}
		},
		onLoad(options) {
			this.nowtime = new Date().getTime() + 20000;

			if (options.id) {
				this.id = options.id;
			}

			if (options.type) {
				this.type = options.type;
			}

			if (options.userId) {
				uni.setStorageSync('userId', options.userId);
			}

			if (options.q) {
				const q = decodeURIComponent(options.q);
				this.id = util.getQueryString(q, 'id');
				uni.setStorageSync('userId', util.getQueryString(q, 'userId'))
				//又是登陆的事情，暂时不想碰
				//this.newLogin()
			}

			uni.getSystemInfo({
				success: (res) => {
					var clientHeight = res.windowHeight,
						clientWidth = res.windowWidth,
						rpxR = 750 / clientWidth;
					var calc = clientHeight * rpxR - 100;
					this.winHeight = {
						height: calc + 'px'
					}
				}
			});

			this.getGoodsInfo();
		}
	}
</script>

<style>
	.swiBox {
		width: 750rpx;
		height: 750rpx;
		position: relative;
	}

	.goodsimgs {
		width: 750rpx;
		height: 750rpx;
	}

	.swiBox .flotbox {
		position: absolute;
		top: 650rpx;
		right: 0;
		z-index: 1000;
	}

	.goodsimgs image {
		width: 750rpx;
		height: 750rpx;
	}
</style>
