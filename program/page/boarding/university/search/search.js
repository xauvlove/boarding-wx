Page({
  data: {
      universityName:'',
      broadDirectionName:'',
      involvedDirectionName:'',
      majorDirectionName:'',
      directionName:'',
      universityDirections:[],
      masterTypes: ["[~] 全日制学术硕士", "[~] 非全日制学术硕士","[~] 全日制专业硕士", "[~] 非全日制专业硕士"],
      masterType: 0,
      tip:'',
      formData: {

      },
      rules: []
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
  formReset: function () {
    console.log('form发生了reset事件')
    this.setData({
      universityName:'',
      broadDirectionName:'',
      involvedDirectionName:'',
      majorDirectionName:'',
      directionName:'',
      masterType: 0
    });
  },
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
  const requestTask = wx.request({
    url: domainPrefix + '/university/direction/list',
    data:{
      universityName:_this.data.universityName,
      broadDirectionName:_this.data.broadDirectionName,
      involvedDirectionName:_this.data.involvedDirectionName,
      majorDirectionName:_this.data.majorDirectionName,
      directionName:_this.data.directionName,
      masterType:_this.data.masterType
    },
    success(res) {
      console.log(res)
      if(res.statusCode == 404 || res.statusCode == 400) {
        wx.showToast({
          title: '似乎少填了什么信息',
          icon:"none"
        })
        return;
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
broadDirectionInput:function(e) {
  this.setData({
    broadDirectionName:e.detail.value
  });
},
involvedDirectionInput:function(e) {
  this.setData({
    involvedDirectionName:e.detail.value
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
  console.log(this.data.masterType);
}
});