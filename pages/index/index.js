//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    xval:1,
    yval:1,
    xnum:1,
    ynum:1,
    I0:0,
    U0:0,
    Is:1,//初始电流
    C1:10,
    U1:10,
    R1:1,
    Us:10,
    L1:5,//电感
    w:10,
    fanu:0.78,//初相角
    T:[],//tao值
    Un:5,//电压初始值
    ctx1:[],
    multiblex:1,
    multibley:1,
    x0:0,//x轴零点
    y0:150,//y轴零点
    x: 0,
    y: 0,
    currentid:[],
    stack:1,
    windowHeight: [],
    windowWidth: [],
  },
  navback:function(){
    var that = this
    that.setData({
      stack:1
    })
  },
  cal1:function(e){
    var that = this
    if (e.detail.value.U != '') that.setData({ U1: parseFloat(e.detail.value.U),})
    if (e.detail.value.R != '') that.setData({ R1: parseFloat(e.detail.value.R), })
    if (e.detail.value.C != '') that.setData({ C1: parseFloat(e.detail.value.C), })
    if (e.detail.value.Us != '') that.setData({ Us: parseFloat(e.detail.value.Us), })
    if (e.detail.value.Un != '') that.setData({ Un: parseFloat(e.detail.value.Un), })
    if (e.detail.value.w != '') that.setData({ w: parseFloat(e.detail.value.w), })
    if (e.detail.value.L1 != '') that.setData({ L1: parseFloat(e.detail.value.L1),})
    if (e.detail.value.fanu != '') that.setData({ fanu: parseFloat(e.detail.value.fanu) * (Math.PI / 180), })
    if (e.detail.value.Is != '') that.setData({ Is: parseFloat(e.detail.value.Is), })
    if (e.detail.value.U0 != '') that.setData({ U0: parseFloat(e.detail.value.U0), })
    if (e.detail.value.I0 != '') that.setData({ I0: parseFloat(e.detail.value.I0), })
    setTimeout(function(){
      switch(parseInt(that.data.currentid)){
        case 1:
          that.drawmap1()
          break;
        case 2:
          that.drawmap2()
          break;
        case 3:
          that.drawmap3()
          break;
        case 4:
          that.drawmap4()
          break;
        case 7:
          that.drawmap7()
          break;
      }
    },200)
  },
  multibleit:function(e){//将坐标乘倍
    var that = this
    if(e.currentTarget.dataset.id=='x'){
      that.setData({
        multiblex: parseFloat(that.data.multiblex) * parseFloat(e.currentTarget.dataset.num)
      })
    }else{
      that.setData({
        multibley: parseFloat(that.data.multibley) / parseFloat(e.currentTarget.dataset.num)
      })
    }
    switch (parseInt(that.data.currentid)) {
      case 1: that.drawmap1(); break;
      case 2: that.drawmap2(); break;
      case 3: that.drawmap3(); break;
      case 4: that.drawmap4(); break;
      case 5: that.drawmap5(); break;
      case 6: that.drawmap6(); break;
      case 7: that.drawmap7(); break;
    }
  },
  draw: function(e){
    var that = this
    that.setData({
      currentid : e.currentTarget.dataset.id,
      stack:2
    })
    setTimeout(function () {
      switch (parseInt(e.currentTarget.dataset.id)) {
        case 1: {
          that.setData({
            xval: 1,
            yval: 1,
            R1:1,
            U1:10,
            C1:10
          })
          that.drawmap1();
          break;
        }
        case 2: {
          that.setData({
            xval: 1,
            yval: 1,
            R1:1,
            Us:10,
            C1:10,
          })
          that.drawmap2();
          break;
        }
        case 3: {
          that.setData({
            xval:1,
            yval:1,
            R1:1,
            Us:10,
            C1:10,
            Un:5
          })
          that.drawmap3();
          break;
        }
        case 4: {
          that.setData({
            xval:10,
            yval:10,
            L1:5,
            Us:10,
            R1:1,
            w:10,
            fanu:0.78,
          })
          that.drawmap4();
          break;
        }
        case 5: {
          that.setData({
            multiblex: 80,
            multibley: 0.1
          })
          that.drawmap5();
          break;
        }
        case 6: {
          that.drawmap6();
          break;
        }
        case 7: {
          that.setData({
            yval:1000,
            xval:1000,
            Is:1,
            L1:1,
            C1:0.000001,
            R1:600,
            U0:0,
            I0:0
          })
          that.drawmap7();
          break;
        }
      }
    }, 100) 
    
  },
  drawmap1:function(){//一阶RC零响应
    var that = this
    that.setData({
      T:that.data.R1*that.data.C1,
      xnum: 5 * that.data.R1 * that.data.C1,
      ynum: that.returnMax()/5*3/2
    })
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = that.data.ctx1
    ctx.moveTo(x0, y0)
    ctx.lineTo(700, y0)
    ctx.lineWidth = 1;
    ctx.restore()
    var xmultible = that.data.R1 * that.data.C1 * 5 / 300;
    var ymultible = 100/that.returnMax();
    ctx.moveTo(0, y0 - that.calculate1(0)*ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i * xmultible
      var y = y0-that.calculate1(x)*ymultible
      ctx.lineTo(i,y)
    }
    ctx.stroke()
    ctx.draw()
    ctx.save()
  },
  drawmap2: function () {//一阶RC零状态响应
    var that = this
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.moveTo(x0, y0)
    ctx.lineTo(300, y0)
    that.setData({
      T:that.data.R1*that.data.C1,
      xnum:that.data.R1*that.data.C1*5,
      ynum:that.returnMax2()/5*3/2
    })
    var ymultible = 100/that.returnMax2();
    var xmultible = that.data.R1 * that.data.C1*5 / 300;
    ctx.moveTo(0, y0 - that.calculate3(0) * ymultible)
    for (let i = 0; i < 300; i++) {
      var x = i *xmultible
      var y = y0 - that.calculate3(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.moveTo(0, y0 - that.calculate3_2(0) / ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i * xmultible
      var y = y0 - that.calculate3_2(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.moveTo(0, y0 - that.calculate3_3(0) * ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i * xmultible
      var y = y0 - that.calculate3_3(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.stroke()
    ctx.draw()
  },
  drawmap3: function () {//一阶RC全响应
    var that = this
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.moveTo(x0, y0)
    ctx.lineTo(300, y0)
    that.setData({
      T: that.data.R1 * that.data.C1,
      xnum: that.data.R1 * that.data.C1 * 5,
      ynum: that.returnMax3() / 5 * 3 / 2
    })
    var ymultible = 100 / that.returnMax3();
    var xmultible = that.data.R1 * that.data.C1 * 5 / 300
    ctx.moveTo(0, y0 - that.calculate7(0) * ymultible)
    for (let i = 0; i < 300; i++) {
      var x = i * xmultible
      var y = y0 - that.calculate7(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.stroke()
    ctx.draw()
  },
  drawmap4:function(){//一阶LC零输入响应
    var that = this
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.moveTo(x0, y0)
    ctx.lineTo(300, y0)
    var xval=that.data.xval
    var yval = that.data.yval
    var tempxnum = (that.data.L1 / that.data.R1 / that.data.w * 2 *xval).toFixed(4)
    var tempynum = (that.returnMax4() / 5 * 3 / 2*yval).toFixed(4)
    that.setData({
      T: that.data.L1 / that.data.R1,
      xnum: tempxnum,
      ynum: tempynum
    })
    var ymultible = 100 / that.returnMax4();
    var xmultible = that.data.L1 / that.data.R1 / that.data.w*2 / 300
     ctx.moveTo(0, y0 - that.calculate5(0)*ymultible)
    for (let i = 0; i < 300; i++) {//激励
      var x = i * xmultible
      var y = y0-that.calculate5(x) * ymultible
      ctx.lineTo(i,y)
    }
    ctx.moveTo(0, y0 - that.calculate5_2(0) * ymultible)
    for (let i = 0; i < 300; i++) {//自由分量
      var x = i * xmultible
      var y = y0 - that.calculate5_2(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.moveTo(0, y0 - that.calculate5_3(0) * ymultible)
    for (let i = 0; i < 300; i++) {//响应
      var x = i * xmultible
      var y = y0 - that.calculate5_3(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.stroke()
    ctx.draw()
  },
  drawmap5: function () {//一阶LC零状态响应
    var that = this
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = wx.createCanvasContext('myCanvas')
    console.log("here")
    ctx.moveTo(x0, y0)
    ctx.lineTo(700, y0)
    var ymultible = that.data.multibley;//增大图像收缩，减小图像拉伸
    var xmultible = that.data.multiblex;//增大图像拉伸，减小图像压缩
    ctx.moveTo(0, y0 - that.calculate4(0) / ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i / xmultible
      var y = y0 - that.calculate4(x) / ymultible
      ctx.lineTo(i, y)
    }
    ctx.moveTo(0, y0 - that.calculate4_2(0) / ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i / xmultible
      var y = y0 - that.calculate4_2(x) / ymultible
      ctx.lineTo(i, y)
    }
    ctx.moveTo(0, y0 - that.calculate4_3(0) / ymultible)
    for (let i = 0; i < 700; i++) {
      var x = i / xmultible
      var y = y0 - that.calculate4_3(x) / ymultible
      ctx.lineTo(i, y)
    }
    ctx.stroke()
    ctx.draw()
  },
  drawmap6: function () {
  },
  drawmap7: function () {//二阶电路全响应
    var that = this
    var x0 = that.data.x0;
    var y0 = that.data.y0;
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.moveTo(x0, y0)
    ctx.lineTo(300, y0)
    var xval = that.data.xval
    var yval = that.data.yval
    var L = that.data.L1;//1
    var C = that.data.C1;//0.000001
    var R = that.data.R1;//500
    var Is = that.data.Is;//1
    var I0 = that.data.I0;//0
    var U0 = that.data.I0;//0
    var G = 1 / R;
    var deta = G * G / (4 * C * C) - 1 / (L * C)
    var tempxnum = ((that.data.L1 / that.data.R1 * 5) * xval).toFixed(2)
    if (deta <= 0) var tempynum = (that.returnMax7()  / 5 * yval).toFixed(2);
    else {var tempynum = (that.returnMax7()/5*3/2).toFixed(2)
    console.log("haha")
    }
    
    that.setData({
      xnum: tempxnum,
      ynum: tempynum
    })
    if (deta <= 0) var ymultible = 150 / that.returnMax7();
    else ymultible = 100/that.returnMax7()
    console.log(that.returnMax7())
    var xmultible = that.data.L1  / that.data.R1*10  / 300;
    ctx.moveTo(0, y0 - that.calculate6(0) * ymultible)
    for (let i = 0; i < 300; i++) {
      var x = i * xmultible
      var y = y0 - that.calculate6(x) * ymultible
      ctx.lineTo(i, y)
    }
    ctx.stroke()
    ctx.draw()
  },
  start: function (e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function (e) {
    this.setData({
      hidden: true
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  p1:function(e){
    console.log("youdid")
  },
  onLoad: function () {
     var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
    var ctx1 = wx.createCanvasContext('myCanvas')
    that.setData({
      ctx1:ctx1
    })
  },


  calculate1: function (e) {//一阶0输入电容响应
    var that = this
    var U0 = that.data.U1;
    var R = that.data.R1;
    var C = that.data.C1;
    return U0 * Math.pow(Math.E, -e / (R * C))
  },
  returnMax: function () {
    var that = this
    var max = 0;
    var p=that.data.R1*that.data.C1/300;
    for (let i = 0; i < 300; i++) {
      var x = i * p
      var y = that.calculate1(x)
      if (y > max) max = y;
    }
    return max;
  },
  calculate2: function (e) {//一阶零输入电感响应
    var that = this
    var I0 = 10;
    var R = 10;
    var L = 10;
    return -R * I0 * Math.pow(Math.E, -e * R / L)
  },
  calculate2_2: function (e) {
    var that = this
    var I0 = 10;
    var R = 10;
    var L = 10;
    return I0 * Math.pow(Math.E, -e * R / L)
  },
  calculate2_3: function (e) {
    var that = this
    var I0 = 10;
    var R = 10;
    var L = 10;
    return I0 * R * Math.pow(Math.E, -e * R / L)
  },
  calculate3: function (e) {//一阶RC0状态响应
    var that = this
    var Us = that.data.Us;
    var C = that.data.C1;
    var R = that.data.R1;
    return Us - Us * Math.pow(Math.E, -e / (R*C))
  },
  returnMax2: function () {
    var that = this
    var max = 0;
    var p = that.data.R1 * that.data.C1 *5 / 300;
    for (let i = 0; i < 300; i++) {
      var x = i * p
      var y = that.calculate3(x)
      if (y > max) max = y;
    }
    return max;
  },
  calculate3_2: function (e) {
    var that = this
    var Us = that.data.Us;
    var C = that.data.C1;
    var R = that.data.R1;
    return Us * Math.pow(Math.E, -e / (R*C)) / R
  },
  calculate3_3: function (e) {
    var that = this
    var Us = that.data.Us;
    var C = that.data.C1;
    var R = that.data.R1;
    return -Us * Math.pow(Math.E, -e / (C*R))
  },
  calculate4: function (e) {
    var that = this
    var Is = 10;
    var tao = 1;
    var R = 1;
    return Is - Is * Math.pow(Math.E, -e / tao)
  },
  calculate4_2: function (e) {
    var that = this
    var Is = 10;
    var tao = 1;
    var R = 1;
    return Is * Math.pow(Math.E, -e / tao) * R
  },
  calculate4_3: function (e) {
    var that = this
    var Is = 10;
    var tao = 1;
    var R = 1;
    return -Is * Math.pow(Math.E, -e / tao)
  },
  calculate5: function (e) {//i1
    var that = this
    var Us = that.data.Us;
    var w = that.data.w;
    var fanu = that.data.fanu;//外施电压初相角
    var L = that.data.L1;//电感
    var R = that.data.R1;//电阻
    var fan = Math.atan(w * L / R);
    var Z = Math.sqrt(R * R + w * L * w * L);
    return Us / Z * Math.cos(w * e + fanu - fan)
  },
  returnMax4:function(){
    var that = this
    var max = 0;
    var p = that.data.L1 / that.data.R1 / that.data.w/ 2 / 300;
    for (let i = 0; i < 300; i++) {
      var x = i * p
      var y = that.calculate5(x)
      if (y > max) max = y;
    }
    return max;
  },
  calculate5_2: function (e) {//i11
    var that = this
    var Us = that.data.Us;
    var w = that.data.w;
    var fanu = that.data.fanu;//外施电压初相角
    var L = that.data.L1;//电感
    var R = that.data.R1;//电阻
    var fan = Math.atan(w * L / R);
    var Z = Math.sqrt(R * R + w * L * w * L);
    return -Us / Z * Math.cos(fanu - fan) * Math.pow(Math.E, -e * L / R)
  },
  calculate5_3: function (e) {//i
    var that = this
    var Us = that.data.Us;
    var w = that.data.w;
    var fanu = that.data.fanu;//外施电压初相角
    var L = that.data.L1;//电感
    var R = that.data.R1;//电阻
    var fan = Math.atan(w * L / R);
    var Z = Math.sqrt(R * R + w * L * w * L);
    return Us / Z * Math.cos(w * e + fanu - fan) - Us / Z * Math.cos(fanu - fan) * Math.pow(Math.E, -e * L / R)
  },
  calculate6: function (e) {
    var that = this
    var L = that.data.L1;//1
    var C = that.data.C1;//0.000001
    var R = that.data.R1;//500
    var Is = that.data.Is;//1
    var I0 = that.data.I0;//0
    var U0 =that.data.U0;//0
    var G = 1 / R;
    var deta = G * G / (4 * C * C) - 1 / (L * C)
    if (deta < 0) {//两个负实根
      deta = -deta
      var w = Math.sqrt(deta)
      var si = G / (2 * C)
      var B = Math.atan((I0 - Is) / (I0 - Is + U0 / (w * L)))
      var A = (I0 - Is) / Math.sin(B)
      return A * Math.pow(Math.E, -w * e) * Math.sin(w * e + B)
    } else {
      if (deta == 0) {//两个相等的负实根
        var p = -G / (2 * C);
        var A1 = I0 - Is
        var A2 = U0 / L - p * A1
        var result = Is + ((I0 - Is) + (U0 / L - p * (I0 - Is)) * e) * Math.pow(Math.E, p * e)
        return result
      } else {//共轭复根

        var p1 = -G / (2 * C) + Math.sqrt(deta)
        var p2 = -G / (2 * C) - Math.sqrt(deta)
        var A1 = (p2 * I0 - U0 / L - p2 * Is) / (p2 - p1)
        var A2 = (p1 * I0 - U0 / L - p1 * Is) / (p1 - p2)
        var result = Is + A1 * Math.pow(Math.E, p1 * e) + A2 * Math.pow(Math.E, p2 * e)
        return Is + A1 * Math.pow(Math.E, p1 * e) + A2 * Math.pow(Math.E, p2 * e)
      }

    }
  },
  returnMax7:function(){
    var that = this
    var max = 0;
    var p = that.data.L1 / that.data.R1* 5 / 300;
    for (let i = 0; i < 300; i++) {
      var x = i * p
      var y = that.calculate6(x)
      if (y > max) max = y;
    }
    return max;
  },
  calculate7:function(e){
    var that = this 
    var Un=that.data.Un
    var Us=that.data.Us
    var R=that.data.R1
    var C=that.data.C1
    return Us+(Un-Us)*Math.pow(Math.E,-e/(R*C))
  },
  returnMax3: function () {
    var that = this
    var max = 0;
    var p = that.data.R1 * that.data.C1 * 5 / 300;
    for (let i = 0; i < 300; i++) {
      var x = i * p
      var y = that.calculate7(x)
      if (y > max) max = y;
    }
    return max;
  }
})
