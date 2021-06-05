Page({
  onShow() {
    //wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '分享给研友吧！',
      path: 'page/component/index'
    }
  },

  data: {
    universityDirections:[],
    masterTypes: ["全日制学术硕士", "非全日制学术硕士","全日制专业硕士", "非全日制专业硕士"],
    masterType: 0,
    tip:''
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let previousPage = null;
    //let currentPage = null;
    if(pages.length >= 2) {
      previousPage = pages[pages.length-2];
      this.setData({
        universityDirections:previousPage.data.universityDirections,
        masterType:previousPage.data.masterType
      });
    }
    if(this.data.universityDirections.length <= 0) {
      wx.showToast({
        title: '高校不招此类硕士',
        icon:'none',
        duration:3000
      })
    }
  },
  // 展开详情
  openDetial(e) {
    const fid = e.currentTarget.id;
    const direction = this.data.universityDirections;
    for (let i = 0, len = direction.length; i < len; ++i) {
      if (direction[i].fid === fid) {
        direction[i].open = !direction[i].open
      } else {
        direction[i].open = false;
      }
    }
    this.setData({
      universityDirections:direction
    })
    wx.reportAnalytics('click_view_programmatically', {})
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
  jumpToExamRangeSite(e){
    wx.showToast({
      title: '功能正在开发中 ~ ',
      icon:'none'
    })
  }
})
