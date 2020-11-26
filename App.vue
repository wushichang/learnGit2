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
	
	
	
	
	
	/* 阿里图标 start */
	@font-face {
	  font-family: "iconfont";
	  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM8AAsAAAAABzwAAALtAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCIIIkATYCJAMMCwgABCAFhG0HPBtwBhFVlAlkPwrjZufC1ajUbUU0x1OsLVtZNP7/Rzx8v/Y79923+zV9oDEk00pnOhGPJC9RLFVSgelkvIS9//198yEmrhCFtPHeeWeTkcxkVoUEsP60mdqajrEtwkSYTomdfvqOpN35y6eM8ziNxgiEBOE4uJx+bcF5Dc5lzUFtHBMwwYDG2hRZgSToWcSuiLnoTXgeJzA0Z13sJiUTEKowLhDn+bnpICzp1Z7s0BfalqVVvGj0y205BvAcfz/+ITSEFE3C1L2zxCyI+RLfWzmNXaPjECFYzgplFYl1VOK01b6Pk8bXpaEl5drFtKpQlgr9/xPzbWnL/vAogmghcwyWhUTha+jzc8UsL3zqoxK0qNgH7npQT0+9pYznDarC62tyc0Pv7pjb25TBRq12oFuPJGDRDzUZGGQxDPfoKCPVdcVIDerXaAqc0rXnLpoOLo43Zex334LYdEfsuenWeH39/zDBOTvjTDBOyA3EeQ/VX6IiUUUUpBfcSKoq8rKyLdNh51q5tATPThXE5/j72XjgzdMzTqR5O+W3T6wO/FxZqkh7MND24YbyIEqDyhuCyihmpIayIESOnlaOFNJgZN6wH+m8OZP2v+I3Xt+R26mKiFehpIKPz1VW7O28FWjp9BXIgi9eQGyotgiGrCbf57vOtD0xVjC0XTqAWzLxm66eeXPJIKTLoRCwQRJyoCrOHxoS4dASioYhP/vVIxpiiFUHwKonByxKL2CTWwMOpQ+Ki/sCj94f+JTBATGM5ZYSrshfrAUjxRTiBxQJt+SZdJFkHzDr6kiKoph0QbFFCALXr6b22KIsMcNes1CVgIQb2HGnYV0zGOESE3VzVbPyPGp7k5tw01uIJ1BEoRSIPYBCgrUobK8Wtc8foEynFpGekhb7BRJW0TkIuHwCai9vSSWP8op1lQkpRQARrAF2nBXVLM6AaR9UQgnlyidEjRVPaEVUubu9svkAeUoFKM4okVGJHn2Oo2h1YrmzHfd6AAAA') format('woff2');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconicon-test:before {
	  content: "\e61c";
	}
	
	.iconsousuo:before {
	  content: "\e60a";
	}
	

	/* 阿里图标 end*/
	
</style>
