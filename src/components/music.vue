<template>
	<div id="music-box">
		<audio id="myaudio" controls :src="src"></audio>

		<img class="music-bg" src="@/images/music-bg3.png" />
		<div id="music-icon">
			<img id="music-play" @click="clicked" :class="[play?'music-play':'']" :src="play?playImg:pauseImg" />
		</div>
	</div>
</template>

<script>
	import playImg from "@/images/music-paly.png";
	import pauseImg from "@/images/music-pause.png";
	const src = 'https://report.mideav.com/media/music.fa2785d1.mp3'
	var allow=true;
	export default {
		data() {
			return {
				playImg,
				pauseImg,
				src: src
			}
		},
		props: {
			play: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			var self=this;
			document.addEventListener('WeixinJSBridgeReady', function() {
				self.start();
			})
			document.addEventListener('touchstart', function() {
				self.start();
			})
		},
		methods: {
			start(){
				let myaudio=document.getElementById('myaudio');
				if(!allow) return;
				myaudio.play();
				this.$emit('clicked', true);
				allow=false;
			},
			refresh() {
				this.$nextTick(() => {
					let audioPlay = document.getElementById('myaudio')
					if(this.play) {
						audioPlay.play()
					} else {
						audioPlay.pause()
					}
				})
			},
			clicked(event) {
				var data = this.play ? false : true;
				this.$emit('clicked', data);
				this.refresh()
			}
		}
	}
</script>

<style scoped>
	.music-bg {
		width: 100%;
		height: 100%;
	}
	
	#music-box {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 999;
		width: 15.2vw;
		height: 15.2vw;
	}
	
	#music-icon {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 58%;
		height: 58%;
		border-radius: 50%;
	}
	
	#music-play {
		width: 100%;
		height: 100%;
	}
	
	@-webkit-keyframes play {
		/*声明动画*/
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	@keyframes play {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	.music-play {
		animation: play 2s infinite linear;
		-webkit-animation: play 2s infinite linear;
	}
	
	#myaudio {
		opacity: 0;
		top: 3.6vw;
		left: 0;
		position: absolute;
	}
</style>