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
		 <!-- 新品 -->
		 <new-goods :newGoods='newGoodsList' className="a-new" title="新品首发"></new-goods>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	const api = require('../../config/api.js');
	
	import search from '../../components/search/search.vue';
	import newGoods from '../../components/displaySample/newGoods/newGoods.vue';
	
	export default {
		components:{
			search,
			newGoods
		},
		data() {
			return {
				banner: [],
				newGoodsList: []
			}
		},
		methods: {
			getIndexUrlBanner(){
				util.request(api.IndexUrlBanner).then((res)=>{
				  if (res.errno === 0) {
					this.banner = res.data.banner;
				  }
				});
			},
			getNewGoodsList(){
				util.request(api.IndexUrlNewGoods).then((res)=>{
				  if (res.errno === 0) {
					this.newGoodsList = res.data.newGoodsList
				  }
				});
			}
		},
		onLoad() {
			this.getIndexUrlBanner();
			this.getNewGoodsList();
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
