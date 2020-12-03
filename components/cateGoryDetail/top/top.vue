<template>
	<view class="cate-nav">
		<scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx;" :scroll-left="computedScrollLeft">
			<view 
			v-for="(item,index) in navList" 
			:class="['item', categoryId == item.id ? 'active' : '']" 
			:key='item.id' 
			:id='item.id'
			@click="switchCate">
				<view class="name">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	var timer = null;
	
	export default {
		props: ['scrollLeft', 'navList', 'categoryId'],
		data() {
			return {
				//搞这个东西，属实无奈，app渲染有问题
				computedScrollLeft: 0
			}
		},
		watch:{
			 scrollLeft(newVal){
				clearTimeout(timer); 
				timer = setTimeout(()=>{
					this.computedScrollLeft = newVal;
				},100);
			}
		},
		methods: {
			switchCate: function(event) {
				if (this.categoryId == event.currentTarget.id) {
					return false;
				}
				var clientX = event.detail.x; //相对于屏幕的横坐标
				var currentTarget = event.currentTarget;//相对于标签的横坐标,会从第二个算起。
				let scrollLeft = this.scrollLeft;
				/**
				 * 为什么不是65?  之前加了这个 && currentTarget.offsetLeft>60
				 * 这个是有问题的，可能会有这样的情况 x<60, offsetLeft<60,这样this.offsetLeft会是上次的坐标
				 * 导致再次点击上次的那个位置就不会动了
				 */
				if (clientX < 60) {
					scrollLeft = currentTarget.offsetLeft - 60;
				} else if (clientX > 330) {
					scrollLeft = currentTarget.offsetLeft;
				}
				// console.log('x='+clientX,'offsetLeft='+currentTarget.offsetLeft,'scrollLeft='+scrollLeft);
				const parameters = {
					categoryId: event.currentTarget.id,
					page: 1,
					totalPages: 1,
					goodsList: [],
					nomore: false,
					scrollLeft: scrollLeft
				};
				this.$emit('cateChange',parameters);
			}
		}
	}
</script>

<style>
	.cate-nav {
		position: fixed;
		left: 0;
		top: 0;
		/* 这里有点狠了 */
		z-index: 1000;
	}

	.cate-nav-body {
		height: 84rpx;
		white-space: nowrap;
		background: #fff;
		border-top: 1px solid rgba(0, 0, 0, .15);
		overflow: hidden;
	}

	.cate-nav .item {
		display: inline-block;
		height: 84rpx;
		min-width: 130rpx;
		padding: 0 15rpx;
	}

	.cate-nav .item .name {
		display: inline-block;
		height: 84rpx;
		padding: 0 20rpx;
		line-height: 84rpx;
		color: #333;
		font-size: 30rpx;
		width: auto;
	}

	.cate-nav .item.active .name {
		color: #ab2b2b;
		border-bottom: 2px solid #ab2b2b;
	}
</style>
