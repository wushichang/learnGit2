<template>
	<view class="empty-view" v-show="showFlag">
	  <image class="icon" src="../../static/images/allorder.png"></image>
	  <text class="text">无商品数据</text>
	</view>
</template>

<script>
	export default{
		props: {showFlag:false},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
</style>
