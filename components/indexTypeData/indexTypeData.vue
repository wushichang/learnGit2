<template>
	<view class="recom-section" v-if="dataList.length>0">
		<view class="h">
			<view class="title">
				<text>{{name}}</text>
				<text class="desc">{{name}}购更实惠</text>
			</view>
			<view class="more">
				<navigator :url="type==1?'../group/group':'../spike/spike'">更多</navigator>
			</view>
		</view>
		<view class="b cont">
			<view class="pro-box">
				<view class="li" v-for="(item,index) in dataList" :key="item.id" @click="gotoDetail(item.id)">
					<view class="flotel">
						<view class="bqel">
							<label class="lael">{{type==1?'团购':'秒杀'}}</label>
						</view>
					</view>
					<image class="prourl" :src="item.listPicUrl"></image>
					<view class="pricebox">
						<text class="xprice">¥{{type==1?item.groupPrice:item.retailPrice}}</text>
						<text class="pprice" v-if="type==1">拼</text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: ['name','type','dataList'],
		data() {
			return {

			}
		},
		methods: {
			gotoDetail(id) {
				uni.navigateTo({
					url: '../goods/goods?id=' + id + '&type=' + this.type
				})
			}
		}
	}
</script>

<style>
	.recom-section {
		width: 100%;
		background: #FFFFFF;
	}

	.recom-section .cont {
		width: 94%;
		margin: 0 auto;
	}

	.recom-section .h {
		flex: 1;
		height: 100rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.recom-section .h .title {
		color: #1A1A1A;
		font-size: 16px;
		margin-left: 20rpx;
	}

	.recom-section .h .title .desc {
		color: #aaaaaa;
		font-size: 22rpx;
		margin-left: 20rpx;
	}

	.recom-section .h .more {
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid #1A1A1A;
		color: #1A1A1A;
		font-size: 26rpx;
		border-radius: 30rpx;
		text-align: center;
		margin-right: 20rpx;
	}

	.recom-section .b {
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.pro-box {
		width: 710rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.pro-box .li {
		width: 223.3rpx;
		height: 303rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: relative;
	}

	.pro-box .li .flotel {
		width: 223.3rpx;
		height: 30rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.pro-box .li .flotel .bqel {
		height: 100%;
		width: 223.3rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.lael {
		width: 60rpx;
		height: 100%;
		text-align: center;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		background: #36b5fa;
		color: #fff;
		font-size: 10px;
		margin-left: 10rpx;
	}

	.lael:nth-child(1) {
		margin-left: 0;
	}

	.pro-box .li:nth-child(1) {
		margin-left: 0;
	}

	.pro-box .li .prourl {
		width: 223.3rpx;
		height: 223.3rpx;
		background: #CCCCCC;
	}

	.pro-box .li .pricebox {
		width: 223.3rpx;
		height: 80rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.pro-box .li .pricebox .pprice {
		margin-left: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		width: 80rpx;
		background: #fc5a67;
		color: #FFFFFF;
		font-size: 12px;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
	}
</style>
