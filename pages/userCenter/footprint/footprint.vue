<template>
	<view class="container">
		<view class='ts-mes'><text class='ca'>长按可删除足迹!</text></view>
		<view class="footprint">
			<view class="day-item" v-for="(item,index) in footprintList" :key="index" :id="'day-item-'+item.id">
				<view class="day-hd">{{item.addTime}}</view>
				<view class="day-list">
					<view class="item" :data-footprint="item" @touchstart="touchStart" @touchend="touchEnd" :data-idx='index' @click="deleteItem">
						<image class="img" :src="item.listPicUrl"></image>
						<view class="info">
							<view class="name">{{item.name || ''}}</view>
							<view class="subtitle">{{item.goodsBrief || ''}}</view>
							<view class="price">￥{{item.retailPrice || '0.00'}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-view" v-if="footprintList.length <= 0">
			<image class="icon" src="/static/images/allorder.png"></image>
			<text class="text">没有足迹信息</text>
		</view>
	</view>
</template>

<script>
	const util = require('../../../util/util.js');
	const api = require('../../../config/api.js');


	export default {
		data() {
			return {
				footprintList: [],
				page: 1,
				hasMoreData: true,
				touch_start: 0,
				touch_end: 0
			}
		},
		methods: {
			getFootprintList() {
				// var tmpFootPrint;
				util.request(api.FootprintList, {
					page: this.page
				}).then((res)=> {
					if (res.code === 0) {
						console.log(res.data);

						var oldfootprintList = this.footprintList;
						if (this.page == 1) {
							oldfootprintList = []
						}

						var footprintList = res.data;

						// console.log("footprintList==="+res.data);
						if (footprintList.length < 10) { //说明没有满1页，是最后一页
							//arr1 = arr1.concat(Inters),//合并数组
								// Inters:arr1,
							this.footprintList = oldfootprintList.concat(footprintList); //追加数据。
							this.hasMoreData = false;
							// console.log("追加之后的footprintList==="+footprintList);
						} else {
							//arr2= arr1.concat(arr2),
								//Inters:arr1,
							this.footprintList = oldfootprintList.concat(footprintList);
							this.hasMoreData = true;
							this.page = this.page + 1;
							// console.log("追加之后的footprintList==="+footprintList);
						}

						// if (res.data != undefined){
						//   tmpFootPrint = res.data;
						// } else {
						//   tmpFootPrint = [];
						// }

						// that.setData({
						//   footprintList: tmpFootPrint 
						// });
					}
				});
			},
			deleteItem(event) {
				let footprint = event.currentTarget.dataset.footprint;
				var touchTime = this.touch_end - this.touch_start;
				console.log(footprint);
				console.log(touchTime);
				//如果按下时间大于350为长按  
				if (touchTime > 350) {
					uni.showModal({
						title: '',
						content: '确定要删除足迹？',
						success: (res)=> {
							if (res.confirm) {
								util.request(api.FootprintDelete, {
									footprintId: footprint.id
								}).then((res)=> {
									console.log(res);
									if (res.code === 0) {
										var nowidx = event.currentTarget.dataset.idx;
										this.footprintList.splice(nowidx, 1);
										//
											// Inters:arr1,
										this.footprintList = this.footprintList;
										/**
										uni.showToast({
										  title: res.errmsg,
										  icon: 'success',
										  duration: 2000,
										  complete:function(){
										    that.getFootprintList();
										    console.log('重新加载');
										    console.log(this.footprintList);
										  }
										}); **/
									} else {
										util.showErrorToast(res.errmsg);
									}
								});
								console.log('用户点击确定');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/goods/goods?id=' + footprint.goodsId,
					});
				}

			},
			touchStart(e) {
				this.touch_start = e.timeStamp;
				console.log(e.timeStamp + '- touch-start')
			},
			//按下事件结束  
			touchEnd(e) {
				this.touch_end = e.timeStamp;
				console.log(e.timeStamp + '- touch-end')
			},

			onPullDownRefresh() {
				// 增加下拉刷新数据的功能
				this.page = 1;
					//更新当前页数子
				this.getFootprintList();
				uni.stopPullDownRefresh()
			},

			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom() {
				console.log('别拉了，到底了')
				if (this.hasMoreData) {
					this.getFootprintList('加载更多数据')
				}
			}
		},
		onLoad() {
			this.getFootprintList();
		}	
	}
</script>

<style>
	page{
	    background: #f4f4f4;
	    min-height: 100%;
	}
	
	.container{
	    background: #f4f4f4;
	    min-height: 100%;
	}
	
	.ts-mes{
	  height: 80rpx;
	  line-height: 80rpx; 
	  background: #feeff0; 
	}
	.ts-mes .ca{
	  margin-left: 20rpx;
	  color: #b4282d;
	  letter-spacing: 0.1em;
	}
	
	.footprint{
	   height: auto;
	  overflow: hidden;
	  width: 100%;
	  border-top: 1px solid #e1e1e1;
	}
	
	.day-item{
	  height: auto;
	  overflow: hidden;
	  width: 100%;
	  margin-bottom: 20rpx;
	}
	
	.day-hd{
	  height: 94rpx;
	  width: 100%;
	  line-height: 94rpx;
	  background: #fff;
	  padding-left: 30rpx;
	  color: #333;
	  font-size: 28rpx;
	}
	
	.day-list{
	  width: 100%;
	  height: auto;
	  overflow: hidden;
	  background: #fff;
	  padding-left: 30rpx;
	  border-top: 1px solid #e1e1e1;
	}
	
	.item{
	  height: 212rpx;
	  width: 720rpx;
	  background: #fff;
	  padding: 30rpx 30rpx 30rpx 0;
	  border-bottom: 1px solid #e1e1e1;
	}
	
	.item:last-child{
	  border-bottom: 1px solid #fff;
	}
	
	.item .img{
	  float: left;
	  width: 150rpx;
	  height: 150rpx;
	}
	
	.item .info{
	  float: right;
	  width: 540rpx;
	  height: 150rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding-left: 20rpx;
	}
	
	.item .info .name{
	  font-size: 28rpx;
	  color: #333;
	  line-height: 40rpx;
	}
	
	
	.item .info .subtitle{
	  margin-top: 8rpx;
	  font-size: 24rpx;
	  color: #888;
	  line-height: 40rpx;
	}
	
	.item .info .price{
	  margin-top: 8rpx;
	  font-size: 28rpx;
	  color: #333;
	  line-height: 40rpx;
	}

</style>
