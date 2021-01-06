<script>
	export default {
		globalData: {
			userInfo: {
				nickName: 'Hi,游客',
				userName: '点击登录',
				avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
			},
			goodId: 0,
			userId: 0,
			token: '',
			userCoupon: 'NO_USE_COUPON', //默认不适用优惠券
			courseCouponCode: {}, //购买课程的时候优惠券信息
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

	.container {
		box-sizing: border-box;
		background-color: #f4f4f4;
	}

	view,
	image,
	text,
	navigator {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	view,
	text {
		font-size: 29rpx;
		color: #333;
		font-family: PingFangSC-Light, helvetica, 'Heiti SC';
	}

	/* 没有商品信息 */
	.empty-view {
		margin-top: 50%;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.empty-view .icon {
		height: 120rpx;
		width: 120rpx;
		margin-bottom: 10rpx;
	}

	.empty-view .text {
		width: auto;
		font-size: 28rpx;
		line-height: 35rpx;
		color: #999;
	}


	/* 阿里图标 start */
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAASwAAsAAAAACagAAARhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDSAqGEIUgATYCJAMYCw4ABCAFhG0HYhtgCBGVnNPIfhTGjU9R4v/nVJ5qlyEiFrU9duwfdz78e77n5qZKpdl5M9JJaSYoHdQHtR3kP+IBGsDyANzb3t/TzsbE8wlc4BeIRBJ5vt90jK0QMsIwJc9Tz7Kd/9qdvlyO5XEapRAShOPgmOkycZYHNLIZZSVFAo4HNBpGfpUX2R7kRf1BwjYbYOJXxOQ1fx8IAA5VcEXQw9VPhBos5BQBQGbPmDYB6owVbAOTQG1QVtzLgkRCATWzjYkDEBH8PnmDZkQNMFBQyMVBU4XJ6PKce96aykHZaA8B2XRuAPuHAAqgEYAFyOpK71LQKNsIEbjrdhZ9AOigBgN2qmtUel7leb3nrYNBMkoJEuj0vzxAARYUDAhAlECrM7H9cgrgOedIr7pKmMGiq4IZFF09zGDQtUb+tIzKCQ8YAPyEuCCUWrjMgEAFBozO7qjBcTq9ullXy2leZdru9wS0Zq9vR6wYlzmHBTwOKf9Wr919Uq4nxk7IeC55TntPIj3dnZk5jFella1i9yS10F1LqaI4dooQz2mt1lXrqy3Q8lnyidmsfLK2/vhpophIAgGn1uez48sQGyv7tEZvwOMf7/XZmXR4u5/QpUVXoWDkHgcNBGalpYmLbs3IGOGTbbbY7Q5JdDWObaolNM6zehhqe11GXCU5bnbTSUM2ejM7u31Hd3smPtqeIQRPJsGb/hI5La3dxelDuXxrPjdUk8/En7yWlEyNjNzm3OZaplphRU3tOO05CK7LZqtVY7MN5kpmA3v979/rqNidCFnu2dnVquE2URBU3cenjO+uEkJ22njrLlso7lPWck6ID7Xt4gtsO+dDsJ2sllLtpE045HVq4iJfRsZpnIcaj5XzbHmasZrdnXeTuDiNSxNni+NcXJyf2/VLSZpaEfy4hyYm0j1a5IldZbLF/F8wCmbRKEaJ2Feb05J4YMVltJ1vOncOEY1XoDvdnZi42w3ThETqmxISeL6wssmvC+eWjf/odG8OrFvAu938gnX8fLcUs9fN5yVJdKpZILkxGrKX3mEGAMFD0RLK35gLmE/5ougArfJP+xt0nhGSMs7Y4ZtJrmUBf9M+YxD9l2PDcrmQzrL/lazjVHxTiC2NL/2dIwKkPsZv/RpKJf5NwdFvKv+ik7gD+UEGhDIbiOS2yBh7hUTlBqncHUoX3sOViegLYg04eykI9N4Qav1CpPdBxtgvJFZ/SPVBBKXvwPrMyj74zLoLQkVC0YPymBtjO3QWNh6QuiqUtCJgXyA2T9CmSUi+4KGBTHGDvaZbVUNGuKa9+hiqiqkVLhDrMlNtdyt+atUPLWOuOzNvAkIKEiTyQHIx1jDeYjUrXP8AUk4lJA19r4IXIKx8dbKxtO6A9LRNp75b2W5dpbaUMuYxQ7Aa2eOGSmcZaav3FSCmlrIB6dbOyphnumqXy+vrV3kJSvLaNGAIJSxRECVRIfvJw0bZzZ+B2k/d+gzzZ8ZNOpqMCopp1S0LhdXRInbWcacDAAAA') format('woff2');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconjiantou:before {
	  content: "\e637";
	}
	
	.iconicon_jiazaizhong:before {
	  content: "\e628";
	}
	
	.icondelete:before {
	  content: "\e61e";
	}
	
	.iconicon-test:before {
	  content: "\e61c";
	}
	
	.iconsousuo:before {
	  content: "\e60a";
	}
	



	/* 阿里图标 end*/
</style>
