<template>
	<view>
		<view class='tui-countdown-content' v-if="ntype==0">
			剩余
			<!-- <text class='tui-conutdown-box'>{{model.day}}</text>: -->
			<text class='tui-conutdown-box'>{{model.hou}}</text> :
			<text class='tui-conutdown-box'>{{model.min}}</text> :
			<text class='tui-conutdown-box tui-countdown-bg'>{{model.sec}}</text>
		</view>
		<view class='tui-countdown-content_n' v-if="ntype==1">
			<label class="label">限时秒杀</label>
			<view class='timebox'>
				<view class='timeinfo'>
					<!-- <text class='tui-conutdown-box'>{{model.day}}</text>: -->
					<text class='tui-conutdown-box_n'>{{model.hou}}</text> :
					<text class='tui-conutdown-box_n'>{{model.min}}</text> :
					<text class='tui-conutdown-box_n'>{{model.sec}}</text>
				</view>
			</view>
		</view>
		<view class='tui-countdown-content' v-if="ntype==2">
			剩余
			<!-- <text class='tui-conutdown-box'>{{model.day}}</text>: -->
			<text class='tui-conutdown-box_nn'>{{model.hou}}</text> :
			<text class='tui-conutdown-box_nn'>{{model.min}}</text> :
			<text class='tui-conutdown-box_nn'>{{model.sec}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			endTime: {
				type: String,
				value: 0
			},
			ntype: {
				type: String,
				value: 0
			}
		},
		data() {
			return {
				model: {
					day: '00',
					hou: '00',
					min: '00',
					sec: '00'
				},
				timedown: null
			}
		},
		watch: {
			endTime(newVal) {
				this.countDown();
			}
		},
		methods: {
			timeFormat(param) { //小于10的格式化函数
				return param < 10 ? '0' + param : param;
			},
			countDown() { //倒计时函数
				// 获取当前时间，同时得到活动结束时间数组
				let newTime = new Date().getTime();
				// 对结束时间进行处理渲染到页面
				let endTime = this.endTime;
				let obj = null;
				// 如果活动未结束，对时间进行处理
				if (endTime - newTime > 0) {
					let time = (endTime - newTime) / 1000;
					// 获取天、时、分、秒
					let day = parseInt(time / (60 * 60 * 24));
					let hou = parseInt(time % (60 * 60 * 24) / 3600);
					let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
					let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
					obj = {
						day: this.timeFormat(day),
						hou: this.timeFormat(hou),
						min: this.timeFormat(min),
						sec: this.timeFormat(sec)
					}
				} else { //活动已结束，全部设置为'00'
					obj = {
						day: '00',
						hou: '00',
						min: '00',
						sec: '00'
					}
					//清楚
					clearTimeout(this.timedown)
					var e = {
						success: true
					}
					//清楚倒计时，这里没有像小程序一样抛出去，不想搞
					//this.triggerEvent('downEnd', e, '');
					this.$emit('downEnd',e)
					return false;
				}
				// 渲染，然后每隔一秒执行一次倒计时函数
				this.model = obj;
				//此处请注意，bind(this)好像有点东西
				this.timedown = setTimeout(this.countDown.bind(this), 1000);
			}
		},
		destroyed() {
			clearTimeout(this.timedown);
		}
	}
</script>

<style>
	.tui-conutdown-box {
		display: inline-block;
		font-size: 13px;
	}

	.tui-countdown-content_n {
		width: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.tui-countdown-content_n .label {
		width: 100%;
		text-align: center;
		margin-bottom: 6rpx;
	}

	.tui-countdown-content_n .timebox {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
	}

	.tui-conutdown-box_n {
		display: inline-block;
		font-size: 10px;
		height: 40rpx;
		line-height: 40rpx;
		width: 40rpx;
		background: #000;
		color: #fff;
		text-align: center;
		border-radius: 10rpx;
	}

	.tui-conutdown-box_nn {
		display: inline-block;
		font-size: 15px;
	}
</style>
