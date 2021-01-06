<template>
	<view class="comments">
		<view class="b">
			<view class="item" v-for="(item,index) in comments" :key="index">
				<view class="info">
					<view class="user">
						<image :src="item.userInfo.avatar"></image>
						<text>{{item.userInfo.nickname}}</text>
					</view>
					<view class="time">{{item.addTime}}</view>
				</view>
				<view class="comment">{{item.content}}</view>
				<view class="imgs" v-if="item.picList && item.picList.length > 0">
					<image class="img" v-for="(pitem,pindex) in item.picList" :key="pitem.id" :src="pitem.picUrl"></image>
				</view>
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
				comments: [],
				// allCommentList: [],
				// picCommentList: [],
				typeId: 0,
				valueId: 0,
				showType: 0,
				allCount: 0,
				hasPicCount: 0,
				allPage: 1,
				picPage: 1,
				size: 20
			}
		},
		methods: {
			getCommentList() {
				util.request(api.CommentList, {
					valueId: this.valueId,
					typeId: this.typeId,
					size: this.size,
					page: (this.showType == 0 ? this.allPage : this.picPage),
					showType: this.showType
				}).then((res) => {
					if (res.code === 0) {
						if (this.showType == 0) {
							this.allPage = res.data.currentPage;
							this.comments = this.comments.concat(res.data.data);
						} else {
							this.picPage = res.data.currentPage;
							this.comments = this.comments.concat(res.data.data);

						}
					}
				});
			},
			getCommentCount() {
				util.request(api.CommentCount, {
					valueId: this.valueId,
					typeId: this.typeId
				}).then((res) => {
					if (res.code === 0) {
						this.allCount = res.data.allCount;
						this.hasPicCount = res.data.hasPicCount;
					}
				});
			}
		},
		onLoad(options) {
			this.typeId = options.typeId;
			this.valueId = options.valueId;
			this.getCommentList();
			this.getCommentCount();
		},
		onReachBottom() {
			if (this.showType == 0) {
				if (this.allCount / this.size < this.allPage) {
					return false;
				}
				this.allPage = this.allPage + 1;
			} else {
				if (this.hasPicCount / this.size < this.picPage) {
					return false;
				}
				this.picPage = this.picPage + 1;
			}
			this.getCommentList();
		}
	}
</script>

<style>
	.comments {
		width: 100%;
		height: auto;
		padding-left: 30rpx;
		background: #fff;
		margin: 20rpx 0;
	}

	.comments .b {
		height: auto;
		width: 720rpx;
	}

	.comments .b.no-h {
		margin-top: 0;
	}

	.comments .item {
		height: auto;
		width: 720rpx;
		overflow: hidden;
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 25rpx;
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
		line-height: 67rpx;
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

	.comments .comment {
		width: 720rpx;
		padding-right: 30rpx;
		line-height: 45.8rpx;
		font-size: 29rpx;
		margin-bottom: 16rpx;
	}

	.comments .imgs {
		width: 720rpx;
		height: 150rpx;
		margin-bottom: 25rpx;
	}

	.comments .imgs .img {
		height: 150rpx;
		width: 150rpx;
		margin-right: 28rpx;
	}

	.comments .customer-service {
		width: 690rpx;
		height: auto;
		overflow: hidden;
		margin-top: 23rpx;
		background: rgba(0, 0, 0, .03);
		padding: 21rpx;
	}


	.comments .customer-service .u {
		font-size: 24rpx;
		color: #333;
		line-height: 37.5rpx;
	}

	.comments .customer-service .c {
		font-size: 24rpx;
		color: #999;
		line-height: 37.5rpx;
	}
</style>
