//const CryptoJS = require("crypto-js")
//const key = CryptoJS.enc.Utf8.parse("20160613646aBcDW");
//const md5 = require('md5-node');

import axios from 'axios'
const URL = 'https://fridge-api2.mideav.com'; //临时
//const URL ='https://fridge-api.mideav.com'; //正式
const service = axios.create({
	baseURL: URL, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000 // request timeout
})

// 拦截请求
service.interceptors.request.use(
	config => {
		// do something before request is sent
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)
//拦截响应
service.interceptors.response.use(
	config => {
		// do something before request is sent
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)
export default {
	/**
	 * 获取时间戳
	 */
	getTimeStamp() {
		return new Date().getTime();
	},
	/**
	 * 获取6位随机数
	 */
	getNmberSixRandom() {
		return Math.floor(Math.random() * 1000000);
	},
	/**
	 * token加密
	 *  */
	getSign(value) {
		var encryptedData = CryptoJS.AES.encrypt(md5(value), key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		encryptedData = encryptedData.ciphertext.toString();
		return encryptedData;
	},
	//发送验证码
	sendSMS(data) {
		return service({
			url: '/fridge/AnnualReport20/sendSMS',
			method: 'post',
			data
		})
	},
	//根据设备id查询数据
	searchData(data){
		return service({
			url: '/fridge/AnnualReport20/getInfoByFridge',
			method: 'post',
			data
		})		
	}
}