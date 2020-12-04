<template>
	<view class='a-section fx-selected' v-if="topicList.length">
		<!-- :isSwitchTab="true"  之后记得添加这个属性-->
	    <top-nav url="../topic/topic" :title="title"></top-nav>
	    <view class='b'>
	       <view class='selBox cont'>
	          <view class='li left'>
	            <navigator :url="'../topicDetail/topicDetail?id='+topicList[0].id">
					<image class='picl' :src="topicList[0].scenePicUrl"></image>
	            </navigator>
	          </view>
	          <view class='li right'>
	             <view class='tb'>
	                <navigator :url="'../topicDetail/topicDetail?id='+topicList[1].id">
						<image class='picr' :src="topicList[1].scenePicUrl"></image>
	                </navigator>
	             </view>
	             <view class='tb'>
	                <navigator :url="'../topicDetail/topicDetail?id='+topicList[2].id">
						<image class='picr' :src="topicList[2].scenePicUrl"></image>
	                </navigator>
	             </view>
	          </view>
	       </view>
	    </view>
	 </view>

</template>

<script>
	import topNav from '../topNav/topNav.vue';
	
	export default{
		props: {title: String,topicList:Array},
		components: {
			topNav
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.a-section {
	    width: 750rpx;
	    height: auto;
	    overflow: hidden;
	    background: #fff;
	    color: #333;
	    margin-bottom: 20rpx;
	}
	
	.fx-selected {
	    height: 532rpx;
	    width: 100%;
	}
	
	.fx-selected .selBox {
	    width: 710rpx;
	    margin: 0 auto;
	    display: flex;
	    flex-flow: row nowrap;
	    justify-content: space-between;
	    align-items: center;
	}
	
	.fx-selected .selBox .li {
	    height: 392rpx;
	    width: 350rpx;
	}
	
	.fx-selected .left {
	    height: 100%;
	    width: 100%;
	    overflow: hidden;
	    background: #cccccc;
	}
	
	.fx-selected .left .picl {
	    height: 392rpx;
	    width: 350rpx;
	}
	
	.fx-selected .right {
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: center;
	}
	
	.fx-selected .right .tb {
	    height: 191rpx;
	    width: 350rpx;
	    overflow: hidden;
	    background: #cccccc;
	}
	
	.fx-selected .right .tb .picr {
	    height: 191rpx;
	    width: 350rpx;
	}
</style>
