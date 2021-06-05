Page({
  onShow() {
    // tips 
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
    });

    // load landing exp
    if(this.data.isFirst) {
      wx.showLoading({
        title: '俯瞰考研生涯~',
      })
  
      setTimeout(() => {
        wx.hideLoading({
          complete: (res) => {},
        })
      }, 3000);
  
      const _this = this;
      var app = getApp();
      let domainPrefix = app.globalData.domainPrefix;
      let loginSession = wx.getStorageSync('LOGININFO');
      wx.request({
        url: domainPrefix + '/share/landing/experience',
        data:{
          page:this.data.page,
          rows:this.data.rows,
          loginSession:loginSession
        },
        method:'GET',
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res) {
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
          let queryData = res.data;
          _this.setData({
            total:queryData.total,
            totalPage:queryData.totalPage,
            landingExperiences:queryData.items
          });
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '查到' + queryData.total + '条记录',
              })
            },
          })
        },
        fail(res) {
          wx.showToast({
            title: '网络异常，请重试',
            icon:'none'
          })
        }
      });
      this.setData({
        isFirst:false
      });
    }
  },
  onShareAppMessage() {
    return {
      title: '分享给小伙伴吧！',
      path: 'page/boarding/landing-experience/first-show/first-show'
    }
  },

  data: {
    masterTypes: ["全日制学术硕士", "非全日制学术硕士","全日制专业硕士", "非全日制专业硕士"],
    total:0,
    totalPage:0,
    rows:8,
    page:1,
    landingExperiences:[],
    isFirst:true,
    tip:'',
    floorstatus:false
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { 
    this.queryByPage(this.data.page);
    wx.stopPullDownRefresh({
      // complete: (res) => {
      //   wx.showToast({
      //     title: '刷新成功'
      //   })
      // },
    })
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 展开详情
  openDetial(e) {
    const fid = e.currentTarget.id;
    const landingExperiences = this.data.landingExperiences;
    for (let i = 0, len = landingExperiences.length; i < len; ++i) {
      if (landingExperiences[i].fid === fid) {
        //跳转页面
        wx.setStorageSync('landingExpDetail', landingExperiences[i]);
        wx.navigateTo({
          url: '../landing-exp-detail/landing-exp-detail'
        })
      } else {
       
      }
    }
    wx.reportAnalytics('click_view_programmatically', {})
  },
  queryByPage(queryPage) {
    const _this = this;
    let app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    let loginSession = wx.getStorageSync('LOGININFO');
    wx.request({
      url: domainPrefix + '/share/landing/experience',
      data:{
        page:queryPage,
        rows:_this.data.rows,
        loginSession:loginSession
      },
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res) {
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
        _this.goTop();
        let queryData = res.data;
        _this.setData({
          total:queryData.total,
          totalPage:queryData.totalPage,
          landingExperiences:queryData.items
        });
        wx.hideLoading({
          complete: (res) => {},
        })
      },
      fail(res) {
        wx.showToast({
          title: '网络存在异常',
          icon:'none'
        })
      }
    });
  },
  queryNextPage(e) {
    //如果已经最后一页
    if(this.data.page >= this.data.totalPage) {
      wx.showToast({
        title: '已经是最后一页',
        icon:'none'
      })
      return;
    }
    let queryPage = this.data.page + 1;
    this.queryByPage(queryPage);
    this.setData({
      page:queryPage
    });
  },
  queryLastPage(e) {
    //如果已经是第一页
    if(this.data.page == 1) {
      wx.showToast({
        title: '已经是第一页',
        icon:'none'
      })
      return;
    }

    let queryPage = this.data.page - 1;
    this.queryByPage(queryPage);
    this.setData({
      page:queryPage
    });
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})
