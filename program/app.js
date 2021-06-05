const config = require('./config')

global.isDemo = true
App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: config.envId,
        traceUser: true,
      })
    }
    this.loginToBoarding();
    //this.checkSession();
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    //domainPrefix:'https://www.boarding.show/boarding',
    domainPrefix:'http://localhost:8077',
  },
  checkSession(){
    const _this = this;
    wx.checkSession({
      success(){
        // wx.showToast({
        //   title: 'ok',
        // })
      },
      fail(){
        // wx.showToast({
        //   title: 'faild',
        // })
        _this.loginToBoarding();
      }
    })
  },
  loginToBoarding() {
    let _domainPrefix = this.globalData.domainPrefix;
    wx.login({
      success(res){
        if(res.code){
          wx.request({
            url: _domainPrefix + '/wx/login',
            data:{
              code:res.code
            },
            method:'POST',
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res) {
              if(res.data.status == 200) {
                let ticket = res.data.ticket;
                console.log(ticket)
                //保存到客户端本地
                wx.setStorageSync('LOGININFO', ticket)
              } else {
                wx.removeStorageSync('LOGININFO');
              }
            }
          })
        } else{
          console.log('login faild');
        }
      },
      complete: (res) => {},
    })
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this;
    console.log('login----------')
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.request({
            url: config.openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  // 通过云函数获取用户 openid，支持回调或 Promise
  getUserOpenIdViaCloud() {
    return wx.cloud.callFunction({
      name: 'wxContext',
      data: {}
    }).then(res => {
      this.globalData.openid = res.result.openid
      return res.result.openid
    })
  }
})
