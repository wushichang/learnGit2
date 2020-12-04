<template>
	<view class="container">
		<search :goodsCount='goodsCount'></search>
		<view class="catalog">
			<catalog-left :currentCategory='currentCategory' :navList='navList' @switchCate='switchCate'></catalog-left>
			<catalog-right :currentCategory='currentCategory'></catalog-right>
		</view>
	</view>
</template>

<script>
	import search from '../../components/search/search.vue';
	import catalogLeft from '../../components/catalogDetail/catalogLeft/catalogLeft.vue';
	import catalogRight from '../../components/catalogDetail/catalogRight/catalogRight.vue';

	const util = require('../../util/util');
	const api = require('../../config/api.js');

	export default {
		components: {
			search,
			catalogLeft,
			catalogRight
		},
		data() {
			return {
				goodsCount: 0,
				currentCategory: {},
				navList: []
			}
		},
		methods: {
			getCatalog() {
				uni.showLoading({
					title: '加载中...',
				});
				util.request(api.CatalogList).then((res) => {
					this.navList = res.data.categoryList;
					this.currentCategory = res.data.currentCategory;
					uni.hideLoading();
				});
			},
			getGoodsCount() {
				util.request(api.GoodsCount).then((res) => {
					this.goodsCount = res.data.goodsCount;
				});
			},
			switchCate(id) {
				this.getCurrentCategory(id);
			},
			getCurrentCategory(id) {
				util.request(api.CatalogCurrent, {
						id: id
					}).then((res)=>{
						this.currentCategory = res.data.currentCategory;
					});
			}
		},
		onLoad() {
			this.getCatalog();
			this.getGoodsCount();
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.container {
		background: #f9f9f9;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.catalog {
		flex: 1;
		width: 100%;
		background: #fff;
		display: flex;
		border-top: 1px solid #fafafa;
	}
</style>
