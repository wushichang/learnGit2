<template>
	<view class="empty-view" v-if="showFlag">
	  <image class="icon" src="../../static/images/allorder.png"></image>
	  <text class="text">无商品数据</text>
	</view>
</template>

<script>
	export default{
		props: {
			showFlag: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
</style>
