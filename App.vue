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
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAARsAAsAAAAACRQAAAQeAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqFJIRKATYCJAMUCwwABCAFhG0HWBvmB8gusG3Y00YZKDTNpu4sqhJcj0NcPPC/v//2OffcB3+mP0SCklcfJwAhvR9H7nDIs6YCTEJI84b08vL3VfJgIY/dXsMSFAC2rlyNCdLWmqXErjrCdG+mqlNF9KpkD3NA6QFa9Uq/Up8tTqiwAQeqWRNMOtsHx0wXpQPLW/DIZtQVgOMBzWbrr8Zvsn+QF/VXEM9m4DGBzxNQMZQlZKH05wV9iXIqIOwMsVTohwxSDjEoqQsp1ybhOMiV4gHaIo7Zvx9+mhIUifKMcu6izUcDNl8qZ+Oz7P9YaSKAsD0buJvIMBmQCPtTHTu13MRkUOWzvW0uUFESxbbWDXzR/mLa6QD4khmpKuo/PJJMFAgFiqJGYecmE19QXeArNaGTQakNnQilKUT7oshNVaWl1CsgDOGNA5TNQVEU+/VRtFYnT6mNVuH6bH8hB2+UjYAXW8SrV5T3qOcnaal9dVpten1oPjiKIINjGGbImOl6VXxU+/CUPWLEHBpD5NYjTU0qWEODEBCN+vrsBox9qCmn0fvQGSEtmF3aiMDBJozjCGK7SRk2NYU9f473uvXlS5czbYGgvlSZxGkW5cYcFYpkUWkqExKUTJgVx9M+85lySrLOxkOv5ixvuNSW43v74LZCyNkhlG3dL3vz+b9vkq4ufa/B1eSy6Dd/PkNKZ7kQRu79Zvhw4LhecuyJvP/WLuhJbFsENvxWQTlso3xV3WtTLmjFJwhaoh17R3TXda8JJL2HVJQWj18cXyyr9Fp5Zr/vfa/kqcReubCKLpalSou991EpungWZfsF+HnVOv8KVx7BdpVr8gyJv4X7/ziTcHE2XqPwLBk3yPcGppwPZu/lTE6CY1LAPmtbedRm+ODyI2hplx/i/pJU8fk7mbT2X+VdeC5rn0QQUkyWFE18PFJWtESSXPHBMeQbVgA657MEaAMA2T7aI5/6DLuh9jvzNy60zJBnTq99LIF3d8/YgU47gXqukniqlN4QYcmp9BUrxjzJvbpALs5t0+M8i16GrvfC0+24HVcf4NuCEi8EREVDIFMyGpmwkyFXNQ0KSuZAxSSym6t6xGoJqYyJCggELVMQNdyCTMsSMmGPINfvFgpaAULFisC/Z9XYEIKKYklNyUDfFAzx49DUzOnQKX+QlflqHBTbpA/FiRNGO2vbaPpMIcVtXBCXaC3j400MjOUApeRl5PuM0bHskp6K4Pj0u7axCUz7JuEXFcDQAjGiShED8lVBIXQsZJqLU8PYzz8QS8aninP6ftg/SCzhrI7sWLMtgTwrwlJ9x/KaODnLUryUCQWKsQCSEhvx1QRD0en7XESXEoJrxL7WbKh5gWUVon9VcIyXoELZkocYspBCHraUv/KPkl1HrVWntjm0uv4BPqU0SLtkER+QpN24qCzJGAAAAA==') format('woff2');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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
