Page({
  data: {
      universityName:'',
      broadDirectionName:'',
      broadDirectionNames:[],
      broadDirectionNamesIndex:0,
      involvedDirectionName:'',
      involvedDirectionNames:[],
      involvedDirectionNamesIndex:0,
      majorDirectionName:'',
      directionName:'',
      universityDirections:[],
      // broadDirectionNames:[],
      // broadDirectionNamesIndex:0,
      masterTypes: ["[~] 全日制学术硕士", "[~] 非全日制学术硕士","[~] 全日制专业硕士", "[~] 非全日制专业硕士"],
      masterType: 2,
      isFirst:true,
      tip:'',
      formData: {

      },
      rules: []
  },
  onShareAppMessage() {
    return {
      title: '分享给小伙伴吧！',
      path: 'page/boarding/university/search/search'
    }
  },
  onLoad: function (options) {
    const _this = this;
    if(this.data.isFirst) {
      var app = getApp();
      let domainPrefix = app.globalData.domainPrefix;
      //请求所有门类名称
      wx.request({
        url: domainPrefix + '/university/direction/broadDirectionNames',
        success(res) {
          _this.setData({
            broadDirectionNames:res.data,
            broadDirectionName:res.data[_this.data.broadDirectionNamesIndex],
            isFirst:false
          });
          let tem_broadDirectionsName = _this.data.broadDirectionNames;
          let tem_broadDirectionsNameIndex = _this.data.broadDirectionNamesIndex;
          wx.request({
            url: domainPrefix + '/university/direction/involvedDirectionNamesAndCodes?name='+tem_broadDirectionsName[tem_broadDirectionsNameIndex],
            success(resI) {
              _this.setData({
                involvedDirectionNames:resI.data,
                involvedDirectionName:resI.data[_this.data.involvedDirectionNamesIndex]
              });
            }
          })
        }
      });
    }
  },
  onShow: function (options) {
    const _this = this;
    var app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    wx.request({
      url: domainPrefix + '/tip/bottom',
      success(res) {
        _this.setData({
          tip:res.data
        });
      }
    })
  },
  ////////////////////////////////////////////////////////////////
  // formReset: function () {
  //   this.setData({
  //     universityName:'',
  //     broadDirectionName:this.data.broadDirectionNames[this.data.broadDirectionNamesIndex],
  //     broadDirectionsNameIndex:0,
  //     involvedDirectionName:this.data.involvedDirectionNames[0],
  //     involvedDirectionNamesIndex:0,
  //     majorDirectionName:'',
  //     directionName:'',
  //     masterType: 0
  //   });
  // },
  formSubmit:function() {
    const _this = this;
    // this.queryDetail();
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })
            }
        } else {
            wx.showLoading({
              title: '正在查询',
            })
            _this.queryDetail();
        }
    })
},
queryDetail:function() {
  const _this = this;
  var app = getApp();
  let domainPrefix = app.globalData.domainPrefix;
  let loginSession = wx.getStorageSync('LOGININFO');
  const requestTask = wx.request({
    url: domainPrefix + '/university/direction/list',
    data:{
      universityName:_this.data.universityName,
      broadDirectionName:_this.data.broadDirectionName,
      involvedDirectionName:_this.data.involvedDirectionName,
      majorDirectionName:_this.data.majorDirectionName,
      directionName:_this.data.directionName,
      masterType:_this.data.masterType,
      loginSession:loginSession
    },
    success(res) {
      if(res.statusCode == 404 || res.statusCode == 400) {
        wx.showToast({
          title: '似乎少填了什么信息',
          icon:"none"
        })
        return;
      }
      if(res.statusCode == 412) {
        wx.showModal({
          title:'Warning',
          content:'检测到您可能存在非法行为，接下来数天将停止您的非法访问行为，如果您继续这么做，将把您列入黑名单!',
          cancelColor: 'red',
          confirmColor:'green',
          success(e) {
            if(e.confirm) {

            } else {}
          },
        })
      }
      wx.hideLoading({
        complete: (res) => {},
      })
      _this.setData({
        universityDirections:res.data
      });
      //跳转详情页面
      wx.navigateTo({
        url: '../direction/direction'
      });
    },
    fail(res) {
      wx.hideLoading({
        complete: (res) => {},
      });
      wx.showToast({
        title: '查询失败',
        icon:"none"
      })
    }
  });
},
/////////////////////set input//////////////////////
universityNameInput:function(e) {
  this.setData({
    universityName:e.detail.value
  });
},
majorDirectionInput:function(e) {
  this.setData({
    majorDirectionName:e.detail.value
  });
},
diretionInput:function(e) {
  this.setData({
    directionName:e.detail.value
  });
},
masterTypeInput:function(e) {
  this.setData({
    masterType:e.detail.value
  });
},
broadDirectionNamesInput:function(e) {
  if(e.detail.value == 0) {
    this.setData({
      masterType:2
    });
  } else {
    this.setData({
      masterType:0
    });
  }
  const _this = this;
  this.setData({
    broadDirectionNamesIndex:e.detail.value,
    broadDirectionName:_this.data.broadDirectionNames[e.detail.value]
  });
  
  var app = getApp();
  let domainPrefix = app.globalData.domainPrefix;
  wx.request({
    url: domainPrefix + '/university/direction/involvedDirectionNamesAndCodes?name='+this.data.broadDirectionName,
    success(res) {
      _this.setData({
        involvedDirectionNames:res.data,
        involvedDirectionNamesIndex:0,
        involvedDirectionName:res.data[0]
      });
    }
  })
},
involvedDirectionNamesInput:function(e) {
  this.setData({
    involvedDirectionNamesIndex:e.detail.value,
    involvedDirectionName:this.data.involvedDirectionNames[e.detail.value]
  });
}
});