<template>
	<view class="btns">
		<view :class="['prev' , page <= 1 ? 'disabled' : '']" @click="scrollPage('pre')">上一页</view>
		<view :class="['next' , (count / size) < page +1 ? 'disabled' : '']" @click="scrollPage('next')">下一页</view>
	</view>
</template>

<script>
	export default {
		// 此处可以用一个对象包含，简单点弄算了
		props: ['showPage','page','count','size'],
		data() {
			return {

			}
		},
		methods: {
			scrollPage(event) {
				let page = this.page;
				switch(event){
					case 'pre':
						if(this.page <= 1){
							return false;
						}
					
						page --;
						break;
					case 'next':
						if (this.page + 1 > Math.ceil(this.count / this.size)) {
							return true;
						}
						page++;
					break;
				}
				//换页
				this.$emit('scrollPage',this.page);
				
			}
		}
	}
</script>

<style>
	.btns {
		width: 750rpx;
		height: 108rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.btns view {
		height: 108rpx;
		line-height: 108rpx;
		width: 50%;
		float: left;
		font-size: 29rpx;
		color: #333;
		text-align: center;
	}

	.btns .prev {
		border-right: 1px solid #D9D9D9;
	}

	.btns .disabled {
		color: #ccc;
	}
</style>
