<template>
	<view>
		<view class="add-address">
			<view class="add-form">
				<view class="form-item">
					<input class="input" placeholder="姓名" v-model="address.userName" auto-focus />
				</view>
				<view class="form-item">
					<input class="input" v-model="address.telNumber" maxlength="15" type="number" placeholder="手机号码" />
				</view>
				<view class="form-item">
					<input class="input" :value="address.fullRegion" disabled="true" @click="chooseRegion" placeholder="省份、城市、区县" />
				</view>
				<view class="form-item">
					<input class="input" v-model="address.detailInfo" placeholder="详细地址, 如街道、楼盘号等" />
				</view>
				<view class="form-default">
					<text @click="bindIsDefault" :class="['default-input' , address.defaultFlag == 1 ? 'selected' : '']">设为默认地址</text>
				</view>
			</view>

			<view class="btns">
				<button class="cannel" @click="cancelAddress">取消</button>
				<button class="save" @click="saveAddress">保存</button>
			</view>

			<view class="area-select" v-if="openSelectRegion">
				<view class="hd">
					<view class="area-selected">
						<view :class="['item' , item.id == 0 ? 'disabled' : '', (type -2) === index ? 'selected' : '']" @click="selectRegionType"
						 :data-area-type-index="index" v-for="(item,index) in selectRegionList" :key="item.id">{{item.name}}</view>
					</view>
					<view :class="['done' , selectRegionDone ? '' : 'disabled']" @click="doneSelectRegion">确定</view>
				</view>
				<view class="bd">
					<scroll-view scroll-y="true" class="area-list">
						<view :class="['item' , item.selected ? 'selected' : '']" @click="selectRegion" :data-area-index="index" v-for="(item,index) in areaList"
						 :key="item.id">{{item.name}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="bg-mask" @click="cancelSelectRegion" v-if="openSelectRegion"></view>
	</view>
</template>

<script>
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');

	export default {
		data() {
			return {
				address: {
					id: 0,
					province_id: 0,
					city_id: 0,
					area_id: 0,
					address: '',
					fullRegion: '',
					userName: '',
					telNumber: '',
					defaultFlag: 0
				},
				addressId: 0,
				openSelectRegion: false,
				selectRegionList: [{
						id: 0,
						name: '省份',
						parent_id: 0,
						type: 2
					},
					{
						id: 0,
						name: '城市',
						parent_id: 1,
						type: 3
					},
					{
						id: 0,
						name: '区县',
						parent_id: 1,
						type: 4
					}
				],
				type: 2,
				areaList: [],
				selectRegionDone: false
			}
		},
		methods: {
			bindIsDefault() {
				this.address.defaultFlag = !this.address.defaultFlag;
			},
			getAddressDetail() {
				util.request(api.AddressDetail, {
					id: this.addressId
				}).then((res) => {
					this.address = res.data;
				})
			},
			setRegionDoneStatus() {
				let doneStatus = this.selectRegionList.every(item => {
					return item.id != 0;
				});
				this.selectRegionDone = doneStatus;
			},
			chooseRegion() {
				this.openSelectRegion = !this.openSelectRegion;
				//设置区域选择数据
				let address = this.address;
				if (address.province_id > 0 && address.city_id > 0 && address.area_id > 0) {
					let selectRegionList = this.selectRegionList;
					selectRegionList[0].id = address.province_id;
					selectRegionList[0].name = address.province_name;
					selectRegionList[0].parent_id = 0;

					selectRegionList[1].id = address.city_id;
					selectRegionList[1].name = address.city_name;
					selectRegionList[1].parent_id = address.province_id;

					selectRegionList[2].id = address.area_id;
					selectRegionList[2].name = address.area_name;
					selectRegionList[2].parent_id = address.city_id;
					this.selectRegionList = selectRegionList;
					//这里为什么要等于3
					console.log('address.city_id',address.city_id);
					console.log('selectRegionList',selectRegionList);
					this.type = 3;
					this.getRegionList(address.city_id);
				} else {
					this.selectRegionList = [{
							id: 0,
							name: '省份',
							parent_id: 0,
							type: 2
						},
						{
							id: 0,
							name: '城市',
							parent_id: 1,
							type: 3
						},
						{
							id: 0,
							name: '区县',
							parent_id: 1,
							type: 4
						}
					];
					this.type = 2;
					this.getRegionList(0);
				};
				this.setRegionDoneStatus();
			},
			selectRegionType(event) {
				let typeIndex = event.target.dataset.areaTypeIndex;
				let selectRegionList = this.selectRegionList;
				console.log('typeIndex',typeIndex);
				console.log('selectRegionList',selectRegionList);
				console.log('this.type',this.type);
				//判断是否可点击
				if (typeIndex + 1 == this.type || (typeIndex - 1 >= 0 && selectRegionList[typeIndex - 1].id <= 0)) {
					console.log(typeIndex + 1 == this.type, typeIndex - 1 >= 0 , selectRegionList[typeIndex - 1].id <= 0);
					return false;
				}

				this.type = typeIndex + 1<2?2:typeIndex + 1;
				
				let selectRegionItem = selectRegionList[typeIndex];
				
				this.getRegionList(selectRegionItem.parent_id);
				
				this.setRegionDoneStatus();
			},
			selectRegion(event) {
				let areaIndex = event.target.dataset.areaIndex;
				let areaItem = this.areaList[areaIndex];
				let type = areaItem.type;
				let selectRegionList = this.selectRegionList;
				selectRegionList[type - 2] = areaItem;

				if (type != 4) {
					this.selectRegionList = selectRegionList;
					this.type = type + 1;
					this.getRegionList(areaItem.id);
				} else {
					this.selectRegionList = selectRegionList;
				}

				//重置下级区域为空
				selectRegionList.map((item, index) => {
					if (index > type - 2) {
						item.id = 0;
						item.name = index == 1 ? '城市' : '区县';
						item.parent_id = 0;
					}
					return item;
				});

				this.selectRegionList = selectRegionList;

				this.areaList = this.areaList.map(item => {
					//标记已选择的
					if (this.type == item.type && this.selectRegionList[this.type - 2].id == item.id) {
						item.selected = true;
					} else {
						item.selected = false;
					}
					return item;
				})

				this.setRegionDoneStatus();
			},
			doneSelectRegion() {
				if (this.selectRegionDone === false) {
					return false;
				}

				let address = this.address;
				let selectRegionList = this.selectRegionList;
				address.province_id = selectRegionList[0].id;
				address.city_id = selectRegionList[1].id;
				address.area_id = selectRegionList[2].id;
				address.province_name = selectRegionList[0].name;
				address.city_name = selectRegionList[1].name;
				address.area_name = selectRegionList[2].name;
				address.fullRegion = selectRegionList.map(item => {
					return item.name;
				}).join('');

				this.address = address;
				this.openSelectRegion = false;

			},
			cancelSelectRegion() {
				this.openSelectRegion = false;
				this.type = this.areaDoneStatus ? 3 : 1;

			},
			getRegionList(areaId) {
				let type = this.type;
				util.request(api.RegionList, {
					parentId: areaId
				}).then((res) => {
					if (res.errno === 0) {
						console.log('res.data',res.data);
						this.areaList = res.data.map(item => {

							//标记已选择的
							if (type == item.type && this.selectRegionList[type - 2].id == item.id) {
								item.selected = true;
							} else {
								item.selected = false;
							}

							return item;
						});
						console.log('this.areaList',this.areaList);
					}
				});
			},
			cancelAddress() {
				uni.navigateBack({
					url: '/pages/shopping/address/address'
				})
			},
			saveAddress() {
				console.log(this.address)
				let address = this.address;

				if (address.userName == '') {
					util.showErrorToast('请输入姓名');

					return false;
				}

				if (address.telNumber == '') {
					util.showErrorToast('请输入手机号码');
					return false;
				}

				if (!util.validatePhone(address.telNumber)) {
					util.showErrorToast('请输入正确手机号码');
					return false;
				}

				if (address.area_id == 0) {
					util.showErrorToast('请输入省市区');
					return false;
				}

				if (address.detailInfo == '') {
					util.showErrorToast('请输入详细地址');
					return false;
				}

				util.request(api.AddressSave, {
					id: address.id,
					userName: address.userName,
					telNumber: address.telNumber,
					provinceId: address.province_id,
					cityId: address.city_id,
					areaId: address.area_id,
					defaultFlag: address.defaultFlag,
					provinceName: address.province_name,
					cityName: address.city_name,
					areaName: address.area_name,
					detailInfo: address.detailInfo,
				}, 'POST').then((res) => {
					if (res.errno === 0) {
						uni.navigateBack({
							url: '/pages/shopping/address/address',
						})
					}
				});

			}
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			if (options.id != '' && options.id != 0) {
				this.addressId = options.id;
				this.getAddressDetail();
			}
			this.getRegionList(0);
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f4f4f4;
	}

	.add-address .add-form {
		background: #fff;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.add-address .form-item {
		height: 116rpx;
		padding-left: 31.25rpx;
		border-bottom: 1px solid #d9d9d9;
		display: flex;
		align-items: center;
		padding-right: 31.25rpx;
	}

	.add-address .input {
		flex: 1;
		height: 44rpx;
		line-height: 44rpx;
		overflow: hidden;
	}

	.add-address .form-default {
		border-bottom: 1px solid #d9d9d9;
		height: 96rpx;
		background: #fafafa;
		padding-top: 28rpx;
		font-size: 28rpx;
	}

	.default-input {
		margin: 0 auto;
		display: block;
		width: 240rpx;
		height: 40rpx;
		padding-left: 50rpx;
		line-height: 40rpx;
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-sed825af9d3-a6b8540d42.png) 1rpx -448rpx no-repeat;
		background-size: 38rpx 486rpx;
		font-size: 28rpx;
	}

	.default-input.selected {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/checkbox-sed825af9d3-a6b8540d42.png) 0 -192rpx no-repeat;
		background-size: 38rpx 486rpx;
	}

	.add-address .btns {
		position: fixed;
		bottom: 0;
		left: 0;
		overflow: hidden;
		display: flex;
		height: 100rpx;
		width: 100%;
	}

	.add-address .cannel,
	.add-address .save {
		flex: 1;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #fff;
		border: none;
		border-radius: 0;
	}

	.add-address .cannel {
		background: #cacaca;
	}

	.add-address .save {
		background: #b4282d;
	}


	.area-select {
		width: 100%;
		height: 600rpx;
		background: #fff;
		position: fixed;
		z-index: 10;
		left: 0;
		bottom: 0;
	}

	.area-select .hd {
		height: 108rpx;
		width: 100%;
		border-bottom: 1px solid #f4f4f4;
		padding: 46rpx 30rpx 0 30rpx;
	}

	.area-select .area-selected {
		float: left;
		height: 60rpx;
		display: flex;
	}

	.area-select .area-selected .item {
		max-width: 140rpx;
		margin-right: 30rpx;
		text-align: left;
		line-height: 60rpx;
		height: 100%;
		color: #333;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.area-select .area-selected .item.disabled {
		color: #999;
	}

	.area-select .area-selected .item.selected {
		color: #b4282d;
	}

	.area-select .done {
		float: right;
		height: 60rpx;
		width: 60rpx;
		border: none;
		background: #fff;
		line-height: 60rpx;
		text-align: center;
		color: #333;
		font-size: 28rpx;
	}

	.area-select .done.disabled {
		color: #999;
	}



	.area-select .bd {
		height: 492rpx;
		width: 100%;
		padding: 0 30rpx;
	}

	.area-select {
		height: auto;
		overflow: scroll;

	}

	.area-list {
		width: 100%;
		height: 100%;
		line-height: 104rpx;
		text-align: left;
		color: #333;
		font-size: 28rpx;
	}

	.area-select .item {
		width: 100%;
		height: 104rpx;
		line-height: 104rpx;
		text-align: left;
		color: #333;
		font-size: 28rpx;
	}

	.area-select .area-list .item.selected {
		color: #b4282d;
	}


	.bg-mask {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 8;
	}
</style>
