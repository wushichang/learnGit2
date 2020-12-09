<template>
	<scroll-view class="comments">
		<view class="h">
			<text class="t">精选留言</text>
			<image @click="postComment" class="i" src="http://shop.beastiot.com/haoyaoshopvf/icon/comment-add-2aca147c3f.png"></image>
		</view>
		<view class="has-comments" v-if="commentList.length > 0 ">
			<view class="b">
				<view class="item" v-for="item in commentList" :key="item.id">
					<view class="info">
						<view class="user">
							<image class="avatar" :src="item.userInfo.avatar"></image>
							<text class="nickname">{{item.userInfo.nickname}}</text>
						</view>
						<view class="time">{{item.addTime}}</view>
					</view>
					<view class="comment">
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="load" v-if="commentCount > 5">
				<navigator :url="'/pages/topicComment/topicComment?typeId=1&valueId='+topic.id">查看更多</navigator>
			</view>
		</view>
		<view class="no-comments" v-if="commentList.length <= 0">
			<view class="b">
				<image class="icon" src="http://shop.beastiot.com/haoyaoshopvf/icon/no-comment-560f87660a.png"></image>
				<text class="txt">等你来留言</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: ['commentList', 'commentCount', 'topic','idVal'],
		data() {
			return {

			}
		},
		methods: {
			postComment() {
				uni.navigateTo({
					url: '/pages/commentPost/commentPost?valueId=' + this.idVal + '&typeId=1',
				})
			}
		}
	}
</script>

<style>
	.comments {
		width: 100%;
		height: auto;
		padding-left: 30rpx;
		background: #fff;
		margin-top: 20rpx;
	}

	.comments .h {
		height: 93rpx;
		line-height: 93rpx;
		width: 720rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #d9d9d9;
	}

	.comments .h .t {
		display: block;
		float: left;
		width: 50%;
		font-size: 29rpx;
		color: #333;
	}

	.comments .h .i {
		display: block;
		float: right;
		margin-top: 30rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.comments .b {
		height: auto;
		width: 720rpx;
	}

	.comments .item {
		height: auto;
		width: 720rpx;
		overflow: hidden;
		border-bottom: 1px solid #d9d9d9;
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

	.comments .user .avatar {
		display: block;
		float: left;
		width: 67rpx;
		height: 67rpx;
		margin-right: 17rpx;
		border-radius: 50%;
	}

	.comments .user .nickname {
		display: block;
		width: auto;
		float: left;
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
		margin-bottom: 30rpx;
		font-size: 29rpx;
		color: #333;
	}

	.comments .load {
		width: 720rpx;
		height: 108rpx;
		line-height: 108rpx;
		text-align: center;
		font-size: 38.5rpx;
	}

	.no-comments {
		height: 297rpx;
	}

	.no-comments .txt {
		height: 43rpx;
		line-height: 43rpx;
		display: block;
		width: 100%;
		text-align: center;
		font-size: 29rpx;
		color: #7f7f7f;
	}

	.no-comments .icon {
		margin: 48rpx auto 18rpx auto;
		height: 130rpx;
		display: block;
		width: 115rpx;
	}
</style>
