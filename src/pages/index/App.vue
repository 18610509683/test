<template>
	<div id="apps">
		<music ref="music" :play="play" @clicked="clicked"></music>
		<div v-if="status!==3" class="status01">
			<div class="page chakan" :style="entryBgStyle" style="top:0;">
				<img id="cloud1" class="cloud" src="../../assets/cloud01.png" />
				<img class="clogo" :src="skin.logo" />
				<img class="botImg" :src="skin.mainImg" />
				<img class="cloud" src="../../assets/cloud01.png" />
				<img id="cloud3" class="cloud" src="../../assets/cloud3.png" />
				<div class="imgText">
					<div class="title" :style="titleStyle">{{skin.ppText}}智能冰箱2020年度使用报告</div>
					<img class="together" :src="skin.mainT" />

				</div>
				<!--<img class="line" src="@/images/colmo/line.png" />-->
				<div class="botBtnBox">
					<div v-if="fridgeId">
						<div class="btn" @click="toSeeHe">查看ta的报告</div>
						<div class="btn" @click="toSeeMe">查看我的报告</div>
					</div>
					<div v-else>
						<div class="btn" @click="toSeeMe">查看我的报告</div>
					</div>
				</div>
			</div>
			<div :class="['page',showMe?'showPage':'hidePage']" :style="entryBgStyle" style="">
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
					<div class="btn" @click="showMe=false">返回前页</div>
				</div>
			</div>

			<div :class="['page',showHe?'showPage':'']" style="">
				<div :class="['arrowBox',beforeLoaded?'':'appear']" v-if="!beforeLoaded&&showArrow">
					<img @click="sliderNext" src="../../assets/arrow.png" />
				</div>
				<div :class="['swiper-slide',!beforeLoaded?'loadingLeave':'']" :style="bgBoxStyle">
					<div id="loadingPage">
						<img class="botImg" src="@/images/midea/loadImg.png" />
						<img class="clogo" :src="skin.logo" />
						<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

						<div class="loadingBox">
							<img :class="['loadCenter',beforeLoaded?'loading':'test']" :src="skin.loadingImg" />
							<img class="centerImg" src="@/images/midea/loadCenter.png" />
							<div style="margin-top: 20px;">
								<p class="loadingText" style="font-weight: bold;">{{rate}}%</p>
								<p class="loadingText">{{text}}</p>
							</div>
						</div>
					</div>
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<!--初见-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/firstSee.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />
								<div class="firstFace">
									<img src="../../assets/firstFace.png" />
									<p class="dateTitle">{{dataObj.registerDate|dateFilter}}</p>
									<p class="pBegin">我们第一次相遇</p>
									<p>时光定格在了那个{{dataObj.season||'冬'}}天</p>
									<p>而我的世界从此有了你</p>
									<p class="pBegin">转眼间我们一起走过了 <span class="strong">{{dataObj.totalDay||498}}</span> 天</p>
									<p>以后的漫长岁月</p>
									<p>期待我们更多的小确幸</p>
								</div>
							</div>
							<!--不平凡的2020-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/loadImg.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="firstFace">
									<img src="../../assets/text2020.png" />
									<p class="pBegin">2020年春节</p>
									<p>突如其来的 <span class="strong">新冠疫情</span> 蔓延全国</p>
									<p>"钟南山"、"口罩"、"逆行者" 等词条</p>
									<p>时刻牵动着我们每个人的心</p>
									<p class="pBegin">全国共 <span class="strong">{{dataObj.specialFunctionsUsersTotal}}万</span> 拥有</p>
									<p class="minStrong">微晶保鲜、杀菌净味、除农残（果净）</p>
									<p>的美的冰箱用户与你一起健康抗疫！</p>
									<div v-if="dataObj.weiJingModelCount||dataObj.shaJunModelCount||dataObj.guoJingModelCount">
										<p class="pBegin">在这一年中</p>
										<p v-if="dataObj.weiJingModelCount">微晶保鲜共陪伴了你 <span class="strong">{{dataObj.weiJingModelCount}}天</span></p>
										<p v-if="dataObj.shaJunModelCount">杀菌净味陪伴了你 <span class="strong">{{dataObj.shaJunModelCount}}天</span></p>
										<p v-if="dataObj.guoJingModelCount">果净陪伴了你 <span class="strong">{{dataObj.guoJingModelCount}}天</span> </p>
										<p>未来我们将继续为你的健康保驾护航！</p>
									</div>
									<div v-else>
										<p class="pBegin">另外，美的集团在第一时间向湖北捐赠了</p>
										<p><span class="strong">140</span> 台负压救护车及 <span class="strong">1亿</span> 元资金</p>
										<p>并迅速升级了一系列场景化智能食谱</p>
										<p>未来我们将继续为你的健康保驾护航！</p>
									</div>
								</div>
							</div>
							<!--开关门次数及时长-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/thisYear.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/inthisyear.png" />
									<p class="pBegin">你打开冰箱门 <span class="strong">{{dataObj.yearOpenNum||1085}}</span> 次</p>
									<p>超越全国 <span class="strong">{{dataObj.doorOpenTimeoutPercent}}%</span> 的用户</p>
									<p class="pBegin">累计开门时长 <span class="strong">{{dataObj.yearOpenDuration||498}}</span> 小时</p>
									<p>超越全国 <span class="strong">{{dataObj.yearOpenDurationPercent}}%</span> 的用户</p>
									<p class="pBegin" v-html="dataObj.yearOpenNumMsg"></p>
								</div>
							</div>
							<!--节能指数-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/thisYear2.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/inthisyear.png" />
									<p class="pBegin">冰箱节能指数 <span class="strong">{{dataObj.energyScore||88}}</span> 分</p>
									<p>超越全国 <span class="strong">{{dataObj.energyScorePercent}}%</span> 的用户</p>
									<p class="pBegin">开门超时报警发生了 <span class="strong">{{dataObj.doorOpenTimeout||38}}</span> 次</p>
									<p>落后于全国 <span class="strong">{{dataObj.doorOpenTimeoutPercent}}%</span> 的用户</p>
									<p class="pBegin">乖~</p>
									<p>用完冰箱之后要记得及时关门呀</p>
									<p>节约能源，爱护地球，我们都是地球卫士</p>
								</div>
							</div>
							<!--特别的日子-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<div v-if="dataObj.specialDayListType==1">
									<img class="botImg" src="@/images/midea/openDoor.png" />
									<img class="clogo" :src="skin.logo" />
									<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

									<div class="thisYearBox">
										<img src="../../assets/specailDay.png" />
										<p class="pBegin">2020年的 <span class="strong">{{dataObj.specialDay||''}}</span></p>
										<p>你打开过 <span class="strong">{{dataObj.specialDayNum}}</span> 次冰箱</p>
										<p>比平时多了许多</p>
										<p>还记得那一天的故事吗？</p>
										<p class="pBegin">平凡的生活里，有家人的陪伴</p>
										<p>奔波的疲惫，在团聚的时刻都消散如烟...</p>
									</div>
								</div>
								<div v-if="dataObj.specialDayListType==2">
									<img class="botImg" src="@/images/midea/openDoor.png" />
									<img class="clogo" :src="skin.logo" />
									<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

									<div class="thisYearBox">
										<img src="../../assets/specailDay.png" />
										<p class="pBegin"><span class="strong">{{dataObj.specialDay||''}}</span> 大概是很特别的一天</p>
										<p>你打开过 <span class="strong">{{dataObj.maxOpenNum}}</span> 次冰箱</p>
										<p>是开门 <span class="strong">最多</span> 的一天</p>
										<p>还记得那一天的故事吗？</p>
										<p>是亲友的拜访？</p>
										<p>还是送给自己的一顿丰盛大餐？</p>
										<p class="pBegin">生活，需要仪式感</p>
										<p>平凡的日子里，依然记录着不平凡的自己</p>
									</div>
								</div>

							</div>
							<!--早餐分析-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<div v-if="dataObj.earliestDayListType==1">
									<img class="botImg" src="@/images/midea/morning.png" />
									<img class="clogo" :src="skin.logo" />
									<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

									<div class="thisYearBox">
										<img src="../../assets/morning.png" />
										<p class="pBegin">{{dataObj.earliestDayDate}} <span class="strong">{{dataObj.earliestDayTime||''}}</span></p>
										<p>这是你今年 <span class="strong">最早</span> 打开冰箱的时刻</p>
										<p>太阳才渐渐升起</p>
										<p>有人却已默默的忙碌起家人的早餐</p>
										<p>家，永远是你疲惫时温暖的港湾</p>
										<p>无论何时请记得对那个人说声，谢谢!</p>
										<p class="pBegin">这一年9点之前冰箱共开门 <span class="strong">{{dataObj.nineBeforeNum}}</span> 次</p>
										<p>美好的一天，</p>
										<p>让我们从元气满满的早饭开始吧！</p>
									</div>
								</div>
								<div v-if="dataObj.earliestDayListType==2">
									<img class="botImg" src="@/images/midea/morning.png" />
									<img class="clogo" :src="skin.logo" />
									<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

									<div class="thisYearBox">
										<img src="../../assets/morning.png" />
										<p class="pBegin">{{dataObj.earliestDayDate}} <span class="strong">{{dataObj.earliestDayTime||''}}</span></p>
										<p>这是你今年最早打开冰箱的时刻</p>
										<p>冰箱里是不是总有美味等着你呢？</p>
										<p class="pBegin">这一年9点之前冰箱共开门 <span class="strong">{{dataObj.nineBeforeNum}}</span> 次</p>
										<p>美好的一天，</p>
										<p>让我们从元气满满的早饭开始吧！</p>
									</div>
								</div>
							</div>
							<!--宵夜睡眠分析-->
							<div class="swiper-slide" :style="nightBgStyle">
								<img class="botImg" src="@/images/midea/night.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div v-if="dataObj.latestDayListType==1">
									<div class="thisYearBox">
										<img src="../../assets/night.png" />
										<p class="pBegin">{{dataObj.latestDayDate}} <span class="strong">{{dataObj.latestDayTime}}</span></p>
										<p>夜深了，你仍迟迟未睡</p>
										<p>夜猫子的你打开冰箱拿走了什么呢?</p>
										<p class="pBegin">过去的一年，</p>
										<p>22点以后你一共开门 <span class="strong">{{dataObj.tenPmAfterNum}}</span> 次</p>
										<p>新的一年，</p>
										<p>我想拜托你千万要早点休息！</p>
									</div>
								</div>
								<div v-if="dataObj.latestDayListType==2">
									<div class="thisYearBox">
										<img src="../../assets/night.png" />
										<p class="pBegin">{{dataObj.latestDayDate}} <span class="strong">{{dataObj.latestDayTime}}</span></p>
										<p>这是你今年最晚一次打开冰箱</p>
										<p class="pBegin">过去的一年，</p>
										<p>22点以后你一共开门 <span class="strong">{{dataObj.tenPmAfterNum}}</span> 次</p>
										<p>新的一年，</p>
										<p>我想拜托你千万要早点休息！</p>
									</div>
								</div>
							</div>

							<!--使用习惯-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/habit.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/habit.png" />
									<p class="pBegin">回顾这一年</p>
									<div v-if="dataObj.useListType==1">
										<p class="pBegin">你在<span class="strong">{{dataObj.useTime}}</span>时段使用冰箱都很<span class="strong">规律</span></p>
										<p>很幸福哦，家里一定有一位厨艺达人吧？</p>
									</div>
									<div v-if="dataObj.useListType==2">
										<p class="pBegin">你有 <span class="strong">{{dataObj.useTimePercent}}%</span> 的时间</p>
										<p>都在 <span class="strong">{{dataObj.useTime}}</span> 使用冰箱</p>
										<div v-if="dataObj.useTime=='早上'">
											<p>早餐吃得好，新的一天才会充满干劲呢</p>
										</div>
										<div v-else-if="dataObj.useTime=='中午'">
											<p>早上的忙碌过后</p>
											<p>一顿心仪的午餐就是给自己最好的慰藉。</p>
										</div>
										<div v-else>
											<p>我猜你是一位忙碌的上班族，对吗？</p>
											<p>再忙也要记得好好吃饭鸭~</p>
										</div>
									</div>
									<div v-if="dataObj.useListType==3">
										<p class="pBegin">你有 <span class="strong">{{dataObj.useTimePercent}}%</span> 的时间</p>
										<p>都在 <span class="strong">{{dataObj.useTime}}</span> 使用冰箱</p>
										<div v-if="dataObj.useTime=='早上及晚上'">
											<p>中午见不到你的我，</p>
											<p>其实是很担心午餐你吃的好不好呢~</p>
										</div>
										<div v-if="dataObj.useTime=='中午及晚上'">
											<p>早上见不到你的我，</p>
											<p>其实是很担心早餐你吃的好不好呢~</p>
										</div>
										<div v-if="dataObj.useTime=='早上及中午'">
											<p>是晚上的你有很多应酬吗，或是在减肥健身？</p>
										</div>
									</div>
									<p class="pBegin">身体是革命的本钱，</p>
									<p>吃好喝好身体健康</p>
									<p>请和我一起努力吧！</p>
								</div>
							</div>
							<!--健康管家-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" src="@/images/midea/health.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img style="height: 16vw;" src="../../assets/health.png" />
									<p class="pBegin">过去的一年里</p>
									<p>你使用食材管理功能 <span class="strong">{{dataObj.foodManageNum}}</span> 次</p>
									<p v-if="dataObj.foodManageNum>=50">哈哈，你就是传说中的家庭管家小能手吧！</p>
									<div v-else>
										<p>建议你可以多多使用食材管理功能</p>
										<p>早日变身家庭管家小能手！</p>
									</div>
									<div v-if="dataObj.meatAddNumPercent>=60">
										<p class="pBegin">一年中你添加过得肉类超过 <span class="strong">{{dataObj.meatAddNumPercent}}%</span>，</p>
										<p>OMG~妈妈你听我解释</p>
										<p>我只是在健身！</p>
									</div>
									<div v-else-if="dataObj.meatAddNumPercent>40">
										<p class="pBegin">一年中你添加过得肉类大概占 <span class="strong">{{dataObj.meatAddNumPercent}}%</span>，</p>
										<p>营养均衡的美食达人就是你啦！</p>
									</div>
									<div v-else>
										<p class="pBegin">一年中你添加过的肉类不超过 <span class="strong">{{dataObj.meatAddNumPercent==0?1:dataObj.meatAddNumPercent}}%</span>，</p>
										<p>原来你是个爱吃菜的宝宝！</p>
									</div>
									<p class="pBegin">食材建议：</p>
									<p>蔬菜和水果应占据你的事物盘的1/2</p>
									<p>全谷物应占据你的食物盘的1/4</p>
									<p>健康来源的蛋白质应占据你的食物盘的1/4</p>
								</div>
							</div>
							<!--结尾-->
							<div class="swiper-slide" :style="bgBoxStyle">
								<img class="botImg" style="bottom: 154px;" src="@/images/midea/health.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />
								<img @click="noticeClick" class="notice" src="../../assets/notice.png" />
								<div v-show="showNotice" class="noticeBox">
									<p id="noticTitle">用户须知</p>
									<p>1、年度报告所有内容均基于用户的冰箱日常使用数据分析处理，不作为事实依据，请理性看待。</p>
									<p>2、年度报告为个人数据，“查看我的报告”将会跳转到报告入口。“分享链接”则表示仅分享本年度报告入口，不涉及任何个人隐私数据。</p>
									<div id="noticeBtn" class="btn" @click="noticeClick">我知道了</div>
								</div>
								<div class="endPage">
									<img src="../../assets/keyword.png" />
									<div class="pBegin">
										<div class="horFlex" v-for="itm in dataObj.msgList">
											<img class="diamond" src="../../assets/diamond.png" />
											<div class="keyword">{{itm}}</div>
										</div>
									</div>
									<p style="margin-top: 20px;">2020年结束了</p>
									<p>期待来年我们更多精彩故事...</p>
								</div>
								<div class="endBotBox">
									<div class="erweimabox">
										<img class="scan" src="../../assets/scan.png" />
										<div>
											<p class="commnT">扫描右侧二维码可查看</p>
											<p class="commnT">美的冰箱年度使用报告</p>
										</div>
										<img class="erweima" src="../../assets/erweima.png" />
									</div>
									<div style="height: 40%;">
										<div id="copyBtn" class="botbtn" @click="copyUrl">分享链接</div>
										<div class="centerLine" style="height: 100%;width: 1px;"></div>
										<div id="copyBtn2" class="botbtn" @click="toSeeMe2">查看我的报告</div>
									</div>
								</div>
							</div>
							<!--<div class="swiper-slide" :style="bgBoxStyle"></div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="noData" class="pageBox">
			<div :style="entryBgStyle" class="pageBox">
				<img class="clogo" :src="skin.logo" />
				<img class="botImg" src="../../assets/login.png" />
				<div class="loginbox">
					<img style="width: 46%;" src="../../assets/noData.png" />
					<div class="loginText">
						<p>2020年度暂未统计到您的数据</p>
						<p>期待来年与你一起的更多精彩…</p>
					</div>
				</div>
				<div class="botBtnBox">
					<div id="copyBtn0" class="btn" @click="copyUrl0">分享链接</div>
				</div>
			</div>
		</div>
		<div v-else class="status23">
			<div :class="['arrowBox',beforeLoaded?'':'appear']" v-if="!beforeLoaded&&showArrow">
				<img @click="sliderNext" src="../../assets/arrow.png" />
			</div>
			<div :class="['swiper-slide',!beforeLoaded?'loadingLeave':'']" :style="bgBoxStyle">
				<div id="loadingPage">
					<img class="botImg" src="@/images/midea/loadImg.png" />
					<img class="clogo" :src="skin.logo" />
					<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

					<div class="loadingBox">
						<img :class="['loadCenter',beforeLoaded?'loading':'test']" :src="skin.loadingImg" />
						<img class="centerImg" src="@/images/midea/loadCenter.png" />
						<div style="margin-top: 20px;">
							<p class="loadingText" style="font-weight: bold;">{{rate}}%</p>
							<p class="loadingText">{{text}}</p>
						</div>
					</div>
				</div>
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<!--初见-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/firstSee.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />
							<div class="firstFace">
								<img src="../../assets/firstFace.png" />
								<p class="dateTitle">{{dataObj.registerDate|dateFilter}}</p>
								<p class="pBegin">我们第一次相遇</p>
								<p>时光定格在了那个{{dataObj.season||'冬'}}天</p>
								<p>而我的世界从此有了你</p>
								<p class="pBegin">转眼间我们一起走过了 <span class="strong">{{dataObj.totalDay||498}}</span> 天</p>
								<p>以后的漫长岁月</p>
								<p>期待我们更多的小确幸</p>
							</div>
						</div>
						<!--不平凡的2020-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/loadImg.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div class="firstFace">
								<img src="../../assets/text2020.png" />
								<p class="pBegin">2020年春节</p>
								<p>突如其来的 <span class="strong">新冠疫情</span> 蔓延全国</p>
								<p>"钟南山"、"口罩"、"逆行者" 等词条</p>
								<p>时刻牵动着我们每个人的心</p>
								<p class="pBegin">全国共 <span class="strong">{{dataObj.specialFunctionsUsersTotal}}万</span> 拥有</p>
								<p class="minStrong">微晶保鲜、杀菌净味、除农残（果净）</p>
								<p>的美的冰箱用户与你一起健康抗疫！</p>
								<div v-if="dataObj.weiJingModelCount||dataObj.shaJunModelCount||dataObj.guoJingModelCount">
									<p class="pBegin">在这一年中</p>
									<p v-if="dataObj.weiJingModelCount">微晶保鲜共陪伴了你 <span class="strong">{{dataObj.weiJingModelCount}}天</span></p>
									<p v-if="dataObj.shaJunModelCount">杀菌净味陪伴了你 <span class="strong">{{dataObj.shaJunModelCount}}天</span></p>
									<p v-if="dataObj.guoJingModelCount">果净陪伴了你 <span class="strong">{{dataObj.guoJingModelCount}}天</span> </p>
									<p>未来我们将继续为你的健康保驾护航！</p>
								</div>
								<div v-else>
									<p class="pBegin">另外，美的集团在第一时间向湖北捐赠了</p>
									<p><span class="strong">140</span> 台负压救护车及 <span class="strong">1亿</span> 元资金</p>
									<p>并迅速升级了一系列场景化智能食谱</p>
									<p>未来我们将继续为你的健康保驾护航！</p>
								</div>
							</div>
						</div>
						<!--开关门次数及时长-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/thisYear.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div class="thisYearBox">
								<img src="../../assets/inthisyear.png" />
								<p class="pBegin">你打开冰箱门 <span class="strong">{{dataObj.yearOpenNum||1085}}</span> 次</p>
								<p>超越全国 <span class="strong">{{dataObj.doorOpenTimeoutPercent}}%</span> 的用户</p>
								<p class="pBegin">累计开门时长 <span class="strong">{{dataObj.yearOpenDuration||498}}</span> 小时</p>
								<p>超越全国 <span class="strong">{{dataObj.yearOpenDurationPercent}}%</span> 的用户</p>
								<p class="pBegin" v-html="dataObj.yearOpenNumMsg"></p>
							</div>
						</div>
						<!--节能指数-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/thisYear2.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div class="thisYearBox">
								<img src="../../assets/inthisyear.png" />
								<p class="pBegin">冰箱节能指数 <span class="strong">{{dataObj.energyScore||88}}</span> 分</p>
								<p>超越全国 <span class="strong">{{dataObj.energyScorePercent}}%</span> 的用户</p>
								<p class="pBegin">开门超时报警发生了 <span class="strong">{{dataObj.doorOpenTimeout||38}}</span> 次</p>
								<p>落后于全国 <span class="strong">{{dataObj.doorOpenTimeoutPercent}}%</span> 的用户</p>
								<p class="pBegin">乖~</p>
								<p>用完冰箱之后要记得及时关门呀</p>
								<p>节约能源，爱护地球，我们都是地球卫士</p>
							</div>
						</div>
						<!--特别的日子-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<div v-if="dataObj.specialDayListType==1">
								<img class="botImg" src="@/images/midea/openDoor.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/specailDay.png" />
									<p class="pBegin">2020年的 <span class="strong">{{dataObj.specialDay||''}}</span></p>
									<p>你打开过 <span class="strong">{{dataObj.specialDayNum}}</span> 次冰箱</p>
									<p>比平时多了许多</p>
									<p>还记得那一天的故事吗？</p>
									<p class="pBegin">平凡的生活里，有家人的陪伴</p>
									<p>奔波的疲惫，在团聚的时刻都消散如烟...</p>
								</div>
							</div>
							<div v-if="dataObj.specialDayListType==2">
								<img class="botImg" src="@/images/midea/openDoor.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/specailDay.png" />
									<p class="pBegin"><span class="strong">{{dataObj.specialDay||''}}</span> 大概是很特别的一天</p>
									<p>你打开过 <span class="strong">{{dataObj.maxOpenNum}}</span> 次冰箱</p>
									<p>是开门 <span class="strong">最多</span> 的一天</p>
									<p>还记得那一天的故事吗？</p>
									<p>是亲友的拜访？</p>
									<p>还是送给自己的一顿丰盛大餐？</p>
									<p class="pBegin">生活，需要仪式感</p>
									<p>平凡的日子里，依然记录着不平凡的自己</p>
								</div>
							</div>

						</div>
						<!--早餐分析-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<div v-if="dataObj.earliestDayListType==1">
								<img class="botImg" src="@/images/midea/morning.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/morning.png" />
									<p class="pBegin">{{dataObj.earliestDayDate}} <span class="strong">{{dataObj.earliestDayTime||''}}</span></p>
									<p>这是你今年 <span class="strong">最早</span> 打开冰箱的时刻</p>
									<p>太阳才渐渐升起</p>
									<p>有人却已默默的忙碌起家人的早餐</p>
									<p>家，永远是你疲惫时温暖的港湾</p>
									<p>无论何时请记得对那个人说声，谢谢!</p>
									<p class="pBegin">这一年9点之前冰箱共开门 <span class="strong">{{dataObj.nineBeforeNum}}</span> 次</p>
									<p>美好的一天，</p>
									<p>让我们从元气满满的早饭开始吧！</p>
								</div>
							</div>
							<div v-if="dataObj.earliestDayListType==2">
								<img class="botImg" src="@/images/midea/morning.png" />
								<img class="clogo" :src="skin.logo" />
								<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

								<div class="thisYearBox">
									<img src="../../assets/morning.png" />
									<p class="pBegin">{{dataObj.earliestDayDate}} <span class="strong">{{dataObj.earliestDayTime||''}}</span></p>
									<p>这是你今年最早打开冰箱的时刻</p>
									<p>冰箱里是不是总有美味等着你呢？</p>
									<p class="pBegin">这一年9点之前冰箱共开门 <span class="strong">{{dataObj.nineBeforeNum}}</span> 次</p>
									<p>美好的一天，</p>
									<p>让我们从元气满满的早饭开始吧！</p>
								</div>
							</div>
						</div>
						<!--宵夜睡眠分析-->
						<div class="swiper-slide" :style="nightBgStyle">
							<img class="botImg" src="@/images/midea/night.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div v-if="dataObj.latestDayListType==1">
								<div class="thisYearBox">
									<img src="../../assets/night.png" />
									<p class="pBegin">{{dataObj.latestDayDate}} <span class="strong">{{dataObj.latestDayTime}}</span></p>
									<p>夜深了，你仍迟迟未睡</p>
									<p>夜猫子的你打开冰箱拿走了什么呢?</p>
									<p class="pBegin">过去的一年，</p>
									<p>22点以后你一共开门 <span class="strong">{{dataObj.tenPmAfterNum}}</span> 次</p>
									<p>新的一年，</p>
									<p>我想拜托你千万要早点休息！</p>
								</div>
							</div>
							<div v-if="dataObj.latestDayListType==2">
								<div class="thisYearBox">
									<img src="../../assets/night.png" />
									<p class="pBegin">{{dataObj.latestDayDate}} <span class="strong">{{dataObj.latestDayTime}}</span></p>
									<p>这是你今年最晚一次打开冰箱</p>
									<p class="pBegin">过去的一年，</p>
									<p>22点以后你一共开门 <span class="strong">{{dataObj.tenPmAfterNum}}</span> 次</p>
									<p>新的一年，</p>
									<p>我想拜托你千万要早点休息！</p>
								</div>
							</div>
						</div>

						<!--使用习惯-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/habit.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div class="thisYearBox">
								<img src="../../assets/habit.png" />
								<p class="pBegin">回顾这一年</p>
								<div v-if="dataObj.useListType==1">
									<p class="pBegin">你在<span class="strong">{{dataObj.useTime}}</span>时段使用冰箱都很<span class="strong">规律</span></p>
									<p>很幸福哦，家里一定有一位厨艺达人吧？</p>
								</div>
								<div v-if="dataObj.useListType==2">
									<p class="pBegin">你有 <span class="strong">{{dataObj.useTimePercent}}%</span> 的时间</p>
									<p>都在 <span class="strong">{{dataObj.useTime}}</span> 使用冰箱</p>
									<div v-if="dataObj.useTime=='早上'">
										<p>早餐吃得好，新的一天才会充满干劲呢</p>
									</div>
									<div v-else-if="dataObj.useTime=='中午'">
										<p>早上的忙碌过后</p>
										<p>一顿心仪的午餐就是给自己最好的慰藉。</p>
									</div>
									<div v-else>
										<p>我猜你是一位忙碌的上班族，对吗？</p>
										<p>再忙也要记得好好吃饭鸭~</p>
									</div>
								</div>
								<div v-if="dataObj.useListType==3">
									<p class="pBegin">你有 <span class="strong">{{dataObj.useTimePercent}}%</span> 的时间</p>
									<p>都在 <span class="strong">{{dataObj.useTime}}</span> 使用冰箱</p>
									<div v-if="dataObj.useTime=='早上及晚上'">
										<p>中午见不到你的我，</p>
										<p>其实是很担心午餐你吃的好不好呢~</p>
									</div>
									<div v-if="dataObj.useTime=='中午及晚上'">
										<p>早上见不到你的我，</p>
										<p>其实是很担心早餐你吃的好不好呢~</p>
									</div>
									<div v-if="dataObj.useTime=='早上及中午'">
										<p>是晚上的你有很多应酬吗，或是在减肥健身？</p>
									</div>
								</div>
								<p class="pBegin">身体是革命的本钱，</p>
								<p>吃好喝好身体健康</p>
								<p>请和我一起努力吧！</p>
							</div>
						</div>
						<!--健康管家-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" src="@/images/midea/health.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />

							<div class="thisYearBox">
								<img style="height: 16vw;" src="../../assets/health.png" />
								<p class="pBegin">过去的一年里</p>
								<p>你使用食材管理功能 <span class="strong">{{dataObj.foodManageNum}}</span> 次</p>
								<p v-if="dataObj.foodManageNum>=50">哈哈，你就是传说中的家庭管家小能手吧！</p>
								<div v-else>
									<p>建议你可以多多使用食材管理功能</p>
									<p>早日变身家庭管家小能手！</p>
								</div>
								<div v-if="dataObj.meatAddNumPercent>=60">
									<p class="pBegin">一年中你添加过得肉类超过 <span class="strong">{{dataObj.meatAddNumPercent}}%</span>，</p>
									<p>OMG~妈妈你听我解释</p>
									<p>我只是在健身！</p>
								</div>
								<div v-else-if="dataObj.meatAddNumPercent>40">
									<p class="pBegin">一年中你添加过得肉类大概占 <span class="strong">{{dataObj.meatAddNumPercent}}%</span>，</p>
									<p>营养均衡的美食达人就是你啦！</p>
								</div>
								<div v-else>
									<p class="pBegin">一年中你添加过的肉类不超过 <span class="strong">{{dataObj.meatAddNumPercent==0?1:dataObj.meatAddNumPercent}}%</span>，</p>
									<p>原来你是个爱吃菜的宝宝！</p>
								</div>
								<p class="pBegin">食材建议：</p>
								<p>蔬菜和水果应占据你的事物盘的1/2</p>
								<p>全谷物应占据你的食物盘的1/4</p>
								<p>健康来源的蛋白质应占据你的食物盘的1/4</p>
							</div>
						</div>
						<!--结尾-->
						<div class="swiper-slide" :style="bgBoxStyle">
							<img class="botImg" style="bottom: 154px;" src="@/images/midea/health.png" />
							<img class="clogo" :src="skin.logo" />
							<img class="botImg" v-if="brand==2" src="../../assets/coverBg.png" />
							<img @click="noticeClick" class="notice" src="../../assets/notice.png" />
							<transition name="slide-fade">
								<div v-show="showNotice" class="noticeBox">
									<p id="noticTitle">用户须知</p>
									<p>1、年度报告所有内容均基于用户的冰箱日常使用数据分析处理，不作为事实依据，请理性看待。</p>
									<p>2、年度报告为个人数据，“分享我的报告”即表示同意别人查看你的个人数据。“分享链接”则表示仅分享本年度报告入口，不涉及任何个人隐私数据。</p>
									<div id="noticeBtn" class="btn" @click="noticeClick">我知道了</div>
								</div>
							</transition>
							<div class="endPage">
								<img src="../../assets/keyword.png" />
								<div class="pBegin">
									<div class="horFlex" v-for="itm in dataObj.msgList">
										<img class="diamond" src="../../assets/diamond.png" />
										<div class="keyword">{{itm}}</div>
									</div>
								</div>
								<p style="margin-top: 20px;">2020年结束了</p>
								<p>期待来年我们更多精彩故事...</p>
							</div>
							<div class="endBotBox">
								<div class="erweimabox">
									<img class="scan" src="../../assets/scan.png" />
									<div>
										<p class="commnT">扫描右侧二维码可查看</p>
										<p class="commnT">美的冰箱年度使用报告</p>
									</div>
									<img class="erweima" src="../../assets/erweima.png" />
								</div>
								<div style="height: 40%;">
									<div id="copyBtn" class="botbtn" @click="copyUrl">分享链接</div>
									<div class="centerLine" style="height: 100%;width: 1px;"></div>
									<div id="copyBtn2" class="botbtn" @click="copyUrl2">分享我的报告</div>
								</div>
							</div>
						</div>
						<!--<div class="swiper-slide" :style="bgBoxStyle"></div>-->
					</div>
				</div>
			</div>
		</div>

		<!--</transition>-->

	</div>
</template>

<script>
	import music from '@/components/music.vue'

	import mdLogo from '@/images/midea/logo.png';
	import mideaBg from '@/images/midea/mainBg.png'
	import mdLoading from '@/images/midea/loadingImg.png'
	import mdMainT from '@/images/midea/together.png'
	import mdMainImg from '@/images/midea/mainImg.png'
	import mdentryBg from '@/images/midea/entryBg.png'
	import mdNightBg from '@/images/midea/nightBg.png'

	import hlLogo from '@/images/hualing/logo.png';
	import hualingBg from '@/images/hualing/mainBg.png'
	import hlLoading from '@/images/hualing/loadingImg.png'
	import hlMainT from '@/images/hualing/together.png'
	import hlMainImg from '@/images/hualing/mainImg.png'
	import hlentryBg from '@/images/hualing/entryBg.png'
	import hlNightBg from '@/images/hualing/nightBg.png'

	import coLogo from '@/images/colmo/logo.png';
	import colmoBg from '@/images/colmo/mainBg.png'
	import coLoading from '@/images/colmo/loadingImg.png'
	import coMainT from '@/images/colmo/together.png'
	import coMainImg from '@/images/colmo/mainImg.png'
	import coentryBg from '@/images/colmo/entryBg.png'
	import coNightBg from '@/images/colmo/nightBg.png'

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
			let ran = 0;
			params.brand = ran;
		}
	})();

	function encode(_str) {
		var staticchars = "PXhw7UT1B0a9kQDKZsjIASmOezxYG4CHo5Jyfg2b8FLpEvRr3WtVnlqMidu6cN";
		var encodechars = "";
		for(var i = 0; i < _str.length; i++) {
			var num0 = staticchars.indexOf(_str[i]);
			if(num0 == -1) {
				var code = _str[i];
			} else {
				var code = staticchars[(num0 + 3) % 62];
			}
			var num1 = parseInt(Math.random() * 62, 10);
			var num2 = parseInt(Math.random() * 62, 10);
			encodechars += staticchars[num1] + code + staticchars[num2];
		}
		//		console.log('加密后：'+encodechars)
		return encodechars;
	}

	function isMeiju() {
		var ua = navigator.userAgent.toLowerCase()
		if(/meiju|msmart/.test(ua)) {
			return true
		} else {
			return false
		}
	}
	var meiju = isMeiju();
	var swiper = undefined;
	export default {
		name: 'App',
		data: () => ({
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
			noData: false,
		}),
		computed: {
			nightBgStyle() {
				let nightBg = undefined;
				if(this.brand == 1) {
					nightBg = coNightBg
				} else if(this.brand == 2) {
					nightBg = hlNightBg
				} else {
					nightBg = mdNightBg
				}
				return {
					backgroundImage: 'url(' + nightBg + ')',
					backgroundSize: 'cover'
				}
			},
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
					obj.ppText = '我的'; //品牌名
					obj.mainT = coMainT; //together图
					obj.mainImg = coMainImg; //主页原件
					obj.entryBg = coentryBg; //主页背景
				} else if(this.brand == 2) {
					obj.logo = hlLogo;
					obj.loadingImg = hlLoading;
					obj.ppText = '我的';
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
					//					bg = this.meiju ? colmoBg : mideaBg
					bg = colmoBg
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
		created() {
			if(this.fridgeId) {
				http.searchData({
					fridgeId: params.fridgeId
				}).then(res => {
					if(res.data && res.data.code == 0) {
						if(res.data.data.length != 0) {
							this.dataObj = res.data.data
						} else {
							this.noData = true;
						}
					}
				}, err => {
					console.log(err)
				})
			} else {
				http.searchData({
					fridgeId: encode('145135535560333')
				}).then(res => {
					if(res.data && res.data.code == 0) {
						if(res.data.data.length != 0) {
							this.dataObj = res.data.data
						} else {
							this.noData = true;
						}
					}
				}, err => {
					console.log(err)
				})
			}
			window.bridge.getUserApplianceList(res => {
				let info = JSON.stringify(res)
				//				xtip.msg(info, {
				//					pos: 't'
				//				})
			})
		},
		mounted() {
			if(this.status == 3) {
				this.showReport()
			}
			this.initCloud();
		},
		methods: {
			sliderNext() {
				if(!swiper) return;
				swiper.slideNext();
			},
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
			showReport() {
				var self = this;
				let timer = setInterval(() => {
					var ran = Math.floor(Math.random() * 15);
					this.rate += ran;
					if(this.rate >= 98) {
						clearInterval(timer)
						this.rate = 100;
						this.text = '报告已生成';
						this.beforeLoaded = false;
						this.showArrow = true;
						setTimeout(() => {
							swiper = new Swiper('.swiper-container', {
								direction: 'vertical',
								followFinger: false,
								speed: 300,
								mousewheel: true,
								autoplay: false,
								loop: false,
								pagination: {
									el: '.swiper-pagination',
								},
								on: {
									init: function(swiper) {
										let slide = this.slides.eq(0);
										slide.addClass('ani-slide');
									},
									transitionStart: function() {
										for(let i = 0; i < this.slides.length; i++) {
											let slide = this.slides.eq(i);
											slide.removeClass('ani-slide');
										}
									},
									transitionEnd: function() {
										if(this.activeIndex == this.slides.length - 1) {
											self.showArrow = false;
										} else {
											self.showArrow = true;
										}
										let slide = this.slides.eq(this.activeIndex);
										slide.addClass('ani-slide');
									},

								}
							});
						}, 3000)
					}
				}, 150)
			},
			toSeeHe() {
				this.showHe = true;
				this.showReport();
				this.closeCloud();
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
					let url = window.location.href.split('?')[0] + '?brand=' + this.brand;;
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
				}
			},
			copyUrl(a) {
				if(this.meiju) {
					let ppT;
					if(this.brand == 1) {
						ppT = 'COLMO'
					} else if(this.brand == 2) {
						ppT = '华凌'
					} else {
						ppT = '美的'
					}
					let url = window.location.href.split('?')[0] + '?brand=' + this.brand;
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
				}
			},
			copyUrl2() {
				if(this.meiju) {
					let ppT;
					if(this.brand == 1) {
						ppT = 'COLMO'
					} else if(this.brand == 2) {
						ppT = '华凌'
					} else {
						ppT = '美的'
					}
					let params = {
						types: ['wx', 'wxTimeline'], //分享类型数组，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
						title: '2020，那些我不知道的冰箱故事', // 分享标题
						desc: ppT + '智能冰箱2020年度报告', // 分享描述
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
					this.$refs.music.refresh()
				} else {
					this.play = true;
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
	
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	
	.swiper-slide {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.test>img {
		width: 100%;
		height: 100%;
	}
	
	.clogo {
		width: 28%;
		left: 7%;
		position: absolute;
		top: 8vw;
	}
	
	.imgText {
		position: absolute;
		width: 80%;
		left: 10%;
		top: 24vw;
	}
	
	.together {
		width: 100%;
		margin-top: 30px;
	}
	
	.botImg {
		width: 100%;
		/*height: 50%;*/
		position: absolute;
		bottom: 0;
	}
	/*.line {
		position: absolute;
		width: 20%;
		right: 0;
		top: 30vw;
	}*/
	
	.title {
		width: 100%;
		line-height: 9vw;
		border-radius: 30px;
		text-align: center;
		font-size: 5vw;
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
	
	.loadingBox {
		position: absolute;
		left: 0;
		top: -20vw;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 76vw;
		height: 76vw;
		overflow: visible;
	}
	
	.centerImg {
		width: 94%;
		height: 94%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	
	.loadCenter {
		width: 100%;
		height: 100%;
	}
	
	@-webkit-keyframes loading {
		/*声明动画*/
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	@keyframes loading {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	.loading {
		animation: loading 1s infinite linear;
		-webkit-animation: loading 1s infinite linear;
	}
	
	.loadingText {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 20px;
		line-height: 34px;
		color: #B35903;
		letter-spacing: 0;
		text-align: center;
	}
	
	#loadingPage {
		width: 100%;
		height: 100%;
	}
	
	.loadingLeave {
		transform: translateY(-100%);
		transition: all .3s linear 2s;
	}
	
	.showPage {
		transform: translateY(-100%);
		transition: all .3s linear 0s;
	}
	
	.hidePage {
		transform: translateY(100%);
		transition: all .3s linear 0s;
	}
	
	.arrowBox {
		position: fixed;
		bottom: 4vw;
		left: 0;
		right: 0;
		margin: auto;
		width: 13.5vw;
		height: 16.5vw;
		z-index: 999;
		display: none;
	}
	
	.arrowBox img {
		width: 100%;
	}
	
	.appear {
		display: block;
		animation: arrow 2s infinite ease;
		-webkit-animation: arrow 2s infinite ease;
	}
	
	@-webkit-keyframes arrow {
		/*声明动画*/
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(20%);
		}
		100% {
			transform: translateY(0);
		}
	}
	
	@keyframes arrow {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(20%);
		}
		100% {
			transform: translateY(0);
		}
	}
	
	.firstFace,
	.thisYearBox,
	.endPage {
		position: absolute;
		top: 15vh;
		padding-left: 10vw;
		padding-right: 4vw;
	}
	
	.firstFace img,
	.thisYearBox img,
	.endPage img {
		height: 8vw;
	}
	
	.firstFace p,
	.thisYearBox p,
	.endPage p {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 16px;
		color: #6D7278;
		color: #000;
		letter-spacing: 0;
		line-height: 28px;
	}
	
	.thisYearBox .pBegin {
		margin-top: 20px;
	}
	
	.endPage .pBegin {
		margin-top: 4vh;
	}
	
	.pBegin {
		margin-top: 10px;
	}
	
	.firstFace .dateTitle {
		font-family: FZLTZCHJW--GB1-0;
		font-size: 22px;
		color: #B35903;
		letter-spacing: 0;
		line-height: 22px;
		font-weight: bold;
		margin-top: 20px;
	}
	
	.firstFace .strong {
		font-family: FZLTZCHJW--GB1-0;
		font-size: 20px;
		color: #B35903;
		letter-spacing: 0;
		font-weight: bold;
	}
	
	.thisYearBox .strong {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 20px;
		color: #B35903;
		letter-spacing: 0;
		font-weight: bold;
	}
	
	.firstFace .minStrong {
		font-family: FZLTZHJW--GB1-0;
		font-size: 15px;
		color: #B35903;
		letter-spacing: 0;
		line-height: 22px;
		font-weight: bold;
	}
	
	.diamond {
		width: 4vw;
		height: 4vw!important;
	}
	
	.horFlex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 2vh;
	}
	
	.keyword {
		margin-left: 5vw;
		width: 70vw;
		text-align: left;
		font-family: FZLTZHJW--GB1-0;
		font-size: 20px;
		color: #B35903;
		letter-spacing: 0;
		line-height: 20px;
		font-weight: bold;
	}
	
	.endBotBox {
		position: absolute;
		z-index: 9999;
		width: 100%;
		height: 160px;
		bottom: 0;
		background: #fff;
	}
	
	.endBotBox>div {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.scan {
		width: 44px;
	}
	
	.commnT {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 4vw;
		color: #6D7278;
		color: #000;
		letter-spacing: 0;
		line-height: 28px;
	}
	
	.erweima {
		width: 76px;
	}
	
	.erweimabox {
		height: 60%;
		padding: 0 20px 0 30px;
		border-bottom: 1px solid #dfdfdf;
	}
	
	.botbtn {
		width: 50%;
		height: 100%;
		text-align: center;
		line-height: 64px;
	}
	
	.botbtn:active {
		background: #eee;
	}
	
	.centerLine {
		height: 100%;
		width: 1px;
		background: #dfdfdf;
	}
	
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 100%
	}
	
	.chakan {
		top: 0
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
	
	.status01,
	.status23 {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.notice {
		position: absolute;
		top: 6.3vw;
		right: 18vw;
		width: 9vw;
		height: 9vw;
	}
	
	.noticeBox {
		position: absolute;
		width: 88%;
		height: 56%;
		top: 13%;
		left: 6%;
		background: #fff;
		border-radius: 8px;
		z-index: 99;
		/*display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;*/
		padding: 3% 6% 0 6%;
	}
	
	.noticeBox p {
		font-family: FZLTXIHJW--GB1-0;
		font-size: 14px;
		color: #6D7278;
		color: #000;
		letter-spacing: 1px;
		line-height: 24px;
		white-space: pre-wrap;
	}
	
	#noticTitle {
		text-align: center;
		line-height: 60px;
	}
	
	#noticeBtn {
		position: absolute;
		width: 86%;
		bottom: 10%;
	}
	
	.slide-fade-enter-active {
		transition: all .2s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(-100%);
		opacity: 0;
	}
	
	.cloud {
		position: absolute;
		width: 114px;
		height: 70px;
		left: 4%;
		top: 40%;
	}
	
	#cloud3 {
		width: 100px;
		height: 50px;
		left: 60%;
		top: 30%;
	}
	
	#cloud1 {
		width: 100px;
		height: 50px;
		left: 20%;
		top: 8%;
	}
	
	.pageBox {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>