<template>
	<view class="container">
		<view class="post-comment">
			<view class="input-box">
				<textarea class="content" v-model="content" focus="true" maxlength="140" placeholder="留言经过筛选后，对所有人可见" />
				<text class="count">{{140 - content.length}}</text>
	        </view>
	        <view class="btns">
	            <view class="close" @click="onClose">取消</view>
	            <view class="post" @click="onPost">发表</view>
	        </view>
	    </view>
	</view>
</template>

<script>
	const api = require('../../config/api.js');
	const util = require('../../util/util.js');
	
	export default {
		data() {
			return {
				orderId: 0,
				orderGoodsId: 0,
				typeId: 0,
				valueId: 0,
				content: ''
			}
		},
		methods: {
			onClose() {
				uni.navigateBack();
			},
			onPost() {
			    if (!this.content) {
			      util.showErrorToast('请填写评论');
			      return false;
			    }
			    util.request(api.CommentPost, {
			      orderGoodsId: this.orderGoodsId,
			      typeId: this.typeId,
			      valueId: this.valueId,
			      content: this.content
			    }, 'POST').then((res)=> {
			      if (res.code === 0) {
			        uni.showToast({
			          title: '评论成功',
			          complete: ()=>{
			            if (this.orderId && this.orderId === 0) {
							console.log('订单详情页面');
			              // uni.navigateTo({
			              //   url: '../ucenter/orderDetail/orderDetail?id='+that.data.orderId
			              // });
			            }else{
			              wx.navigateBack();
			            }
			          }
			        })
			      }
			      console.log(res)
			    });
			}
		},
		onLoad(options) {
			this.typeId = parseInt(options.typeId);
			this.valueId = options.valueId;
			this.orderGoodsId = options.orderGoodsId;
			this.orderId = options.orderId;
		}
	}
</script>

<style>
	page, .container {
	  height: 100%;
	  background: #f4f4f4;
	}
	
	.post-comment {
	  width: 750rpx;
	  height: auto;
	  overflow: hidden;
	  padding: 30rpx;
	}
	
	.post-comment .input-box {
	  height: 337.5rpx;
	  width: 690rpx;
	  position: relative;
	  background: #fff;
	}
	
	.post-comment .input-box .content {
	  position: absolute;
	  top: 0;
	  left: 0;
	  display: block;
	  background: #fff;
	  font-size: 29rpx;
	  color: #333;
	  height: 300rpx;
	  width: 650rpx;
	  padding: 20rpx;
	}
	
	.post-comment .input-box .count {
	  position: absolute;
	  bottom: 20rpx;
	  right: 20rpx;
	  display: block;
	  height: 30rpx;
	  width: 50rpx;
	  font-size: 29rpx;
	  color: #999;
	}
	
	.post-comment .btns {
	  height: 108rpx;
	}
	
	.post-comment .close {
	  float: left;
	  height: 108rpx;
	  line-height: 108rpx;
	  text-align: left;
	  color: #666;
	  padding: 0 30rpx;
	}
	
	.post-comment .post {
	  float: right;
	  height: 108rpx;
	  line-height: 108rpx;
	  text-align: right;
	  padding: 0 30rpx;
	  color: #b4282d;
	}

</style>
