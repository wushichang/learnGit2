<template>
	<view class="container">
		<product-post :bannerInfo='bannerInfo'></product-post>
		<product-display :filterCategory='filterCategory'  :categoryFilter='categoryFilter' :goodsList='goodsList' @getGoodsList='getGoodsListParameters'></product-display>
		<!-- 小程序人气推荐页面没有看到这个，暂时就不写成组件了 -->
		<view class="empty-view" v-show="goodsList.length <= 0">
		  <image class="icon" src="../../static/images/allorder.png"></image>
		  <text class="text">无商品数据</text>
		</view>
	</view>
</template>

<script>
	import productPost from '../../components/productPost/productPost.vue';
	import productDisplay from '../../components/productDisplay/productDisplay.vue';

	const util = require('../../util/util');
	const api = require('../../config/api.js');

	export default {
		components: {
			productPost,
			productDisplay
		},
		data() {
			return {
				//海报图片
				bannerInfo: {
					'imgUrl': '',
					'name': ''
				},
				categoryFilter: false,
				filterCategory: [],
				goodsList: [],
				categoryId: 0,
				newFlag: 1, //这个属性不知道干嘛的
				currentSortType: 'default',
				currentSortOrder: 'desc',
				page: 1,
				size: 1000
			}
		},
		methods: {
			getGoodsList() {
				const headParams = {
					isNew: 1,
					page: this.page,
					size: this.size,
					order: this.currentSortOrder,
					sort: this.currentSortType,
					categoryId: this.categoryId,
					newFlag: this.newFlag
				};
				util.request(api.GoodsList, headParams).then((res)=>{
					if (res.errno === 0) {
						this.goodsList = res.data.goodsList;
						this.filterCategory = res.data.filterCategory;
					}
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
			},
			getData() {
				util.request(api.GoodsHot).then((res) => {
					if (res.errno === 0) {
						console.log('getData');
						this.bannerInfo = res.data.bannerInfo; //海报信息
						this.getGoodsList(); //
					}
				});
			}
		},
		onLoad() {
			this.getData();
		}
	}
</script>

<style>
	page{
	    background: #f4f4f4;
	}
</style>
