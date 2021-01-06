<template>

	<view class="container">
		<view class='cont'>
			<!-- <view class='selinfo'>
				<image class="sel" src="../../../static/images/logo40.png"></image>
				<label>申请获得</label>
			</view>
			<view class='tit'>以下权限</view>
			<view class='selinfo'>
				<image class="sel" src="../../../static/images/icon_xz.png"></image>
				<label>获取你的公开信息（昵称、头像、地区及性别）</label>
			</view> -->
			
			<view class="userMsg">
				<view class="userMsg_option">
					<text>手机号</text>
					<input v-model="mobile" type="number" placeholder="请输入您的手机号" maxlength="11" class="userMsg_input"/>
				</view>
				<view class="userMsg_option">
					<text>密码</text>
					<input v-model="password" placeholder="密码长度为6-20位" password="true" maxlength="20" class="userMsg_input"/>
				</view>
			</view>
			
			<view class="bottom-btn">
				<!-- <button class="r" open-type="getUserInfo" @getuserinfo="getUserInfo">同意</button> -->
				<button class="r" @click="getUserInfo">登陆</button>
				<navigator open-type="navigate" url="../register/register" class="register">
					去注册
				</navigator>
			</view>
			<view class="bottom-new" v-if="id == -2">
				<button class="r" @click='goUrl'>拒绝</button>
			</view>
		</view>
	</view>

</template>

<script>
	var app = getApp();
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');
	const user = require('../../../services/user.js');

	export default {
		data() {
			return {
				id: 0,
				type: null,
				userId: 0,
				userInfo: {},
				mobile: '',
				password: ''
			}
		},
		methods: {
			getUserInfo(e) {
				let token = uni.getStorageSync('token');
				uni.showLoading({
					title: '加载中',
				})
				if (token) {
					this.setFid();
					return false;
				} else {
					console.log('util.validatePhone',util.validatePhone(this.mobile));
					if (!util.validatePhone(this.mobile)) {
						util.showErrorToast('手机号格式有误');
						return false;
					}
					
					if (this.password.trim().length<6) {
						util.showErrorToast('密码长度为6-20位');
						return false;
					}
					
					util.request(api.LoginByMobile,{
						mobile: this.mobile,
						password: this.password
					}).then((res) => {
						if (res.code === 0) {
							console.log('登陆结果',res);
						}
					}).catch((erro)=>{
						util.showErrorToast('登陆失败');
					});
					
				}
			},
			setFid() {
				if (this.id == -1) {
					uni.switchTab({
						url: '../../index/index'
					})
				} else if (this.id == -2) {
					uni.switchTab({
						url: '../../ucenter/index/index'
					})
				} else {
					uni.navigateTo({
						url: '../../goods/goods?id=' + this.id + '&type=' + this.type
					})
				}
				uni.hideLoading();
			},
			goUrl() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			}
		},
		onLoad(options) {
			if (options.id) {
				console.log('id', options.id);
				this.id = options.id;
			}
			if (options.type) {
				console.log('type', options.type);
				this.type = options.type;
			}
		}
	}
</script>

<style>
	.container {
		background: #ffffff;
	}

	.cont {
		width: 710rpx;
		margin: 0 auto;
	}

	.selinfo {
		height: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.selinfo .sel {
		height: 60rpx;
		width: 60rpx;
	}

	.selinfo label {
		width: 650rpx;
		color: #666;
		margin-left: 20rpx;
	}

	.tit {
		font-size: 30px;
		color: #000000;
		margin-bottom: 30rpx;
	}

	.bottom-btn {
		margin-top: 500rpx;
	}

	.bottom-btn button {
		width: 350rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #ffffff;
		background: #E96900;
		margin: 0 auto;
	}

	.bottom-new {
		margin-top: 30rpx;
	}

	.bottom-new button {
		width: 350rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: none;
		margin: 0 auto;
		border: 1px solid #999;
		color: #333;
	}
	
	.userMsg {
		margin-top: 200rpx;
	}
	
	.userMsg_option {
		display: flex;
		align-items: center;
	}
	
	.userMsg_option:first-child {
		margin-bottom: 24rpx;
	}
	
	.userMsg_option>text {
		display: inline-block;
		padding-right: 32rpx;
		width: 120rpx;
	}
	
	.userMsg_input {
		width: 80%;
		background-color: #ededed;
		border-radius: 24rpx;
		padding-left: 24rpx;
	}
	
	.register {
		color: #007AFF;
		text-align: center;
	}
	
	
</style>
