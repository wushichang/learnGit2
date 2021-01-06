<template>
	<scroll-view class="container" scroll-y="true" style="height: 100%;">
		<view class="search-header">
			<view class="input-box">
				<view class="iconfont iconsousuo"></view>
				<!-- 查询默认提示信息的时候，后台返回null，placeholder这个地方取值就会报错，还不好找问题 -->
				<input name="input" class="searchValue" focus="true" confirm-type="search" v-model="keyword" :placeholder="defaultKeyword.keyword || ''"
				 @focus="inputFocus" @confirm="onKeywordConfirm" />
				<view v-show="keyword" class="iconfont iconicon-test del" @click="clearKeyword"></view>
			</view>
			<view class="right" @click="closeSearch">取消</view>
		</view>
		<!-- 历史记录 -->
		<view class="no-search" v-show="!searchStatus">
			<view class="serach-keywords search-history" v-if=" historyKeyword.length && !keyword">
				<view class="h">
					<text class="title">历史记录</text>
					<view class="iconfont icondelete" @click="clearHistory"></view>
				</view>
				<view class="b">
					<!-- hover-class 暂时没写 -->
					<view class="item" @click="onKeywordTap(item)" v-for="item in historyKeyword" :key="item" hover-class="navigator-hover">{{item}}</view>
				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="serach-keywords search-hot" v-if="!keyword">
				<view class="h">
					<text class="title">热门搜索</text>
				</view>
				<view class="b">
					<!-- hover-class暂时没有指定 -->
					<view :class="['item',item.hotFlag === 1 ? 'active' : '']" @click="onKeywordTap(item.keyword)" hover-class="navigator-hover"
					 v-for="item in hotKeyword" :key="item.keyword">{{item.keyword}}</view>
				</view>
			</view>

			<!-- hover-class暂时没有指定 -->
			<view class="shelper-list" v-if="keyword">
				<view class="item" hover-class="navigator-hover" v-for="item in helpKeyword" @click="onKeywordTap(item.keyword)"
				 :key="item.keyword">{{item}}</view>
			</view>
		</view>

		<!-- 查询结果  小程序用的wx-if ,感觉还是的改一下不用 v-if  *之前没有用Boolean包着，竟然出不来，我尼玛-->
		<view class="search-result" v-show="showFlag">
			<product-display :isSearchPage="true" :filterCategory='filterCategory' :goodsList='goodsList' @getGoodsList="getGoodsListParameters">
			</product-display>
		</view>
		<!-- 不知道反向的表达方式，先凑合用着 -->
		<view class="search-result-empty" v-show="!showFlag">
		    <image class="icon" src="http://shop.beastiot.com/haoyaoshopvf/icon/noSearchResult-7572a94f32.png"></image>
		    <text class="text">您寻找的商品还未上架</text>
		</view>
	</scroll-view>
</template>

<script>
	const util = require('../../util/util');
	const api = require('../../config/api.js');

	import productDisplay from '../../components/productDisplay/productDisplay.vue';

	export default {
		components: {
			productDisplay
		},
		data() {
			return {
				keyword: '', //输入框值
				searchStatus: false, //查询转态
				defaultKeyword: {}, //输入框提醒
				historyKeyword: [], //历史记录关键词
				hotKeyword: [], //热点关键词
				helpKeyword: [], //提示词
				goodsList: [], //商品列表
				page: 1, //页码
				size: 20, //每页行数
				currentSortType: 'default', //排序
				currentSortOrder: 'desc', //升序OR降序
				categoryId: 0, //类目编号
				categoryFilter: false, //条件查询表示
				filterCategory: [] //条件查询内容
			}
		},
		computed:{
			//是否显示没有商品图标
			showFlag(){
				return Boolean(this.searchStatus && this.goodsList.length);
			}
		},
		methods: {
			inputFocus(e) {
				// 此处的提示在小程中存在，我不知道它有什么作用，先注释掉
				// this.getHelpKeyword();
			},
			closeSearch() {
				uni.navigateBack();
			},
			clearKeyword() {
				this.keyword = '';
				this.searchStatus = false;
			},
			getSearchKeyword() {
				util.request(api.SearchIndex).then((res) => {
					if (res.code === 0) {
						this.historyKeyword = res.data.historyKeywordList;
						//万万没想到，后台返回的defaultKeyword是空对象
						this.defaultKeyword = res.data.defaultKeyword || {};
						this.hotKeyword = res.data.hotKeywordList;
					}
				});
			},
			clearHistory() {
				this.historyKeyword = [];
				util.request(api.SearchClearHistory, {}, 'POST')
					.then((res) => {
						console.log('清除成功');
					});
			},
			onKeywordTap(key) {
				this.keyword = key;
				this.page = 1;
				this.categoryId = 0;
				this.goodsList = [] ;
				this.getGoodsList();
			},
			getHelpKeyword() {
				if (!this.keyword) return;
				util.request(api.SearchHelper, {
					keyword: this.keyword
				}).then((res) => {
					if (res.code === 0) {
						this.helpKeyword = res.data;
					}
				});
			},
			onKeywordConfirm(event) {
				this.getSearchResult(event.detail.value);
			},
			getSearchResult(keyword) {
				this.page = 1;
				this.categoryId = 0;
				this.goodsList = [];
				this.getGoodsList();
			},
			getGoodsList() {
				const parameters = {
					keyword: this.keyword,
					page: this.page,
					size: this.size,
					sort: this.currentSortType,
					order: this.currentSortOrder,
					categoryId: this.categoryId
				};
				util.request(api.GoodsList, parameters).then((res) => {
					if (res.code === 0) {
						// console.log('获取商品信息', res);
						this.searchStatus = true;
						this.categoryFilter = false;
						this.goodsList = res.data.goodsList;
						this.filterCategory = res.data.filterCategory;
						this.page = res.data.currentPage;
					}
					//重新获取关键词
					this.getSearchKeyword();
				});
			},
			getGoodsListParameters(selectParameters) {
				this.categoryFilter = selectParameters.categoryFilter;
				if (selectParameters.categoryId) {
					//筛选
					this.filterCategory = selectParameters.filterCategory;
					this.categoryId = selectParameters.categoryId;
					this.page = 1;
					this.goodsList = [];
				} else {
					this.currentSortType = selectParameters.currentSortType;
					this.currentSortOrder = selectParameters.currentSortOrder;
				}
				this.getGoodsList();
			}
		},
		watch: {
			keyword(newValue) {
				this.searchStatus = false;
				this.getHelpKeyword();
			}
		},
		onLoad() {
			//获取推荐，历史，热点词汇
			this.getSearchKeyword();
		}

	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #f4f4f4;
	}

	.container {
		min-height: 100%;
		background-color: #f4f4f4;
	}

	.search-header {
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 91rpx;
		display: flex;
		background: #fff;
		border-bottom: 1px solid rgba(0, 0, 0, .15);
		padding: 0 31.25rpx;
		font-size: 29rpx;
		color: #333;
	}

	.search-header .input-box {
		position: relative;
		margin-top: 16rpx;
		float: left;
		width: 0;
		flex: 1;
		height: 59rpx;
		line-height: 59rpx;
		padding: 0 20rpx;
		background: #f4f4f4;
		border-radius: 30rpx;
	}

	.iconsousuo {
		font-size: 32rpx;
	}

	.search-header .searchValue {
		position: absolute;
		top: 0;
		left: 40rpx;
		width: 506rpx;
		height: 59rpx;
		padding-left: 30rpx;
	}

	.search-header .del {
		color: #cccccc;
		font-size: 40rpx;
		position: absolute;
		top: 3rpx;
		right: 10rpx;
		z-index: 10;
	}

	.search-header .right {
		margin-top: 24rpx;
		margin-left: 31rpx;
		margin-right: 6rpx;
		width: 58rpx;
		height: 43rpx;
		line-height: 43rpx;
		float: right;
	}

	.no-search {
		height: auto;
		overflow: hidden;
		margin-top: 91rpx;
	}

	.serach-keywords {
		background: #fff;
		width: 750rpx;
		height: auto;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.serach-keywords .h {
		padding: 0 31.25rpx;
		height: 93rpx;
		line-height: 93rpx;
		width: 100%;
		color: #999;
		font-size: 29rpx;
	}

	.serach-keywords .b {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding-left: 31.25rpx;
	}

	.serach-keywords .title {
		display: block;
		width: 120rpx;
		float: left;
	}

	.icondelete {
		float: right;
	}

	.serach-keywords .item {
		display: inline-block;
		width: auto;
		height: 48rpx;
		line-height: 48rpx;
		padding: 0 15rpx;
		border: 1px solid #999;
		margin: 0 31.25rpx 31.25rpx 0;
		font-size: 24rpx;
		color: #333;
	}

	.serach-keywords .item.active {
		color: #b4282d;
		border: 1px solid #b4282d;
	}

	.shelper-list {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
		padding: 0 31.25rpx;
	}

	.shelper-list .item {
		height: 93rpx;
		width: 687.5rpx;
		line-height: 93rpx;
		font-size: 24rpx;
		color: #333;
		border-bottom: 1px solid #f4f4f4;
	}
	
	.search-result-empty{
	    width: 100%;
	    height: 100%;
	    padding-top: 300rpx;
	}
	
	.search-result-empty .icon{
	    margin: 0 auto;
	    display: block;
	    width: 240rpx;
	    height: 240rpx;
	}
	
	.search-result-empty .text{
	    display: block;
	    width: 100%;
	    height: 40rpx;
	    font-size: 28rpx;
	    text-align: center;
	    color: #999;
	}
</style>
