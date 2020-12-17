<template>
	<view>
		<scroll-view class="container" :style="[winHeight , zIndexOptions]" scroll-y="true">
			<view v-if="!openAttr">
				<view class='swiBox'>
					<swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
						<swiper-item v-for="item in gallery" :key="item.id">
							<image :src="item.imgUrl" background-size="cover" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
					<view class='flotbox' v-if="type==2">
						<!-- <count-down-list ntype="1" endTime="{{goods.endTime}}" bind:downEnd="aa"></count-down-list> -->
						<count-down-list ntype="1" :endTime="goods.endTime+''"></count-down-list>
					</view>
				</view>

				<view class="goods-info">
					<view class="c">
						<view class="tx price">
							<text class='pri dzprice'>￥{{type==1?goods.groupPrice ||'0.00':goods.retailPrice || '0.00'}}</text>
							<text class='pri yjprice'>原价：￥{{type==1?goods.retailPrice ||'0.00':goods.marketPrice || '0.00'}}</text>
							<text class='pri brokerage'>佣金：￥{{goods.userBrokeragePrice || '0.00'}}</text>
							<!-- 分享暂时不搞，因为不会 -->
							<!-- <button open-type="share" class='icon_fx'></button> -->
						</view>
						<view class="tx tsbox">
							<text class="name">{{goods.name || ''}}</text>
						</view>
						<text class="tx desc" v-if="goods.goodsBrief">{{goods.goodsBrief}}</text>
						<view class="brand" v-if="brand && brand.name">
							<navigator :url="'../brandDetail/brandDetail?id='+brand.id">
								<text>{{brand.name}}</text>
							</navigator>
						</view>
					</view>
				</view>

				<view class="section-nav section-attr" @click="switchAttrPop">
					<view class="t">请选择规格数量</view>
					<image class="i" src="../../static/images/address_right.png" background-size="cover"></image>
				</view>
				<view class="section-nav section-attr" @click="openCouponMethod">
					<view class="t">优惠 领劵</view>
					<image class="i" src="../../static/images/address_right.png" background-size="cover"></image>
				</view>

				<view class='groupBox' v-if="type==1&newBuyLis.length>0">
					<view class="section-nav section-attr" style='margin-bottom:0'>
						<view class="t">{{groupNum}}人在拼团，可直接参与</view>
						<view class='p' @click='openGroupMethod'>
							<label>更多拼团</label>
							<image class="i" src="../../static/images/address_right.png" background-size="cover"></image>
						</view>
					</view>
					<swiper style='height:360rpx' class="ptlist" autoplay="true" vertical="true" interval="3000" duration="1000">
						<swiper-item v-for="(item,index) in newBuyLis" :key="item.id">
							<view class='swili'>
								<view class='proli' v-for="(iitem,iindex) in item" :key="iittem.id">
									<view class='left'>
										<image :src="iitem.groupBuyingDetailedList[0].userImg"></image>
										<label>{{iitem.groupBuyingDetailedList[0].userName}}</label>
									</view>
									<view class='right'>
										<view class="info">
											<label>还差{{iitem.successNum-iitem.groupNum}}人拼团</label>
											<count-down-list :endTime="iitem.endTime"></count-down-list>
										</view>
										<view class='gopt'>
											<button @click="openPartMethod(item)">去拼团</button>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view class="comments" v-if="comment.count > 0">
					<view class="h">
						<navigator :url="'../comment/comment?typeId=0&valueId='+goods.id">
							<text class="t">评价({{comment.count > 999 ? '999+' : comment.count}})</text>
							<text class="i">查看全部</text>
						</navigator>
					</view>
					<view class="b">
						<view class="item">
							<view class="info">
								<view class="user">
									<image :src="comment.data.avatar"></image>
									<text>{{comment.data.nickname}}</text>
								</view>
								<view class="time">{{comment.data.addTime}}</view>
							</view>
							<view class="content">
								{{comment.data.content}}
							</view>
							<view class="imgs" v-if="comment.data.picList && comment.data.picList.length > 0">
								<image class="img" v-for="item in comment.data.picList" :key="item.id" :src="item.picUrl"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="goods-attr">
					<view class="t">商品详情</view>
					<!-- <view class="l">
				        <view class="item" wx:for="{{attribute}}" wx:key="{{item.name}}">
				          <text class="left">{{item.name}}</text>
				          <text class="right">{{item.value}}</text>
				        </view>
				      </view> -->
				</view>

				<view class="detail">
					<view v-html="goodsDesc"></view>
					<!-- <import src="../../lib/wxParse/wxParse.wxml" />
					<template is="wxParse" data="{{wxParseData:goodsDetail.nodes}}" /> -->
				</view>


				<view class="common-problem" v-if="issueList.length>0">
					<view class="h">
						<view class="line"></view>
						<text class="title">常见问题</text>
					</view>
					<view class="b">
						<view class="item" v-for="item in issueList" :key="item.id">
							<view class="question-box">
								<text class="spot"></text>
								<text class="question">{{item.question}}</text>
							</view>
							<view class="answer">
								{{item.answer}}
							</view>
						</view>
					</view>
				</view>

				<view class="related-goods" v-if="relatedGoods.length > 0">
					<view class="h">
						<view class="line"></view>
						<text class="title">大家都在看</text>
					</view>
					<view class="b">
						<view class="item" v-for="item in relatedGoods" :key="item.id">
							<navigator :url="'/pages/goods/goods?id='+item.id">
								<image class="img" :src="item.listPicUrl" background-size="cover"></image>
								<text class="name">{{item.name}}</text>
								<!-- <text class="price">￥{{item.retailPrice}}</text> -->
								<view class="pricen">
									<text class='pri dzpricen'>￥{{item.retailPrice}}</text>
									<text class='pri yjpricen' v-if="item.marketPrice">￥{{item.marketPrice}}</text></view>
							</navigator>
						</view>
					</view>
				</view>

			</view>

			<view v-if="openAttr" class="attr-pop">
				<view class="img-info">
					<image class="img" :src="proImg?proImg:goods.listPicUrl"></image>
					<view class="info">
						<view class="c">
							<view class="p">{{goods.name}}</view>
							<view class="p">价格：￥{{checkedSpecPrice?checkedSpecPrice:goods.retailPrice}}</view>
							<view class="a" v-if="productList.length>0">已选择：{{checkedSpecText}}</view>
						</view>
					</view>
				</view>
				<view class="spec-con">
					<view class="spec-item" v-for="item in specificationList" :key="item.specificationId">
						<view class="name">{{item.specificationName}}</view>
						<view class="values">
							<view :class="['value' , vitem.checked ? 'selected' : '',vitem.state ? 'attr_value_disabled' : '']" @click="clickSkuValue"
							 v-for="vitem in item.valueList" :key="vitem.id" :data-value-id="vitem.id" :data-picurl="vitem.picUrl"
							 :data-state="vitem.state" :data-name-id="vitem.specificationId">{{vitem.value}}</view>
						</view>
					</view>
					<view class="number-item">
						<view class="name">数量</view>
						<view class="selnum">
							<view class="cut" @click="cutNumber">-</view>
							<input :value="number" class="number" disabled="true" type="number" />
							<view class="add" @click="addNumber">+</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 优惠卷 -->
			<view class='coupon' v-if="openCoupon" @click='colseCoupon'>
				<scroll-view class="couponBox" scroll-y="true">
					<view class='tit'>领取优惠卷</view>
					<view class='couponInfo'>
						<view class='conLi' v-for="item in merCoupon" @click.stop='takeCoupon' :key='item.id'>
							<view class='left'>
								<text class='price'>¥{{item.typeMoney}}</text>
								<text>订单满¥{{item.minGoodsAmount}}使用</text>
								<text>使用时间：{{item.sendStartDate}}～{{item.sendEndDate}}</text>
							</view>
							<view class='right'>
								<text :data-couponId="item.id">立即领取</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 更多团购 -->
			<view class='groupTeam' v-if="openGroup" @click='colseGroup'>
				<view class='groupInfo'>
					<view class='tit'>正在拼团</view>
					<scroll-view class='groupInfo_n' scroll-y="true">
						<view class='proli' v-for="(item,index) in groupBuyList" :key="index">
							<view class='left'>
								<image :src="item.groupBuyingDetailedList[0].userImg"></image>
								<label>{{item.groupBuyingDetailedList[0].userName}}</label>
							</view>
							<view class='right'>
								<view class="info">
									<label>还差{{item.successNum-item.groupNum}}人拼团</label>
									<count-down-list :endTime="item.endTime" @downEnd="backfun"></count-down-list>
								</view>
								<view class='gopt'>
									<button @click="openPartMethod(item)">去拼团</button>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>



			<!-- 参团的人 -->
			<view class='partIn' v-if="openPart" @click='colsePart'>
				<view class='partInfo'>
					<label>参与{{newGroup.groupBuyingDetailedList[0].userName}}的拼单</label>
					<view class='a'>仅剩{{newGroup.successNum-newGroup.groupNum}}个名额，
						<count-down-list ntype="2" :endTime="newGroup.endTime" @downEnd="backfun"></count-down-list>
					</view>
					<view class='b'>
						<view class='img' v-for="(item,index) in newGroup.groupBuyingDetailedList" :key="index">
							<label v-if="index==0">团长</label>
							<image :src="item.userImg"></image>
						</view>
						<!-- 此处循环key已做更改 -->
						<text class='n' v-for="(iitem,iindex) in newGroup.successNum-newGroup.groupNum" :key="iindex">?</text>
					</view>
					<button class='c' @click='cimPartMethod'>参与拼团</button>
				</view>
			</view>


		</scroll-view>


		<view class="bottom-btn" v-if="cimPart">
			<view class="l l-collect homeBox" @click="goUrl">
				<image class="icon" src="../../static/images/ic_menu_choice_nor.png"></image>
				<text>首页</text>
			</view>
			<view :class="['l', 'l-collect', openAttr ? 'back' : '']" @click="closeAttrOrCollect">
				<image class="icon" :src="collectBackImage"></image>
			</view>
			<view class="l l-cart" v-if="type!=1&type!=2">
				<view class="box">
					<text class="cart-count">{{cartGoodsCount}}</text>
					<image @click="openCartPage" class="icon" src="/static/images/ic_menu_shoping_nor.png"></image>

				</view>
			</view>
			<button :class="type==2?'r':'c'" data-ntype="2" v-if="type==0 || type==2" :disabled="isY" @click="buyGoods">{{type==2?'立即秒杀':'立即购买'}}</button>
			<button class="c" data-activitytype="1" :disabled="isY" v-if="type==1" @click="buyGoods">单独购买¥{{yprice || goods.retailPrice}}</button>
			<button class="r" v-if="type==0" @click="addToCart">加入购物车</button>
			<button class="r" data-activitytype="2" :data-groupBuyingId="groupBuyingId" data-ntype="1" v-if="type==1" @click="buyGoods">发起拼团¥{{checkedSpecPrice || goods.groupPrice}}</button>
		</view>
		<view class="bottom-btn" v-else>
			<button class="r" data-activitytype="2" :data-groupBuyingId="groupBuyingId" data-ntype="1" @click="buyGoods">确定</button>
		</view>



	</view>

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
				zIndexOptions: ' ',
				merCoupon: [],
				goodsDesc: '',
				isYJ: false,
				isY: false
			}
		},
		methods: {
			backfun(e) {
				console.log("---===---=:", e)
				if (e.success) {
					this.getGroupBuyList();
				}
			},
			openCouponMethod() {
				this.openCoupon = true;
				this.zIndexOptions = {
					'position': "absolute",
					'z-index': 999
				};
				this.getCouponList();
			},
			colseCoupon() {
				this.openCoupon = false;
				this.zIndexOptions = '';
			},
			openGroupMethod() {
				this.openGroup = true;
				this.getCouponList();
			},
			colseGroup() {
				this.openGroup = false;
			},
			cimPartMethod() {
				if (this.openAttr == false) {
					//打开规格选择窗口
					this.openAttr = !this.openAttr;
					this.collectBackImage = "/static/images/detail_back.png";
				}
				this.cimPart = false;
			},
			openPartMethod(model) {
				this.newGroup = model;
				this.groupBuyingId = model.groupBuyingDetailedList[0].groupBuyingId;
				this.openPart = true;
			},
			colsePart() {
				this.openPart = false;
			},
			getCouponList() {
				util.request(api.CouponListByMer, {
					merchantId: this.goods.merchantId
				}, "POST").then((res) => {
					if (res.errno === 0) {
						this.merCoupon = res.data;
						//console.log('couponList',this.merCoupon);
					}
				});
			},
			getGroupBuyList() {
				util.request(api.GroupBuyList, {
					goodsId: this.id
				}, "POST").then((res) => {
					if (res.errno === 0) {
						var items = res.data.groupBuyingEntityList;
						var arr = [];
						var num = Math.ceil(items.length / 2)
						console.log('--------,------:', num);
						for (var j = 0; j < num; j++) {
							var str = [];
							for (var i = 0; i < items.length; i++) {
								if (str.length < 2) {
									if (items[i + j * 2]) {
										str.push(items[i + j * 2]);
									}
								}
							}
							arr.push(str);
						}
						console.log('----------www---------:', arr);
						this.groupBuyList = res.data.groupBuyingEntityList;
						this.groupNum = res.data.groupNum;
						this.newBuyLis = arr;
					}
				});
			},
			addShareGoods() {
				const param = {};
				param.goodsId = this.goods.id;
				param.name = this.goods.name;
				param.goodsBrief = this.goods.goodsBrief || '';
				param.retailPrice = this.goods.retailPrice;
				param.marketPrice = this.goods.marketPrice;
				param.primaryPicUrl = this.goods.primaryPicUrl;
				//console.log("------ffff:", JSON.stringify(param))
				util.request(api.InsShareGoods, param, "POST", 'application/x-www-form-urlencoded').then((res) => {
					//console.log("------rrrrr:", res)
					if (res.errno === 0) {
						//console.log("------chenggong")
					}
				});
			},
			takeCoupon(e) {
				util.request(api.TakeMerCoupon, {
					id: e.target.dataset.couponid
				}, "POST").then((res) => {
					if (res.errno === 0) {
						uni.showToast({
							title: '领取成功',
							icon: 'none',
							duration: 2000
						})
					} else {
						wx.showToast({
							title: res.errmsg,
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
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
						//WxParse.wxParse('goodsDetail', 'html', res.data.info.goodsDesc, that);
						// console.log('res.data.info.goodsDesc',res.data.info.goodsDesc);
						this.goodsDesc = res.data.info.goodsDesc.replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&ge;/g,'≥');
						this.getGoodsRelated();
					}
				});

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
			//选中
			selectValue(id, specNameId) {
				var newAttrIds = [];
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
			},
			//取消选择
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
			//获取选中的规格信息
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
			//根据已选的值，计算其它值的状态
			setSpecValueStatus() {

			},
			//判断规格是否选择完整
			isCheckedAllSpec() {
				return !this.getCheckedSpecValue().some(function(v) {
					if (v.valueId == 0) {
						return true;
					}
				});
			},
			getCheckedSpecKey() {
				let checkedValue = this.getCheckedSpecValue().map(function(v) {
					return v.valueId;
				});
				return checkedValue.join('_');
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
			getCheckedProductItem(key) {
				// console.log('---------00--------00----:', this.productList)
				return this.productList.filter(function(v) {
					if (v.goodsSpecificationIds == key) {
						return true;
					} else {
						return false;
					}
				});
			},
			cartGoodsCountMethod() {
				util.request(api.CartGoodsCount).then((res) => {
					if (res.errno === 0) {
						this.cartGoodsCount = res.data.cartTotal.goodsCount;
					}
				});
			},
			switchAttrPop() {
				if (this.openAttr == false) {
					this.openAttr = !this.openAttr;
					this.collectBackImage = "/static/images/detail_back.png";
				}
			},
			goUrl() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			closeAttrOrCollect() {
				if (this.openAttr) {
					this.openAttr = false;
					if (this.userHasCollect == 1) {
						this.collectBackImage = this.hasCollectImage;
					} else {
						this.collectBackImage = this.noCollectImage;
					}
				} else {
					//添加或是取消收藏
					util.request(api.CollectAddOrDelete, {
							typeId: 0,
							valueId: this.id,
							listPicUrl: this.goods.listPicUrl,
							name: this.goods.name,
							goodsBrief: this.goods.goodsBrief,
							retailPrice: this.goods.retailPrice
						}, "POST")
						.then((res) => {
							let _res = res;
							if (_res.errno == 0) {
								if (_res.data.type == 'add') {
									this.collectBackImage = this.hasCollectImage;
								} else {
									this.collectBackImage = this.noCollectImage;
								}
							} else {
								uni.showToast({
									image: '/static/images/icon_error.png',
									title: _res.errmsg,
									mask: true
								});
							}

						});
				}

			},
			openCartPage() {
				uni.switchTab({
					url: '/pages/shoppingCart/shoppingCart'
				});
			},

			/**
			 * 直接购买
			 */
			buyGoods(e) {
				var ntype = e.target.dataset.ntype || ''
				var activityType = e.target.dataset.activitytype || '';
				var groupBuyingId = e.target.dataset.groupbuyingid || '';
				this.groupBuyingId = groupBuyingId;
				//console.log('ntype='+ntype,'activityType='+activityType,'groupBuyingId='+groupBuyingId);
				if (this.openAttr == false) {
					//打开规格选择窗口
					this.openAttr = !this.openAttr;
					this.collectBackImage = "/static/images/detail_back.png";
				} else {
					uni.showLoading({
						title: '提交中',
					})
					uni.setStorageSync('isYJ', this.isYJ);
					//提示选择完整规格
					if (!this.isCheckedAllSpec()) {
						uni.showToast({
							title: '请选择完整规格'
						});
						return false;
					}

					//根据选中的规格，判断是否有对应的sku信息
					let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
					if (this.getCheckedSpecKey() != "") {
						if (!checkedProduct || checkedProduct.length <= 0) {
							//找不到对应的product信息，提示没有库存
							uni.showToast({
								title: '库存不足'
							});
							return false;
						}
					} else {
						if (this.goods.goodsNumber < this.number) {
							uni.showToast({
								title: '库存不足'
							});
							return false;
						}
					}
					//console.log("proId:",this.proId);
					//console.log("this.productList[0].id:",this.productList[0].id);
					// 直接购买商品
					util.request(api.BuyAdd, {
						goodsId: this.goods.id,
						number: this.number,
						name: this.goods.name,
						productId: this.proId ? this.proId : this.productList[0].id
					}, "POST").then((res) => {
						uni.hideLoading();
						let _res = res;
						if (_res.errno == 0) {
							uni.openAttr = !this.openAttr;
							uni.navigateTo({
								url: '/pages/shopping/checkout/checkout?buyFlag=true&type=' + ntype + '&groupBuyingId=' + groupBuyingId +
									'&activityType=' + activityType
							})
						} else {
							uni.showToast({
								image: '/static/images/icon_error.png',
								title: _res.errmsg,
								mask: true
							});
						}
					});
				}
			},

			/**
			 * 添加到购物车
			 */
			addToCart() {
				if (this.openAttr == false) {
					//打开规格选择窗口
					this.openAttr = !this.openAttr;
					this.collectBackImage = "/static/images/detail_back.png";
				} else {
					uni.showLoading({
						title: '提交中'
					})
					uni.setStorageSync('isYJ', this.isYJ);
					//提示选择完整规格
					if (!this.isCheckedAllSpec()) {
						uni.showToast({
							title: '请选择完整规格'
						});
						return false;
					}
					//根据选中的规格，判断是否有对应的sku信息
					let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
					if (this.getCheckedSpecKey() != "") {
						if (!checkedProduct || checkedProduct.length <= 0) {
							//找不到对应的product信息，提示没有库存
							uni.showToast({
								title: '库存不足'
							});
							return false;
						}
					} else {
						if (this.goods.goodsNumber < this.number) {
							uni.showToast({
								title: '库存不足'
							});
							return false;
						}
					}

					//添加到购物车
					util.request(api.CartAdd, {
							goodsId: this.goods.id,
							number: this.number,
							productId: this.proId ? this.proId : this.productList[0].id
						}, "POST")
						.then((res) => {
							uni.hideLoading();
							let _res = res;
							if (_res.errno == 0) {
								uni.showToast({
									title: '添加成功'
								});
								this.openAttr = !this.openAttr;
								this.cartGoodsCount = _res.data.cartTotal.goodsCount;
								if (this.userHasCollect == 1) {
									this.collectBackImage = this.hasCollectImage;
								} else {
									this.collectBackImage = this.noCollectImage;
								}
							} else {
								uni.showToast({
									image: '/static/images/icon_error.png',
									title: _res.errmsg,
									mask: true
								});
							}

						});
				}

			},
			cutNumber() {
				this.number = (this.number - 1 > 1) ? this.number - 1 : 1;
			},
			addNumber() {
				this.number = this.number + 1;
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
			//这个方法暂时不管
			// newLogin() {
			// 	//重新登陆
			// 	const token = wx.getStorageSync('token');
			// 	if (!token) {
			// 		wx.getSetting({
			// 			success(res) {
			// 				if (res.authSetting['scope.userInfo']) {
			// 					wx.getUserInfo({
			// 						success(res) {
			// 							//用户按了允许授权按钮
			// 							user.loginByWeixin(res).then(res => {
			// 								let userInfo = wx.getStorageSync('userInfo');
			// 								app.globalData.userInfo = userInfo.userInfo;
			// 								app.globalData.token = res.data.openid;
			// 								that.cartGoodsCount();
			// 							}).catch((err) => {
			// 								console.log(err)
			// 							});
			// 						}
			// 					})
			// 				} else {
			// 					wx.showModal({
			// 						title: '警告通知',
			// 						content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
			// 						success(res) {
			// 							if (res.confirm) {
			// 								wx.openSetting({
			// 									success: (res) => {
			// 										if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
			// 											user.loginByWeixin(e.detail).then(res => {
			// 												let userInfo = wx.getStorageSync('userInfo');
			// 												this.setData({
			// 													userInfo: userInfo.userInfo
			// 												});
			// 												app.globalData.userInfo = userInfo.userInfo;
			// 												app.globalData.token = res.data.openid;
			// 												that.cartGoodsCount();
			// 											}).catch((err) => {
			// 												console.log(err)
			// 											});
			// 										}
			// 									}
			// 								})
			// 							}
			// 						}
			// 					});
			// 				}
			// 			}
			// 		})
			// 	}
			// }
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
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
				uni.setStorageSync('userId', util.getQueryString(q, 'userId'));
				//登陆的问题暂时先不管
				//this.newLogin();
			}

			this.getGoodsInfo();

			//  高度自适应
			uni.getSystemInfo({
				success: (res) => {
					var clientHeight = res.windowHeight,
						clientWidth = res.windowWidth,
						rpxR = 750 / clientWidth;
					var calc = clientHeight * rpxR - 100;
					this.winHeight = {
						height: calc + 'rpx'
					};
				}
			});
		},
		onShow() {
			//此处看还有没有登陆信息，有点不想管这个
			// let token = uni.getStorageSync('token');
			// if (!token) {
			// 	uni.redirectTo({
			// 		url: '../customer/zcuslist/zcuslist?id=' + this.id + '&type=' + this.type
			// 	})
			// 	return false;
			// }
			this.getGoodsInfo();
			this.cartGoodsCountMethod();
			this.getCouponList();
			this.getGroupBuyList();
		}
	}
</script>

<style>
	
	image,img {
	    width: 750rpx;
	    height: 750rpx;
	}
	
	.container {
		/* margin-bottom: 100rpx; */
	}

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

	.allcheck {
		display: inline-block;
		margin: 20rpx 0;
		font-size: 14px;
		margin-left: 20rpx;
	}

	.newBox {
		margin-top: 20rpx;
	}

	.mleft {
		margin-left: 20rpx;
	}

	.goods-info {
		width: 100%;
		/* height: 306rpx; */
		overflow: hidden;
		background: #fff;
	}

	.goods-info .c {
		display: block;
		width: 100%;
		height: 100%;
		/* padding-left: 31.25rpx; */
		/* margin-left: 31.25rpx; */
		/* padding: 20rpx 31.25rpx 20rpx 0; */
		border-bottom: 1px solid #f4f4f4;
	}

	.goods-info .c .tx {
		display: block;
		padding-left: 31.25rpx;
	}

	.goods-info .c .tsbox {
		width: 710rpx;
		margin-top: 20rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.goods-info .price {
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.goods-info .price .pri {
		float: left;
	}

	.goods-info .dzprice {
		font-size: 40rpx;
		color: #b4282d;
		font-weight: bold;
	}

	.goods-info .yjprice {
		margin-left: 20rpx;
		text-decoration: line-through;
	}

	.goods-info .brokerage {
		margin-left: 30rpx;
		color: #E96900;
	}

	.pricen {
		height: 40rpx;
	}

	.dzpricen {
		color: #b4282d;
	}

	.yjpricen {
		margin-left: 20rpx;
		text-decoration: line-through;
	}


	.goods-info .name {
		margin-bottom: 5.208rpx;
		font-size: 30rpx;
		font-weight: bold;
	}

	.goods-info .desc {
		height: 50rpx;
		/* margin-bottom: 41rpx; */
		font-size: 24rpx;
		line-height: 50rpx;
		color: #999;
	}

	.goods-info .brand {
		margin: 23rpx 0;
		min-height: 40rpx;
		text-align: left;
		margin-left: 30rpx;
	}

	.goods-info .brand text {
		display: inline-block;
		width: auto;
		padding: 2px 30rpx 2px 10.5rpx;
		line-height: 35.5rpx;
		border: 1px solid #f48f18;
		font-size: 25rpx;
		color: #f48f18;
		border-radius: 4px;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/detailTagArrow-18bee52dab.png) 95% center no-repeat;
		background-size: 10.75rpx 18.75rpx;
	}

	.section-nav {
		width: 750rpx;
		height: 108rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.section-nav .t {
		float: left;
		width: 500rpx;
		height: 108rpx;
		line-height: 108rpx;
		font-size: 29rpx;
		color: #333;
		margin-left: 31.25rpx;
	}

	.section-nav .p {
		float: right;
		width: 190rpx;
	}

	.section-nav .p label {
		line-height: 108rpx;
		text-align: right;
	}

	.section-nav .i {
		float: right;
		width: 52rpx;
		height: 52rpx;
		margin-right: 16rpx;
		margin-top: 28rpx;
	}

	.section-act .t {
		float: left;
		display: flex;
		align-items: center;
		width: 600rpx;
		height: 108rpx;
		overflow: hidden;
		line-height: 108rpx;
		font-size: 29rpx;
		color: #999;
		margin-left: 31.25rpx;
	}

	.section-act .label {
		color: #999;
	}

	.section-act .tag {
		display: flex;
		align-items: center;
		padding: 0 10rpx;
		border-radius: 3px;
		height: 37rpx;
		width: auto;
		color: #f48f18;
		overflow: hidden;
		border: 1px solid #f48f18;
		font-size: 25rpx;
		margin: 0 10rpx;
	}

	.section-act .text {
		display: flex;
		align-items: center;
		height: 37rpx;
		width: auto;
		overflow: hidden;
		color: #f48f18;
		font-size: 29rpx;
	}

	.groupBox {
		height: 500rpx;
		width: 750rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.groupBox .ptlist .swili {
		width: 100%;
		height: 400rpx;
	}

	.groupBox .ptlist .proli {
		padding: 0 20rpx;
		height: 180rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.groupBox .ptlist .proli .left,
	.groupBox .ptlist .proli .right {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.groupBox .ptlist .proli .left image {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		background: #ccc;
		margin-right: 20rpx;
	}

	.groupBox .ptlist .proli .right .info {
		width: 220rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}

	.groupBox .ptlist .proli .right .gopt {
		width: 160rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.groupBox .ptlist .proli .right .gopt button {
		font-size: 13px;
		color: #fff;
		background: #b4282d;
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
	}

	.comments {
		width: 100%;
		height: auto;
		padding-left: 30rpx;
		background: #fff;
		margin: 20rpx 0;
	}

	.comments .h {
		height: 102.5rpx;
		line-height: 100.5rpx;
		width: 718.75rpx;
		padding-right: 16rpx;
		border-bottom: 1px solid #d9d9d9;
	}

	.comments .h .t {
		display: block;
		float: left;
		width: 50%;
		font-size: 38.5rpx;
		color: #333;
	}

	.comments .h .i {
		display: block;
		float: right;
		width: 164rpx;
		height: 100.5rpx;
		line-height: 100.5rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/address-right-990628faa7.png) right center no-repeat;
		background-size: 52rpx;
	}

	.comments .b {
		height: auto;
		width: 720rpx;
	}

	.comments .item {
		height: auto;
		width: 720rpx;
		overflow: hidden;
	}

	.comments .info {
		height: 127rpx;
		width: 100%;
		padding: 33rpx 0 27rpx 0;
	}

	.comments .user {
		float: left;
		width: auto;
		height: 67rpx;
		/* line-height: 67rpx; */
		font-size: 0;
	}

	.comments .user image {
		float: left;
		width: 67rpx;
		height: 67rpx;
		margin-right: 17rpx;
		border-radius: 50%;
	}

	.comments .user text {
		display: inline-block;
		width: auto;
		height: 66rpx;
		overflow: hidden;
		font-size: 29rpx;
		line-height: 66rpx;
	}

	.comments .time {
		display: block;
		float: right;
		width: auto;
		height: 67rpx;
		line-height: 67rpx;
		color: #7f7f7f;
		font-size: 25rpx;
		margin-right: 30rpx;
	}

	.comments .content {
		width: 720rpx;
		padding-right: 30rpx;
		line-height: 45.8rpx;
		font-size: 29rpx;
		margin-bottom: 24rpx;
	}

	.comments .imgs {
		width: 720rpx;
		height: auto;
		margin-bottom: 25rpx;
	}

	.comments .imgs .img {
		height: 150rpx;
		width: 150rpx;
		margin-right: 28rpx;
	}


	.comments .spec {
		width: 720rpx;
		padding-right: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #999;
		margin-bottom: 30rpx;
	}


	.goods-attr {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0 31.25rpx 25rpx 31.25rpx;
		background: #fff;
	}

	.goods-attr .t {
		width: 687.5rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 36rpx;
		color: #000000;
	}

	.goods-attr .item {
		width: 687.5rpx;
		height: 68rpx;
		padding: 11rpx 20rpx;
		margin-bottom: 11rpx;
		background: #f7f7f7;
		font-size: 38.5rpx;
	}

	.goods-attr .left {
		float: left;
		font-size: 25rpx;
		width: 134rpx;
		height: 45rpx;
		line-height: 45rpx;
		overflow: hidden;
		color: #999;
	}

	.goods-attr .right {
		float: left;
		font-size: 36.5rpx;
		margin-left: 20rpx;
		width: 480rpx;
		height: 45rpx;
		line-height: 45rpx;
		overflow: hidden;
		color: #333;
	}

	.detail {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0rpx 20rpx;
		background: #fff;
	}

	.detail image {
		width: 750rpx;
		display: block;
	}


	.common-problem {
		width: 750rpx;
		height: auto;
		overflow: hidden;
	}

	.common-problem .h {
		position: relative;
		height: 145.5rpx;
		width: 750rpx;
		padding: 56.25rpx 0;
		background: #fff;
		text-align: center;
	}

	.common-problem .h .line {
		display: inline-block;
		position: absolute;
		top: 72rpx;
		left: 0;
		z-index: 2;
		height: 1px;
		margin-left: 225rpx;
		width: 300rpx;
		background: #ccc;
	}

	.common-problem .h .title {
		display: inline-block;
		position: absolute;
		top: 56.125rpx;
		left: 0;
		z-index: 3;
		height: 33rpx;
		margin-left: 285rpx;
		width: 180rpx;
		background: #fff;
	}

	.common-problem .b {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0rpx 30rpx;
		background: #fff;

	}

	.common-problem .item {
		height: auto;
		overflow: hidden;
		padding-bottom: 25rpx;
	}

	.common-problem .question-box .spot {
		float: left;
		display: block;
		height: 8rpx;
		width: 8rpx;
		background: #b4282d;
		border-radius: 50%;
		margin-top: 11rpx;
	}

	.common-problem .question-box .question {
		float: left;
		line-height: 30rpx;
		padding-left: 8rpx;
		display: block;
		font-size: 26rpx;
		padding-bottom: 15rpx;
		color: #303030;
	}

	.common-problem .answer {
		line-height: 36rpx;
		padding-left: 16rpx;
		font-size: 26rpx;
		color: #787878;
	}


	.related-goods {
		width: 750rpx;
		height: auto;
		overflow: hidden;
	}

	.related-goods .h {
		position: relative;
		height: 145.5rpx;
		width: 750rpx;
		padding: 56.25rpx 0;
		background: #fff;
		text-align: center;
		border-bottom: 1px solid #f4f4f4;
	}

	.related-goods .h .line {
		display: inline-block;
		position: absolute;
		top: 72rpx;
		left: 0;
		z-index: 2;
		height: 1px;
		margin-left: 225rpx;
		width: 300rpx;
		background: #ccc;
	}

	.related-goods .h .title {
		display: inline-block;
		position: absolute;
		top: 56.125rpx;
		left: 0;
		z-index: 3;
		height: 33rpx;
		margin-left: 285rpx;
		width: 180rpx;
		background: #fff;
	}

	.related-goods .b {
		width: 750rpx;
		height: auto;
		overflow: hidden;
	}

	.related-goods .b .item {
		float: left;
		background: #fff;
		width: 375rpx;
		height: auto;
		overflow: hidden;
		text-align: center;
		padding: 15rpx 31.25rpx;
		border-right: 1px solid #f4f4f4;
		border-bottom: 1px solid #f4f4f4;
	}

	.related-goods .item .img {
		width: 311.45rpx;
		height: 311.45rpx;
	}

	.related-goods .item .name {
		display: block;
		width: 311.45rpx;
		height: 35rpx;
		margin: 11.5rpx 0 15rpx 0;
		text-align: center;
		overflow: hidden;
		font-size: 30rpx;
		color: #333;
	}

	.related-goods .item .price {
		display: block;
		width: 311.45rpx;
		height: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #b4282d;
	}

	.bottom-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		background: #fff;
	}

	.bottom-btn .l {
		float: left;
		height: 100rpx;
		width: 120rpx;
		border: 1px solid #f4f4f4;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.bottom-btn .l.l-collect {
		/* border-right: none; */
		/* border-left: none; */
		text-align: center;
	}

	.homeBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.homeBox text {
		font-size: 20rpx;
	}


	.bottom-btn .l.l-cart .box {
		position: relative;
		height: 60rpx;
		width: 60rpx;
	}

	.bottom-btn .l.l-cart .cart-count {
		height: 28rpx;
		width: 28rpx;
		z-index: 10;
		position: absolute;
		top: 0;
		right: 0;
		background: #b4282d;
		text-align: center;
		font-size: 18rpx;
		color: #fff;
		line-height: 28rpx;
		border-radius: 50%;

	}

	.bottom-btn .l.l-cart .icon {

		position: absolute;
		top: 10rpx;
		left: 0;

	}


	.bottom-btn .l .icon {
		display: block;
		height: 44rpx;
		width: 44rpx;
	}


	.bottom-btn .c {
		float: left;
		height: 100rpx;
		line-height: 96rpx;
		flex: 1;
		text-align: center;
		color: #333;
		border-top: 1px solid #f4f4f4;
		border-bottom: 1px solid #f4f4f4;
	}

	.bottom-btn .r {
		border: 1px solid #b4282d;
		background: #b4282d;
		float: left;
		height: 100rpx;
		line-height: 96rpx;
		flex: 1;
		text-align: center;
		color: #fff;
	}


	.attr-pop {
		width: 100%;
		height: 100%;
		padding: 31.25rpx;
		background: #fff;
	}

	.attr-pop .img-info {
		width: 687.5rpx;
		height: 177rpx;
		overflow: hidden;
		margin-bottom: 41.5rpx;
	}

	.attr-pop .img {
		float: left;
		height: 177rpx;
		width: 177rpx;
		background: #f4f4f4;
		margin-right: 31.25rpx;
	}

	.attr-pop .info {
		float: left;
		height: 177rpx;
		display: flex;
		align-items: center;
	}

	.attr-pop .p {
		font-size: 33rpx;
		color: #333;
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10rpx;
	}

	.attr-pop .a {
		font-size: 29rpx;
		color: #333;
		height: 40rpx;
		line-height: 40rpx;
	}

	.spec-con {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.spec-con .name {
		height: 45rpx;
		/* margin-bottom: 22rpx; */
		margin-bottom: 18rpx;
		font-size: 29rpx;
		color: #333;
	}

	.spec-con .values {
		height: auto;
		/* margin-bottom: 31.25rpx; */
		margin-bottom: 25.25rpx;
		font-size: 0;
	}

	.spec-con .value {
		display: inline-block;
		height: 62rpx;
		padding: 0 35rpx;
		line-height: 56rpx;
		text-align: center;
		margin-right: 25rpx;
		margin-bottom: 16.5rpx;
		border: 1px solid #ccc;
		font-size: 25rpx;
		border-radius: 10rpx;
	}

	.spec-con .value.disable {
		border: 1px solid #ccc;
		color: #ccc;
	}

	.spec-con .value.selected {
		border: 1px solid #b4282d;
		color: #b4282d;
	}

	.number-item {
		margin-bottom: 50rpx;
	}

	.number-item .selnum {
		width: 322rpx;
		height: 71rpx;
		border: 1px solid #ccc;
		display: flex;
	}

	.number-item .cut {
		width: 93.75rpx;
		height: 100%;
		text-align: center;
		line-height: 65rpx;
	}

	.number-item .number {
		flex: 1;
		height: 100%;
		text-align: center;
		line-height: 68.75rpx;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		float: left;
	}

	.number-item .checkbox {
		margin-right: 20rpx;
	}

	.number-item .add {
		width: 93.75rpx;
		height: 100%;
		text-align: center;
		line-height: 65rpx;
	}

	/* .fx_info{
	  position: fixed;
	  top:20rpx;
	  right:20rpx; 
	} */
	.icon_fx {
		float: right;
		display: block;
		height: 52.803rpx;
		width: 52.803rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/icon_fx.png) 0 0 no-repeat;
		background-size: 52.803rpx;
		margin-top: 15rpx;
		margin-right: 10rpx;
	}

	/* 新家 */
	.city_box {
		height: 300px;
		background: #fff;
		display: flex;
	}

	.city_left {
		flex: 1;
	}

	.city_right {
		width: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.letter_item {
		flex: 1;
		display: block;
		font-size: 24rpx;
		color: #33B9FF;
		text-align: center;
	}

	.city_locate,
	.national {
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #efefef;
		font-size: 28rpx;
		color: #333;
		padding-left: 25rpx;
	}

	.city_locate_title {
		color: #999;
		margin-right: 20rpx;
	}

	.new_city {
		background: #efefef;
		font-size: 28rpx;
	}

	.new_city_title {
		line-height: 50rpx;
		color: #999;
		padding-left: 25rpx;
		margin-bottom: 20rpx;
	}

	.new_city_box {
		display: flex;
		flex-wrap: wrap;
	}

	.new_city_text {
		width: 200rpx;
		text-align: center;
		line-height: 70rpx;
		background: #fff;
		border-radius: 35rpx;
		margin: 0 0 22rpx 22rpx;
	}

	.city_first_letter {
		line-height: 40rpx;
		height: 40rpx;
		padding-left: 25rpx;
		font-size: 28rpx;
		background: #eee;
		color: #999;
	}

	.city_name {
		display: block;
		line-height: 80rpx;
		height: 80rpx;
		border-bottom: 1px solid #efefef;
		font-size: 28rpx;
		color: #333;
		padding-left: 25rpx;
	}

	button {
		background: #fff;
		border: none;
		border-radius: 0;
		font-size: 14px;
	}

	.coupon,
	.groupTeam,
	.partIn {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #000000;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100%;
		width: 100%;
		z-index: 100;
	}

	.coupon .couponBox {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		height: 800rpx;
		background: #fff;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 100upx;
	}

	.couponBox .tit,
	.groupTeam .tit {
		width: 100%;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.couponBox .couponInfo {
		margin: 0 auto;
		width: 710rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.couponBox .couponInfo .conLi {
		margin-top: 20rpx;
		height: 210rpx;
		width: 702rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/20190319190332.png) 0 0 no-repeat;
		background-size: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.couponBox .couponInfo .conLi .left {
		width: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 20rpx;
	}

	.couponBox .couponInfo .conLi .left text {
		margin-bottom: 20rpx;
		color: #b4282d;
	}

	.couponBox .couponInfo .conLi .left .price {
		font-weight: bold;
		margin-top: 10rpx;
		font-size: 16px;
	}

	.couponBox .couponInfo .conLi .right {
		width: 100rpx;
	}

	.couponBox .couponInfo .conLi .right text {
		width: 50rpx;
		height: 100%;
		color: #b4282d;
		margin-right: 25rpx;
		display: block;
	}

	.groupInfo {
		position: fixed;
		top: 15%;
		left: 50rpx;
		width: 650rpx;
		height: 800rpx;
		background: #fff;
		z-index: 100;
		border-radius: 20rpx;
	}

	.groupInfo_n {
		width: 650rpx;
		height: 700rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 20rpx;
	}

	.proli {
		padding: 0 20rpx;
		height: 150rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.proli .left,
	.proli .right {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.proli .left image {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background: #ccc;
		margin-right: 20rpx;
	}

	.proli .right .info {
		width: 220rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}

	.proli .right .info label {
		font-size: 13px;
	}

	.proli .right .gopt {
		width: 160rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.proli .right .gopt button {
		font-size: 13px;
		color: #fff;
		background: #b4282d;
		width: 140rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		border-radius: 10rpx;
	}

	.partInfo {
		position: fixed;
		top: 30%;
		left: 50rpx;
		width: 650rpx;
		min-height: 400rpx;
		background: #fff;
		z-index: 100;
		border-radius: 20rpx;
	}

	.partInfo label {
		height: 80rpx;
	}

	.partInfo label,
	.partInfo .a {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.partInfo .b {
		height: 160rpx;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.partInfo .b .img {
		width: 90rpx;
		margin-left: 30rpx;
		position: relative;
	}

	.partInfo .b .img label {
		height: 30rpx;
		line-height: 30rpx;
		width: 60rpx;
		background: #E96900;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		text-align: center;
		border-radius: 30rpx;
		font-size: 10px;
	}

	.partInfo .b .img image {
		height: 90rpx;
		width: 90rpx;
		border-radius: 50%;
	}

	.partInfo .b .n {
		height: 90rpx;
		width: 90rpx;
		border-radius: 50%;
		margin-left: 30rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 18px;
		color: #666;
		border: 1px dashed #666;
	}

	.partInfo .b .img:nth-child(1) {
		margin-left: 0;
	}

	.partInfo .c {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		background: #b4282d;
		color: #fff;
		border-radius: 20rpx;
	}

	/*禁用属性*/
	.attr_value_disabled {
		color: #ccc;
		border: 1px solid #ccc;
	}

	.desc {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
</style>
