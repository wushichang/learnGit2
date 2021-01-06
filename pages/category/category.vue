<template>
	<view class="container">
		<top :categoryId='categoryId' :scrollLeft='scrollLeft' :navList='navList' @cateChange='cateChange'></top>
		<category-content 
		:scrollTop='scrollTop' 
		:currentCategory='currentCategory' 
		:goodsList='goodsList' 
		:nomore='nomore' 
		:nomoreText='nomoreText' 
		:loadmoreText='loadmoreText'>
		</category-content>
		<no-goods :showFlag="Boolean(goodsList.length <= 0)"></no-goods>
	</view>
</template>

<script>
	import top from '../../components/cateGoryDetail/top/top.vue';
	// 原本名称是content,好像有问题，换个名字
	import categoryContent from '../../components/cateGoryDetail/categoryContent/categoryContent.vue';
	import noGoods from '../../components/noGoods/noGoods.vue';
	

	const util = require('../../util/util.js');
	const api = require('../../config/api.js');

	export default {
		components: {
			top,
			categoryContent,
			noGoods
		},
		data() {
			return {
				goodsList: [], //商品列表、
				navList: [],//栏目列表
				categoryId: 0, //栏目编号
				currentCategory: {}, //当前选项
				scrollLeft: 0, //横向滑块位置
				scrollTop: 0, //纵向滑块位置
				scrollHeight: 0, //滑块高度
				page: 1, //页码
				size: 10, //每页行数
				loadmoreText: '正在加载更多数据',
				nomoreText: '全部加载完成',
				nomore: false,
				totalPages: 1 //总共页数
			}
		},
		methods: {
			getCategoryInfo() {
				util.request(api.GoodsCategory, {
					id: this.categoryId
				}).then((res) => {
					if (res.code == 0) {
						this.navList = res.data.brotherCategory;
						this.currentCategory = res.data.currentCategory;
						//nav位置
						let currentIndex = 0;
						let navListCount = this.navList.length;
						for (let i = 0; i < navListCount; i++) {
							currentIndex += 1;
							if (this.navList[i].id == this.categoryId) {
								break;
							}
						}
						/**
						 * 这个地方我感觉写得不好，每个选项的宽度换了，这就容易出问题了
						 * 可是scroll-into-view用不了，心态崩了
						 * 而且这个navListCount / 2属实搞不懂，这里的代码应该是有逻辑问题的
						 * 为什么不是65？
						 * top组件中已经计算了scrollLeft的值，为什么这里又要来？
						 * （因为top没有计算出来，这些逻辑感觉需要优化，不够清晰）
						 * y
						 */
						if (currentIndex > navListCount / 2 && navListCount > 5) {
							this.scrollLeft = currentIndex * 60;
						}
						this.getGoodsList();
					} else {
						//这里可以报错
						
					}

				});
			},
			getGoodsList() {
				if (this.totalPages <= this.page - 1) {
					this.nomore = true;
					return;
				}
				util.request(api.GoodsList, {
					categoryId: this.categoryId,
					page: this.page,
					size: this.size
				}).then((res) => {
					this.goodsList = this.goodsList.concat(res.data.goodsList);
					this.page=  res.data.currentPage + 1;
					this.totalPages = res.data.totalPages;
				});
			},
			cateChange(parameters){
				this.categoryId = parameters.categoryId;
				this.goodsList = parameters.goodsList;
				this.nomore = parameters.nomore;
				this.page = parameters.page;
				this.scrollLeft = parameters.scrollLeft;
				this.totalPages = parameters.totalPages;
				this.getCategoryInfo();
			}
		},
		onLoad(options) {
			this.categoryId = options.id || 0;
			this.getCategoryInfo();
		},
		onReachBottom() {
			console.log('到底了');
			this.getGoodsList();
		}
	}
</script>

<style>
	.container {
		background: #ffffff;
	}
</style>
