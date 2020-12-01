<template>
	<view class="container">
		<!-- 查询 -->
		<search :goodsCount='10'></search>
		<!-- 海报 -->
		<swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
			<swiper-item v-for="item in banner" :key="item.id">
				<navigator :url="item.link">
					<image :src="item.imageUrl" background-size="cover"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 专题精选 -->
		<specialTopic title='专题精选' :topicList="topicList"></specialTopic>
		<!-- 新品 -->
		<new-goods :newGoods='newGoodsList' title="新品首发"></new-goods>
		<!-- 人气推荐 -->
		<hot-goods :hotGoods='hotGoodsList' title="人气推荐"></hot-goods>
		<!-- 普通栏目 -->
		<category v-for="item in categoryList" :item='item' :key='item.id'></category>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');

	import search from '../../components/search/search.vue';
	import newGoods from '../../components/displaySample/newGoods/newGoods.vue';
	import hotGoods from '../../components/displaySample/hotGoods/hotGoods.vue';
	import category from '../../components/displaySample/category/category.vue';
	import specialTopic from '../../components/displaySample/specialTopic/specialTopic.vue';

	export default {
		components: {
			search,
			newGoods,
			hotGoods,
			category,
			specialTopic
		},
		data() {
			return {
				banner: [],
				newGoodsList: [],
				hotGoodsList: [],
				categoryList: [],
				topicList: [] //专题列表
			}
		},
		methods: {
			getIndexUrlBanner() {
				util.request(api.IndexUrlBanner).then((res) => {
					if (res.errno === 0) {
						this.banner = res.data.banner;
					}
				});
			},
			getNewGoodsList() {
				util.request(api.IndexUrlNewGoods).then((res) => {
					if (res.errno === 0) {
						this.newGoodsList = res.data.newGoodsList
					}
				});
			},
			getHotGoods() {
				util.request(api.IndexUrlHotGoods).then((res) => {
					if (res.errno === 0) {
						this.hotGoodsList = res.data.hotGoodsList;
					}
				});
			},
			getCategoryList() {
				util.request(api.IndexUrlCategory).then((res) => {
					if (res.errno === 0) {
						this.categoryList = res.data.categoryList;
					}
				});
			},
			getTopicList() {
				util.request(api.IndexUrlTopic).then((res)=>{
					if (res.errno === 0) {
						this.topicList = res.data.topicList;
					}
				})
			}
		},
		onLoad() {
			this.getIndexUrlBanner();
			this.getNewGoodsList();
			this.getHotGoods();
			this.getCategoryList();
			this.getTopicList();
		}
	}
</script>

<style>
	.banner {
		width: 750rpx;
		height: 360rpx;
		/* height: 417rpx; */
	}

	.banner image {
		width: 100%;
		/* height: 417rpx; */
		height: 360rpx;
	}
</style>
