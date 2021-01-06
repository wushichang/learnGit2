<template>

	<view class="container">
		<view class='cont'>

			<view class="userMsg">
				<view class="userMsg_option">
					<text>手机号</text>
					<input v-model="mobile" type="number" placeholder="请输入您的手机号" maxlength="11" class="userMsg_input"/>
				</view>
				<view class="userMsg_option">
					<text>验证码</text>
					<input v-model="verifyCode" placeholder="验证码长度为6位" maxlength="6" class="userMsg_input verifyCode"/>
					<button @click="getVerifyCode" class="getVerifyCodeBtn">{{getVerifyCodeBtnTxt}}</button>
				</view>
				<view class="userMsg_option">
					<text>密码</text>
					<input v-model="password" placeholder="密码长度为6-20位" password="true" maxlength="20" class="userMsg_input"/>
				</view>
			</view>
			
			<view class="bottom-btn">
				<!-- <button class="r" open-type="getUserInfo" @getuserinfo="getUserInfo">同意</button> -->
				<button class="r" @click="toRegister">注册并登录</button>
			</view>
		</view>
	</view>

</template>

<script>
	var app = getApp();
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');
	const user = require('../../../services/user.js');
	var timer = null;

	export default {
		data() {
			return {
				mobile: '',
				verifyCode: '',
				getVerifyCodeBtnTxt: '获取验证码',
				password: ''
				
			}
		},
		methods: {
			getVerifyCode(){
				
				if(this.getVerifyCodeBtnTxt.indexOf('s') >0 )return;
				
				util.request(api.SendSms,{
					mobile: this.mobile,
					type: 'register'
				},"POST","application/x-www-form-urlencoded").then((res) => {
					if (res.code != 0) {
						console.log('验证码',res);
						util.showErrorToast(res.errmsg);
					}else{
						console.log('验证码',res);
						this.verifyCode = res.data.verifyCode;
						timer = setInterval(()=>{
							var result = Math.floor((+res.data.createTime + 5*60*1000 - new Date().getTime())/1000);
							this.getVerifyCodeBtnTxt = result>0? result+'s': '获取验证码';
							if(result>0){
								this.getVerifyCodeBtnTxt = result+'s';
							}else{
								this.getVerifyCodeBtnTxt = '获取验证码';
								clearInterval(timer);
							}
						},1000)
						
					}
				})
			},
			
			toRegister(){
				if (!util.validatePhone(this.mobile)) {
					util.showErrorToast('手机号格式有误');
					return false;
				}
				
				if (this.verifyCode.length != 6) {
					util.showErrorToast('验证码有误');
					return false;
				}
				
				if (this.password.trim().length<6) {
					util.showErrorToast('密码长度6-20位');
					return false;
				}
				
				util.request(api.Register,{
					mobile: this.mobile,
					password: this.password,
					verifyCode: this.verifyCode,
					type: 'register'
				},"POST","application/x-www-form-urlencoded").then((res) => {
					if (res.code === 0) {
						console.log('登陆结果',res);
					}
				}).catch((erro)=>{
					util.showErrorToast('登陆失败');
				});
			}
		},
		onLoad(options) {
			
		},
		destroyed() {
			clearInterval(timer);
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
	
	.userMsg_option:nth-child(2n) {
		margin:24rpx 0;
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
	
	.verifyCode {
		width: 55%;
	}
	
	.getVerifyCodeBtn {
		width: 25%;
		font-size: 24rpx;
		white-space: nowrap;
	}
	
	
	
</style>
