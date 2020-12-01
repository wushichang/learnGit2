<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	.container {
	    box-sizing: border-box;
	    background-color: #f4f4f4;
	}
	
	view,image,text,navigator{
	  box-sizing: border-box;
	  padding:0;
	  margin:0;
	}
	
	view,text{
	  font-size: 29rpx;
	  color: #333;
	  font-family: PingFangSC-Light,helvetica,'Heiti SC';
	}
	
	/* 没有商品信息 */
	.empty-view{
	  margin-top: 50%;
	  height: 100%;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	}
	
	.empty-view .icon{
	  height: 120rpx;
	  width: 120rpx;
	  margin-bottom: 10rpx;
	}
	
	.empty-view .text{
	  width: auto;
	  font-size: 28rpx;
	  line-height: 35rpx;
	  color: #999;
	}

	
	/* 阿里图标 start */
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAQYAAsAAAAACJgAAAPKAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqEVIQOATYCJAMQCwoABCAFhG0HRRt9B1GUD0aW7MeB3fBVGIcSi4nThiXN5gD/7/Hwtd/rufv2I6ogKbQ8PirjCYxIJJSk69ToehaO/68u+zMVDtgI9O7J1AQ6uSeHS1dHUHewitAL6LRXMdZpAfp+czVdQLnCZEmyJDpWqAB/gbIvkx64KnEHx4yXBZa30pHNKCM5EnDcOqCPSCuyf5AX9B/GLi7jaQJ1U3wpjs9u7k1Npp0UiIfAeze1mEMuYYSquZxzZRYfoKyanpUTwHv39+MnbIYTSamgPevk6vhlNl/qz7yQ+F+EpyKHvD8fmOsosAFk4iY3cKboFzYgdam2ZBeo6r5EX1sez7z+/8eqtRiq+F8ehSSIMq21CbZRseCLylSERg9ok6DRC6pO4EkZVNHAJ+AXjTxhj4okzalUzRZ4YHOBNTaX/meCNDfmvOzPXnQUT5eaaktE+3rBmMZHPZ6PS/mFvvbcJcf+zBkry6x6bIwGohsdFcfU+h5ZGs/oGaOV0ep94wokyWpGIijFdzBIlosXFvjFRbK8HL+0lDgmUtToPkbgkRAzLrHxghAr99AkXkcX5flmgblZzyi02bNnOYKMnTkkZT3at6ThpWV8z+JdxYWFoCyOc4zJmMuIceSsByhsPkj1Wr6LZhczinupg/ATqAMVwFEXfOZ8LlDcyR7WeWLwxeCEM3vSL03coDac05zppXdnVBPONucJakJlU02Mq2iviLysG/5/OIymp9FhXWrLLE24j/Efp+eMvJ4f0mSOzhiVB31zzobwCsPVqzDg1wgx6ND09CErhqamkWOdmoJ355osP69frc/4wJJdcnslJgRXtuMKIgTM9gosCFL+3pUCgQoAAPh/EtUiDACAKpUf2dIOOo68foW/MX7x85l0vfHF12ojg8/PpD438f+kHbRTvE9lbeWLV9acyLJac+YsakyF0pzdqnIf29XV8bor9G31ERqB0BeqrBJCUjEJhaoFRMZsQEnDNpRV7UHdurjrGwaqFEWuYU03gNB1DZK2j1DomkRkzCaUjL2Fsm4gqDuN1h0blqKwsRe8K74o648KPzl1Dbc2vPZbeFn8LlG1y3yE2CBN/hZrsnyOFNLHOdXf3rRGXcoTTsgGnoc4ZqoQDvGpwwLV0wzjvLxvGmZzYhqOCHin4AvJ8ocU+sRSrj1fNVI/fws8mdg7KekpiT8CYQW7E38W1hqIc0Naq+dc9q/2zTNVQ7n4uDyCJYgN+iDWC4xU5B8Wgk9qqKBF7mQGo1l5dQ3D8U3JFV6AOu0BOVIUkaOkfIEYivr2XzCogdWK5cxmbAwAAA==') format('woff2');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icondelete:before {
	  content: "\e61e";
	}
	
	.iconicon-test:before {
	  content: "\e61c";
	}
	
	.iconsousuo:before {
	  content: "\e60a";
	}
	

	/* 阿里图标 end*/
	
</style>
