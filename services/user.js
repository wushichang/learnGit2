/**
 * 用户相关服务
 */

const util = require('../util/util.js');
const api = require('../config/api.js');

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  console.log("-----1----")
  console.log(userInfo.userInfo) 
  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code; 
      return userInfo;
    }).then((userInfo) => {
      //登录远程服务器
      let params={};
      params.code=code;
      params.avatarUrl = userInfo.userInfo.avatarUrl;
      params.city = userInfo.userInfo.city;
      params.country = userInfo.userInfo.country;
      params.gender = userInfo.userInfo.gender;
      params.language = userInfo.userInfo.language;
      params.nickName = userInfo.userInfo.nickName;
      params.province = userInfo.userInfo.province;
      params.promoterId = wx.getStorageSync('userId') || 0;
      params.merchantId = wx.getStorageSync('merchantId') || 0;
      console.log('-----********---------', JSON.stringify(params))
      util.request(api.AuthLoginByWeixin, params, 'POST').then(res => {
        if (res.errno === 0) { 
          //存储用户信息
          wx.setStorageSync('userInfo', userInfo);
          wx.setStorageSync('token', res.data.userVo.weixinOpenid);
          wx.setStorageSync('realFlag', res.data.userVo.realFlag); 
          wx.setStorageSync('uId', res.data.userVo.userId); 
          console.log('-----#######---------', res.data.userVo.userId)
          if (wx.getStorageSync('userId')){
            wx.removeStorageSync('userId'); 
            // wx.setStorageSync('userId');
          }  
          resolve(res);
        } else {
          util.showErrorToast(res.errmsg)
          reject(res); 
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}



function loginByWeixinForApp(userInfo,code) {
  console.log("-----1----")
  console.log(userInfo.userInfo) 
  return new Promise(function (resolve, reject) {
      //登录远程服务器
      let params={};
      params.code=code;
      params.avatarUrl = userInfo.userInfo.avatarUrl;
      params.city = userInfo.userInfo.city;
      params.country = userInfo.userInfo.country;
      params.gender = userInfo.userInfo.gender;
      params.language = userInfo.userInfo.language;
      params.nickName = userInfo.userInfo.nickName;
      params.province = userInfo.userInfo.province;
      params.promoterId = uni.getStorageSync('userId') || 0;
      params.merchantId = uni.getStorageSync('merchantId') || 0;
      console.log('-----********---------', JSON.stringify(params))
      util.request(api.AuthLoginByWeixin, params, 'POST').then(res => {
        if (res.errno === 0) { 
          //存储用户信息
          uni.setStorageSync('userInfo', userInfo);
          uni.setStorageSync('token', res.data.userVo.weixinOpenid);
          uni.setStorageSync('realFlag', res.data.userVo.realFlag); 
          uni.setStorageSync('uId', res.data.userVo.userId); 
          console.log('-----#######---------', res.data.userVo.userId);
          if (uni.getStorageSync('userId')){
            uni.removeStorageSync('userId'); 
            // wx.setStorageSync('userId');
          }  
          resolve(res);
        } else {
          util.showErrorToast(res.errmsg)
          reject(res); 
        }
      }).catch((err) => {
        reject(err);
      });
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  loginByWeixinForApp,
  checkLogin
};











