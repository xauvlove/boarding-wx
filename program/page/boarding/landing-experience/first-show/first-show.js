Page({
  onShow() {
    // tips 
    const _this = this;
    var app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    wx.request({
      url: domainPrefix + '/tip/bottom',
      success(res) {
        console.log(res);
        _this.setData({
          tip:res.data
        });
      }
    });

    // load landing exp
    if(this.data.isFirst) {
      wx.showLoading({
        title: '正在查询考研生涯~~',
      })
  
      setTimeout(() => {
        wx.hideLoading({
          complete: (res) => {},
        })
      }, 3000);
  
      const _this = this;
      var app = getApp();
      let domainPrefix = app.globalData.domainPrefix;
      wx.request({
        url: domainPrefix + '/share/landing/experience?page=' + this.data.page + '&rows=' + this.data.rows ,
        success(res) {
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
        }
      });
      this.setData({
        isFirst:false
      });
    }
  },
  onShareAppMessage() {
    return {
      title: '分享给研友吧！',
      path: 'page/component/index'
    }
  },

  data: {
    masterTypes: ["全日制学术硕士", "非全日制学术硕士","全日制专业硕士", "非全日制专业硕士"],
    total:0,
    totalPage:0,
    rows:5,
    page:1,
    landingExperiences:[],
    isFirst:true,
    tip:''
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showLoading({
    //   title: '正在查询考研生涯~~',
    // })

    // setTimeout(() => {
    //   wx.hideLoading({
    //     complete: (res) => {},
    //   })
    // }, 3000);

    // const _this = this;
    // var app = getApp();
    // let domainPrefix = app.globalData.domainPrefix;
    // wx.request({
    //   url: domainPrefix + '/share/landing/experience?page=' + this.data.page + '&rows=' + this.data.rows ,
    //   success(res) {
    //     let queryData = res.data;
    //     _this.setData({
    //       total:queryData.total,
    //       totalPage:queryData.totalPage,
    //       landingExperiences:queryData.items
    //     });
    //     wx.hideLoading({
    //       complete: (res) => {
    //         wx.showToast({
    //           title: '查到' + queryData.total + '条记录',
    //         })
    //       },
    //     })
    //   }
    // });
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.showLoading({
    //   title: '正在查询考研生涯~~',
    // })

    // setTimeout(() => {
    //   wx.hideLoading({
    //     complete: (res) => {},
    //   })
    // }, 3000);

    // const _this = this;
    // var app = getApp();
    // let domainPrefix = app.globalData.domainPrefix;
    // wx.request({
    //   url: domainPrefix + '/share/landing/experience?page=' + this.data.page + '&rows=' + this.data.rows ,
    //   success(res) {
    //     let queryData = res.data;
    //     _this.setData({
    //       total:queryData.total,
    //       totalPage:queryData.totalPage,
    //       landingExperiences:queryData.items
    //     });
    //     wx.hideLoading({
    //       complete: (res) => {
    //         wx.showToast({
    //           title: '查到' + queryData.total + '条记录',
    //         })
    //       },
    //     })
    //   }
    // });
  },
  // 展开详情
  openDetial(e) {
    const fid = e.currentTarget.id;
    const landingExperiences = this.data.landingExperiences;
    for (let i = 0, len = landingExperiences.length; i < len; ++i) {
      if (landingExperiences[i].fid === fid) {
        //跳转页面
        wx.setStorageSync('landingExpDetail', landingExperiences[i]);
        // wx.setStorageSync({
        //   key: 'landingExpDetail',
        //   data: landingExperiences[i]
        // })
        //console.log(landingExperiences[i])
        wx.navigateTo({
          url: '../landing-exp-detail/landing-exp-detail'
        })
      } else {
       
      }
    }
    // this.setData({
    //   universityDirections:direction
    // })
    wx.reportAnalytics('click_view_programmatically', {})
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
    
    const _this = this;
    let queryPage = this.data.page + 1;
    let app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    wx.request({
      url: domainPrefix + '/share/landing/experience?page=' + queryPage + '&rows=' + _this.data.rows ,
      success(res) {
        console.log(domainPrefix + '/share/landing/experience?page=' + queryPage + '&rows=' + _this.data.rows);
        let queryData = res.data;
        _this.setData({
          total:queryData.total,
          totalPage:queryData.totalPage,
          landingExperiences:queryData.items
        });
        _this.setData({
          page:queryPage
        });
        if(_this.data.page > queryData.totalPage-1) {
          //隐藏 下一页
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      }
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
    const _this = this;
    let queryPage = this.data.page - 1;
    let app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    wx.request({
      url: domainPrefix + '/share/landing/experience?page=' + queryPage + '&rows=' + _this.data.rows ,
      success(res) {
        let queryData = res.data;
        _this.setData({
          total:queryData.total,
          totalPage:queryData.totalPage,
          landingExperiences:queryData.items
        });
        _this.setData({
          page:queryPage
        });
        if(_this.data.page <= 0) {
          //隐藏 下一页
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    });
  }
})
