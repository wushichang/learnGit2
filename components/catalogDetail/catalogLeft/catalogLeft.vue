<template>
	<scroll-view class="nav"scroll-y="true">
		<view 
		:class="['item' , currentCategory.id == item.id ? 'active' : '']" 
		v-for="(item,index) in navList" 
		:key="item.id"
		:id='item.id'
		 @click="switchCate">
			{{item.name}}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: ['currentCategory','navList'],
		data() {
			return {

			}
		},
		methods: {
			switchCate: function(event) {
				if (this.currentCategory.id == event.currentTarget.id) {
					return false;
				}
				// this.getCurrentCategory(event.currentTarget.id);
				this.$emit('switchCate',event.currentTarget.id);
			}
		}
	}
</script>

<style>
	.nav {
		width: 162rpx;
		height: 100%;
		box-sizing: border-box;
	}

	.nav .item {
		text-align: center;
		line-height: 90rpx;
		width: 162rpx;
		height: 90rpx;
		color: #333;
		font-size: 28rpx;
		border-left: 6rpx solid #fff;
	}

	.nav .item.active {
		color: #ab2b2b;
		font-size: 36rpx;
		border-left: 6rpx solid #ab2b2b;
	}
</style>
