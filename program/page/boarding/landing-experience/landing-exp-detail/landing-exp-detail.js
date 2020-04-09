// page/boarding/landing-experience/landing-exp-detail/landing-exp-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    universityName:null,
    broadDirectionName:null,
    involvedDirectionName:null,
    majorDirectionName:null,
    examDate:null,
    examMark:null,
    examRank:null,
    reExamMarkLimit:null,
    reExamMark:null,
    contactInfo:null,
    masterTypes: ["全日制学术硕士", "非全日制学术硕士","全日制专业硕士", "非全日制专业硕士"],
    masterType: 0,
    experience:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    })
    var expDetail = wx.getStorageSync('landingExpDetail');
    console.log(expDetail)
    this.setData({
      universityName:expDetail.universityName,
      broadDirectionName:expDetail.broadDirectionName,
      involvedDirectionName:expDetail.involvedDirectionName,
      majorDirectionName:expDetail.majorDirectionName,
      examDate:expDetail.examDate,
      examMark:expDetail.examMark,
      examRank:expDetail.examRank,
      reExamMarkLimit:expDetail.reExamMarkLimit,
      reExamMark:expDetail.reExamMark,
      contactInfo:expDetail.contactInfo,
      masterType: expDetail.masterType,
      experience:expDetail.experience,
      tip:''
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})