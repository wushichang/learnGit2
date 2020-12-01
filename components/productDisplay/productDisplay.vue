<template>
	<view>
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
			<view class="sort-box-category" v-show="categoryFilter">
				<!-- 此处点击配件后，后台返回的数据筛选条件，丢失了‘配件’一项 -->
				<view :class="['item', item.checked ? 'active' : '']" v-for="(item,index) in filterCategory" :key="item.id" @click="selectCategory(index)">{{item.name}}</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view :class="['cate-item',isSearchPage?'cate-item-search':'']">
			<view class="b">
				<navigator 
				:class="['item' ,(iindex + 1) % 2 == 0 ? 'item-b' : '']" 
				:url="'/pages/goods/goods?id='+iitem.id"
				v-for="(iitem,iindex) in goodsList"
				:key='iitem.id'>
					<image class="img" :src="iitem.listPicUrl" background-size="cover"></image>
					<text class="name">{{iitem.name}}</text>
					<!-- <text class="price">￥{{iitem.retailPrice}}</text> -->
					<view class="tx price">
						<text class='pri dzprice'>￥{{iitem.retailPrice}}</text>
						<text class='pri yjprice' v-if="iitem.marketPrice">￥{{iitem.marketPrice}}</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			'isSearchPage', //是否为搜索页面使用，因为和使用在其他页面样式存在点差异，所以添加了这个
			'filterCategory', //筛选条件
			'goodsList' //商品列表
		],
		data() {
			return {
				currentSortType: 'default', //排序类型
				currentSortOrder: 'desc', //升序或降序
				categoryFilter: false, //筛选标志
				categoryId: 0 //筛选条件编号
			}
		},
		computed:{
			selectParameters(){
				return {
					currentSortType: this.currentSortType,
					currentSortOrder: this.currentSortOrder,
					categoryFilter: this.categoryFilter,
				}
			}
		},
		methods: {
			openSortFilter: function(currentId) {
				// console.log('openSortFilter', typeof currentId, currentId);
				switch (currentId) {
					case 'categoryFilter':
						this.categoryFilter = !this.categoryFilter;
						this.currentSortOrder = 'asc';
						break;
					case 'priceSort':
						let tmpSortOrder = 'asc';
						// 这个地方为什么不用个三元表达式？而且还声明一个临时变量
						if (this.currentSortOrder == 'asc') {
							tmpSortOrder = 'desc';
						}
						this.currentSortType = 'price',
						this.currentSortOrder = tmpSortOrder;
						this.categoryFilter = false;
						//发送参数
						this.$emit('getGoodsList',this.selectParameters);
						break;
					default:
						//综合排序
						this.currentSortType = 'default';
						this.currentSortOrder = 'desc';
						this.categoryFilter = false;
						this.$emit('getGoodsList',this.selectParameters);
				}
			},
			selectCategory: function(index) {
				let currentIndex = index; //点击的条件的下标
				let filterCategory = this.filterCategory; //筛选条件数组
				let currentCategory = null; //当前筛选条件
				for (let key in filterCategory) {
					if (key == currentIndex) {
						filterCategory[key].selected = true;
						currentCategory = filterCategory[key];
					} else {
						filterCategory[key].selected = false;
					}
				}
				this.categoryFilter = false;
				this.categoryId = currentCategory.id; //筛选条件编号
				//传输到父组件
				const selectParameters = {
					filterCategory: filterCategory,
					categoryFilter: false,
					categoryId: currentCategory.id
				}
				//此处没有使用全局的selectParameters,属性不同，不好维护，直接另外写一个
				this.$emit('getGoodsList',selectParameters);
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
		/* 此处稍微设置一下显示层级，主要是给app端用 */
		z-index: 1;
	}

	.sort {
		position: relative;
		background: #fff;
		width: 100%;
		height: 78rpx;
		/* 此处稍微设置一下显示层级，主要是给app端用 */
		z-index: 1;
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

	.sort-box .item.active .txt {
		color: #b4282d;
	}

	.sort-box .item.by-price {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/no-3127092a69.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
	}

	.sort-box .item.by-price.active.asc {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/up-636b92c0a5.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
		font-size: 40rpx;
	}

	.sort-box .item.by-price.active.desc {
		background: url(http://shop.beastiot.com/haoyaoshopvf/icon/down-95e035f3e5.png) 155rpx center no-repeat;
		background-size: 15rpx 21rpx;
		font-size: 50rpx;
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
	
	.cate-item-search {
		margin-top: 175rpx;
		height: auto;
		overflow: hidden;
	}
	
	/* 此处注意，需要作区分 */
	.cate-item .b {
	    width: 750rpx;
	    padding: 0 6.25rpx;
	    height: auto;
	    overflow: hidden;
	}
	
	.cate-item .b .item {
	    float: left;
	    background: #fff;
	    width: 365rpx;
	    margin-bottom: 6.25rpx;
	    padding-bottom: 33.333rpx;
	    height: auto;
	    overflow: hidden;
	    text-align: center;
	}
	
	.cate-item .b .item-b{
	  margin-left: 6.25rpx;
	}
	
	.cate-item .item .img {
	    width: 302rpx;
	    height: 302rpx;
	}
	
	.cate-item .item .name {
	    display: block;
	    width: 365.625rpx;
	    height: 35rpx;
	    margin: 11.5rpx 0 22rpx 0;
	    text-align: center;
	    overflow: hidden;
	    padding: 0 20rpx;
	    font-size: 30rpx;
	    color: #333;
	}
	
	.cate-item .item .price {
	    display: block;
	    width: 365.625rpx;
	    height: 30rpx;
	    text-align: center;
	    font-size: 30rpx;
	    color: #b4282d;
	}
	
	.dzprice {
	    color: #b4282d;
	}
	
	.yjprice {
	    margin-left: 20rpx;
	    text-decoration: line-through;
	}
	
	
	
</style>
