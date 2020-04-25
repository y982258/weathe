// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'未知',
    today:{},
    future:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadIfo()
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

  },
  loadIfo:function(){
    let _this=this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude,longitude)
        _this.loadCity(latitude,longitude)
      }
     })
  },
  loadCity:function(x,y){
    let _this=this
    wx.request({
      
      url:'https://api.map.baidu.com/reverse_geocoding/v3/?ak=2MvKXXqzNzI59Sw4cUSRxw2M5LzH5qNV&output=json&coordtype=wgs84ll&location='+x+','+y+'121.49884033194 ',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
         console.log(res)
         var city = res.data.result.addressComponent.province
         var adcode= res.data.result.addressComponent.adcode
         _this.setData({city:city})
         _this.weather(adcode)
      }
    })
  },
  weather:function(adcode){

    let _this=this
    wx.request({
      url:'https://restapi.amap.com/v3/weather/weatherInfo?key=45f84d8acea1b9542fe2aa972000c1ac&city='+adcode+'&extensions=all',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){

         console.log(res)
         if(res.statusCode==200){
           var today=res.data.forecasts[0].casts[0]
           var future=res.data.forecasts[0].casts
           console.log(future)
         }

         _this.setData({
          today:today,
          future:future
         })
      }
    })
  }
})