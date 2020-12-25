<template>
	<div id="apps">
		<music ref="music" :play="play" @clicked="clicked"></music>
		<div class="page" :style="entryBgStyle" style="">
			<img class="clogo" :src="skin.logo" />
			<img class="botImg" src="../../assets/login.png" />
			<div class="loginbox">
				<img style="width: 40%;" src="../../assets/erweima.png" />
				<div class="loginText">
					<p>请扫描上方二维码下载美的美居APP</p>
					<p>或直接打开已安装的美的美居APP</p>
					<p>获取你的冰箱专属年度报告</p>
				</div>
			</div>
			<div class="botBtnBox">
				<div id="copyBtn0" class="btn" @click="copyUrl0">分享链接</div>
			</div>
		</div>

	</div>
</template>

<script>
	import music from '@/components/music.vue'
	import mideaBg from '@/images/midea/mainBg.png'
	import hualingBg from '@/images/hualing/mainBg.png'
	import colmoBg from '@/images/colmo/mainBg.png'
	import nightBg from '@/images/midea/nightBg.png'
	import mdLogo from '@/images/midea/logo.png';
	import hlLogo from '@/images/hualing/logo.png';
	import coLogo from '@/images/colmo/logo.png';
	import mdLoading from '@/images/midea/loadingImg.png'
	import hlLoading from '@/images/hualing/loadingImg.png'
	import coLoading from '@/images/colmo/loadingImg.png'
	import mdMainT from '@/images/midea/together.png'
	import hlMainT from '@/images/hualing/together.png'
	import coMainT from '@/images/colmo/together.png'
	import mdMainImg from '@/images/midea/mainImg.png'
	import hlMainImg from '@/images/hualing/mainImg.png'
	import coMainImg from '@/images/colmo/mainImg.png'
	import mdentryBg from '@/images/midea/entryBg.png'
	import hlentryBg from '@/images/hualing/entryBg.png'
	import coentryBg from '@/images/colmo/entryBg.png'

	import http from '@/api/request.js';
	import ClipboardJS from 'clipboard';
	const url = location.href;
	//fridgeId
	//brand 0 美的   1colmo 2 华凌
	var fridgeId = undefined; //145135535560333
	var brand = 1;
	var params = {};
	var cloudTimer = undefined;
	(() => {
		//获取url参数
		let str = url.split('?');
		str = str[1]
		if(str) {
			let ar = str.split('&');
			ar.map((v, k) => {
				let arr = v.split('=');
				params[arr[0]] = arr[1]
			})
		}
		if(params.brand || params.brand == 0) {

		} else {
//			let ran = Math.ceil(Math.random() * 3);
			let ran=0;
			params.brand = ran;
		}
	})();

	function isMeiju() {
		var ua = navigator.userAgent.toLowerCase()
		if(/meiju|msmart/.test(ua)) {
			return true
		} else {
			return false
		}
	}
	var meiju = isMeiju();
	export default {
		name: 'App',
		data: () => ({
			nightBgStyle: {
				backgroundImage: 'url(' + nightBg + ')',
				backgroundSize: 'cover'
			},
			play: false,
			rate: 0,
			text: '请耐心等待',
			beforeLoaded: true,
			showArrow: true,
			dataObj: {
				registerDate: '2020-12-16'
			},
			brand: params.brand,
			mdLogo: mdLogo,
			hlLogo: hlLogo,
			meiju: meiju,
			fridgeId: params.fridgeId,
			showMe: false,
			showHe: false,
			showNotice: false,
		}),
		computed: {
			status() {
				//				return 3
				if(this.meiju) {
					if(this.fridgeId) {
						//美居插件里
						return 3
					} else {
						//美居内插件外
						return 2
					}
				} else {
					if(this.fridgeId) {
						//别人分享的
						return 1
					} else {
						//普通链接
						return 0
					}
				}
			},
			skin() {
				let obj = {};
				if(this.brand == 1) {
					obj.logo = coLogo;
					obj.loadingImg = coLoading; //加载动画圈
					obj.ppText = 'colmo'; //品牌名
					obj.mainT = coMainT; //together图
					obj.mainImg = coMainImg; //主页原件
					obj.entryBg = coentryBg; //主页背景
				} else if(this.brand == 2) {
					obj.logo = hlLogo;
					obj.loadingImg = hlLoading;
					obj.ppText = '华凌';
					obj.mainT = hlMainT;
					obj.mainImg = hlMainImg;
					obj.entryBg = hlentryBg;
				} else {
					obj.logo = mdLogo;
					obj.loadingImg = mdLoading;
					obj.ppText = '美的';
					obj.mainT = mdMainT;
					obj.mainImg = mdMainImg;
					obj.entryBg = mdentryBg;
				}
				return obj
			},
			titleStyle() {
				let background = undefined;
				let color = undefined;
				if(this.brand == 1) {
					background = '#B8B8B8';
					color = '#FFFFFF';
				} else if(this.brand == 2) {
					background = '#968EFD';
					color = '#FFFFFF';
				} else {
					background = '#FFD580';
					color = '#B35903';
				}
				return {
					background,
					color
				}
			},
			entryBgStyle() {
				let bg = undefined;
				if(this.brand == 1) {
					bg = coentryBg
				} else if(this.brand == 2) {
					bg = hlentryBg
				} else {
					bg = mdentryBg
				}
				return {
					backgroundImage: 'url(' + bg + ')',
					backgroundSize: 'cover'
				}
			},
			bgBoxStyle() {
				let bg = undefined;
				if(this.brand == 1) {
					bg = this.meiju ? colmoBg : mideaBg
				} else if(this.brand == 2) {
					bg = hualingBg
				} else {
					bg = mideaBg
				}
				return {
					backgroundImage: 'url(' + bg + ')',
					backgroundSize: 'cover'
				}
			},
		},
		components: {
			music
		},
		filters: {
			dateFilter(str) {
				let arr = str.split('-');
				return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
			}
		},
		methods: {
			initCloud() {
				var cld = document.querySelectorAll('.cloud');
				var tWidth = document.body.clientWidth;
				var ar = [-1, 1];
				cloudTimer = setInterval(() => {
					for(let i = 0; i < cld.length; i++) {
						let css = window.getComputedStyle(cld[i], null) || cld[i].currentStyle;
						let left = parseInt(css.left) + 1;
						if(left > tWidth) {
							left = -cld[i].offsetWidth;
						}
						cld[i].style.cssText = 'left:' + left + 'px;';
					}
				}, 100)
			},
			closeCloud() {
				clearInterval(cloudTimer);
			},
			noticeClick() {
				this.showNotice = !this.showNotice;
			},

			toSeeMe() {
				this.showMe = true;
			},
			toSeeMe2() {
				location.href = './main.html?brand=' + params.brand;
			},
			copyUrl0() {

				if(this.meiju) {
					let ppT;
					if(this.brand == 1) {
						ppT = 'COLMO'
					} else if(this.brand == 2) {
						ppT = '华凌'
					} else {
						ppT = '美的'
					}
					let url = window.location.href.split('main.html')[0];
					let params = {
						types: ['wx', 'wxTimeline'], //分享类型数组，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
						title: '2020，那些我不知道的冰箱故事', // 分享标题
						desc: ppT + '智能冰箱2020年度报告', // 分享描述
						link: url, // 分享链接
						imgUrl: 'https://midea-images.mideav.com/AnnualReport20/share.png', // 分享图标
					}
					window.bridge.showSharePanel(params, res => {
						//						xtip.msg('分享成功', {
						//							pos: 'b'
						//						})
					}, err => {})
				} else {
					var clipboard = new ClipboardJS('#copyBtn0', {
						text: function() {
							let url = window.location.href.split('main.html')[0];
							return url;
						}
					});
					clipboard.on('success', function(e) {
						xtip.msg('链接已复制，可去其他地方粘贴分享', {
							pos: 'b'
						})
					});
					clipboard.on('error', function(e) {
						xtip.msg('您手机不支持复制，请通过其他途径分享', {
							pos: 'b'
						})
					});
				}
			},
			copyUrl(a) {
				var clipboard = new ClipboardJS('#copyBtn', {
					text: function() {
						let url = window.location.href.split('?')[0];
						return url;
					}
				});
				clipboard.on('success', function(e) {
					xtip.msg('链接已复制，可去其他地方粘贴分享', {
						pos: 'b'
					})
				});
				clipboard.on('error', function(e) {
					xtip.msg('您手机不支持复制，请通过其他途径分享', {
						pos: 'b'
					})
				});
			},
			copyUrl2() {
				if(this.meiju) {
					let params = {
						types: ['wx', 'wxTimeline'], //分享类型数组，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
						title: '美的冰箱2020年度使用报告', // 分享标题
						desc: '哇，我的报告太棒啦，快来看看吧！', // 分享描述
						link: location.href, // 分享链接
						imgUrl: 'https://midea-images.mideav.com/AnnualReport20/share.png', // 分享图标
					}
					window.bridge.showSharePanel(params, res => {
						//						xtip.msg('分享成功', {
						//							pos: 'b'
						//						})
					}, err => {})
				} else {
					//复制链接
					var clipboard = new ClipboardJS('#copyBtn2', {
						text: function() {
							var url = window.location.href;
							return url;
						}
					});
					clipboard.on('success', function(e) {
						xtip.msg('报告链接已复制，可去其他地方粘贴分享', {
							pos: 'b'
						})
					});
					clipboard.on('error', function(e) {
						xtip.msg('您手机不支持复制，请通过其他途径分享', {
							pos: 'b'
						})
					});
				}
			},
			clicked(data) {
				this.play = data;
			},
			pageClick(event) {
				event.stopPropagation();
				if(this.play !== null) {
					return;
				}
				if(this.play) {
					this.play = false;
					console.log(this.play)
					this.$refs.music.refresh()
				} else {
					this.play = true;
					console.log(this.play)
					this.$refs.music.refresh()
				}
			}
		}
	}
</script>

<style scoped>
	#apps {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.clogo {
		width: 28%;
		left: 7%;
		position: absolute;
		top: 8vw;
	}
	
	.botImg {
		width: 100%;
		/*height: 50%;*/
		position: absolute;
		bottom: 0;
	}
	
	.loginbox {
		position: absolute;
		width: 86vw;
		height: 80vw;
		left: 0;
		top: -10%;
		right: 0;
		bottom: 0;
		margin: auto;
		background: #fff;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.loginText {
		margin-top: 10px;
	}
	
	.loginText p {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 14px;
		color: #6D7278;
		color: #000;
		letter-spacing: 0;
		line-height: 24px;
		text-align: center;
	}
	
	.botBtnBox {
		position: absolute;
		left: 13vw;
		bottom: 6Vh;
		width: 74vw;
	}
	
	.botBtnBox .btn,
	.noticeBox .btn {
		background: #FF8B34;
		width: 100%;
		height: 40px;
		border-radius: 40px;
		margin-top: 20px;
		text-align: center;
		line-height: 40px;
		font-family: FZLTZHJW--GB1-0;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 1px;
	}
	
	.btn:active {
		opacity: 0.8;
	}
</style>