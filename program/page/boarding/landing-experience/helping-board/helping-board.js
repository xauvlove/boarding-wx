// miniprogram/page/boarding/university/helpingBoard.js
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
    masterTypes: ["[~] 全日制学术硕士", "[~] 非全日制学术硕士","[~] 全日制专业硕士", "[~] 非全日制专业硕士"],
    masterType: 0,
    experience:null
  },

  formSubmit() {
    const _this = this;
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
              title: '正在提交',
            })
            // wx.showToast({
            //     title: ''
            // });
            _this.postUniversityDirection();
        }
    })
  },
  postUniversityDirection() {
    const _this = this;
    var app = getApp();
    let domainPrefix = app.globalData.domainPrefix;
    wx.request({
      url: domainPrefix + '/share/landing/experience',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data:{
        universityName:_this.data.universityName,
        broadDirectionName:_this.data.broadDirectionName,
        involvedDirectionName:_this.data.involvedDirectionName,
        majorDirectionName:_this.data.majorDirectionName,
        examDate:_this.data.examDate,
        examMark:_this.data.examMark,
        examRank:_this.data.examRank,
        reExamMarkLimit:_this.data.reExamMarkLimit,
        reExamMark:_this.data.reExamMark,
        contactInfo:_this.data.contactInfo,
        masterType:_this.data.masterType,
        experience:_this.data.experience
      },
      fail(res){
        wx.showToast({
          title: '网络异常',
          icon:'none'
        })
      },
      success(res) {
        if(res.statusCode == 400) {
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '填写的内容不太规范~',
                icon:'none'
              })
            },
          })
        } else {
          wx.hideLoading({
            success:(res) =>{
              wx.showToast({
                title: '感谢分享！'
              });
              _this.clearContent();
              
              //线程如何睡眠？ //todo
              // wx.switchTab({
              //    url: '../first-show/first-show',
              //  });
            },
          })
        }
      },
      complete(res){
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },
  formReset() {
    console.log('reset')
    this.setData({
      universityName:'',
      broadDirectionName:'',
      involvedDirectionName:'',
      majorDirectionName:'',
      examDate:'',
      examMark:'',
      examRank:'',
      reExamMarkLimit:'',
      reExamMark:'',
      contactInfo:'',
      masterType: 0,
      experience:''
    });
  },
  clearContent:function(e) {
    this.setData({
      universityName:'',
      broadDirectionName:'',
      involvedDirectionName:'',
      majorDirectionName:'',
      examDate:'',
      examMark:'',
      examRank:'',
      reExamMarkLimit:'',
      reExamMark:'',
      contactInfo:'',
      masterType: 0,
      experience:''
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  ////////////////////////set input///////////////////////////////
  universityNameInput:function(e) {
    this.setData({
      universityName:e.detail.value
    });
  },
  broadDirectionNameInput:function(e) {
    this.setData({
      broadDirectionName:e.detail.value
    });
  },
  involvedDirectionNameInput:function(e) {
    this.setData({
      involvedDirectionName:e.detail.value
    });
  },
  majorDirectionNameInput:function(e) {
    this.setData({
      majorDirectionName:e.detail.value
    });
  },
  examDateInput:function(e) {
    this.setData({
      examDate:e.detail.value
    });
  },
  examMarkInput:function(e) {
    this.setData({
      examMark:e.detail.value
    });
  },
  examRankInput:function(e) {
    this.setData({
      examRank:e.detail.value
    });
  },
  reExamMarkLimitInput:function(e) {
    this.setData({
      reExamMarkLimit:e.detail.value
    });
  },
  reExamMarkInput:function(e) {
    this.setData({
      reExamMark:e.detail.value
    });
  },
  contactInfoInput:function(e) {
    this.setData({
      contactInfo:e.detail.value
    });
  },
  masterTypeInput:function(e) {
    this.setData({
      masterType:e.detail.value
    });
  },
  experienceInput:function(e) {
    this.setData({
      experience:e.detail.value
    });
  },
})