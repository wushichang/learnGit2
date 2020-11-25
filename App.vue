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
	}
	
	
	
	
	
	/* 阿里图标 */
	@font-face {
	  font-family: "iconfont";
	  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALUAAsAAAAABngAAAKGAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBBIEjATYCJAMICwYABCAFhG0HMBvJBciemjwp0mYSKDw2y5Y1UWEDIojW0Nm7CwHI+LBF0FFxESY2XCGrXIUBdPWsq//Htd9DJZHX8O3/a/yEWTqrX7c733aCayb90IHQqB6iWLVKT/AMbdLVxQFjnQf0mtG2acJ/cDn90fJA5gHlMsfkNnBgaYBjLYqsSCJvGLvgBR4n0GjUkJqt6UUdmhX2uEDcOFYRmgt+RWGpeqG2YWkRb9SoT/fpPfAafT/+UaKZpCazK/aupyow+jOdjHxX3bkKEAECWl2DjGWgEEeN8R11glHrNMbrTYJjlQY/W6sqMIqj6gT76+ziZjAM+c8k8ISPWpxASbrnge1JV5P6OtbNnhufSiagk0Z71bh41d3Sbcmm7Jpyzm128H1EdF8uvA6vwkT+06eq780fP9WFmo8f4fbba/j/epcLf33G0WxLYhhEbhNhmCltWxDT5MifkqYBowDV5bd5VA2C1t6Xn+/yf3NbAT++ej8ib3XFMCeoP4sj+FuCgW3FENmGVDRBozOZnzQ2oVEjqsDuTi9T1T23Zg31BQGDpM4IZPWm0UJchhpNVqBWvVVotGRmdZMukTpRGrDoEEBodwVJq3eQtXtCC/EZavT6hlrtUQeNToItm8yG01pEiwmtoNIqcso8ZK4paY1LVWqlfjHKiyKaSaPYCaEszpRTMzSk0RIz4iVLSRKGWMQDNA1Oo77PkYi4S8sJtpNE5AhhTW/CZR5Aq00RqihBVSAlqxBHGRdiQedEa+XzKsqS8hVFHVV1dhMViTm9I1lYZgA6Iw8HVT3KK7ElFkUiwSBMhAsg02AQ5fNxiGge5KLKEpg9oVzIIcg2oqFyvL0y+IE8VoetSeH0y2pveRqnHAAAAA==') format('woff2');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconsousuo:before {
	  content: "\e60a";
	}
	
	
</style>
