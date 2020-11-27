<template>
	<view>
		<!-- currentSortType  currentSortOrder categoryFilter categoryFilter-->
		<view :class="[isSearchPage?'searchSort':'sort']">
			<view class="sort-box">
				<view :class="['item',currentSortType == 'default' ? 'active' : '']" @click="openSortFilter('defaultSort')">
					<text class="txt">综合</text>
				</view>
				<view :class="['item','by-price',currentSortType == 'price' ? 'active' : '',currentSortOrder == 'asc'  ? 'asc' : 'desc']"
				 @click="openSortFilter('priceSort')">
					<text class="txt">价格</text>
				</view>
				<view :class="['item',currentSortType == 'category' ? 'active' : '']" @click="openSortFilter('categoryFilter')">
					<text class="txt">分类</text>
				</view>
			</view>
			<view class="sort-box-category" v-if="categoryFilter">
				<view :class="['item', item.checked ? 'active' : '']" v-for="(item,index) in filterCategory" :key="'cate-'+item.id"
				 @click="selectCategory(index)">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			'isSearchPage',
			'currentSortType',
			'currentSortOrder',
			'categoryFilter',
			'categoryFilter'
		],
		data() {
			return {

			}
		},
		methods: {
			openSortFilter: function(currentId) {
				console.log('openSortFilter', typeof currentId, currentId);
				switch (currentId) {
					case 'categoryFilter':
						this.categoryFilter = !this.categoryFilter;
						this.currentSortOrder = 'asc';
						break;
					case 'priceSort':
						let tmpSortOrder = 'asc';
						if (this.currentSortOrder == 'asc') {
							tmpSortOrder = 'desc';
						}
						this.currentSortType = 'price',
							this.currentSortOrder = tmpSortOrder;
						this.categoryFilter = false;

						// 此处需要发射
						// this.getGoodsList();
						break;
					default:
						//综合排序
						this.currentSortType = 'default';
						this.currentSortOrder = 'desc';
						this.categoryFilter = false;
						// 此处需要发射
						// this.getGoodsList();
				}
			}
		}
	}
</script>

<style>
	.searchSort {
		position: fixed;
		top: 91rpx;
		background: #fff;
		width: 100%;
		height: 78rpx;
	}

	.sort {
		position: relative;
		background: #fff;
		width: 100%;
		height: 78rpx;
	}

	.sort-box {
		background: #fff;
		width: 100%;
		height: 78rpx;
		overflow: hidden;
		padding: 0 30rpx;
		display: flex;
		border-bottom: 1px solid #d9d9d9;
	}

	.sort-box .item {
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		flex: 1;
		color: #333;
		font-size: 30rpx;
	}

	.sort-box .item .txt {
		display: block;
		width: 100%;
		height: 100%;
		color: #333;
	}

	.sort-box .item .active .txt {
		color: #b4282d;
	}

	.sort-box .item .by-price {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/no-3127092a69.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
	}

	.sort-box .item .by-price .active .asc {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/up-636b92c0a5.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
	}

	.sort-box .item .by-price .active .desc {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/down-95e035f3e5.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
	}

	.sort-box-category {
		background: #fff;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 40rpx 40rpx 0 0;
		border-bottom: 1px solid #d9d9d9;
	}

	.sort-box-category .item {
		height: 54rpx;
		line-height: 54rpx;
		text-align: center;
		float: left;
		padding: 0 16rpx;
		margin: 0 0 40rpx 40rpx;
		border: 1px solid #666;
		color: #333;
		font-size: 24rpx;
	}

	.sort-box-category .item.active {
		color: #b4282d;
		border: 1px solid #b4282d;
	}
</style>
