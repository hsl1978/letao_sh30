

$(function(){

  // 获取从列表页传递过来的id,在列表页的id传过来是拼接到地址栏中的，通过调用自己封装的 getSeach方法，拿到对应id

  var productId =  getSeach("productId");
  // console.log(productId);
  

  //根据productId,发送ajax请求，获取对应商品的数据进行渲染

  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:productId,
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr = template("productTpl",info);

      $('.lt_main .mui-scroll').html(htmlStr);


      // 渲染完成轮播图结构后，进行轮播初始化，因为此时的轮播图
      // 是动态渲染的，只能手动初始化
      //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
           interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });



        // 重新初始化数字框
        mui('.mui-numbox').numbox()
    }
  });


  // 3.给尺码添加可选功能
  $('.lt_main').on("click",".lt_size span",function(){
       //给自己加上current类，其他的移除current类

       $(this).addClass("current").siblings().removeClass("current");
  });

  // 4.加入购物车功能
  $('#addCart').click(function(){
     
    // 获取尺码数量
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();

      // console.log(size);
      

    if(size === null){
      mui.toast("请选择尺码");
      return;
    }

    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        size:size,
        num:num,
      },
      dataType:'json',
      success:function(info){
        // （1）未登录，拦截到登录页
              // 由于登录成功要跳回来，可以将整个当前页面地址作为参数传递进去

        // console.log(info);
        if(info.error === 400){
          // 未登录，拦截到登录页
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
          
        // (2)已登录，success加入成功
        if(info.success){
          // 表示加入成功
          // 给用户提示
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
            // e.index 标记当前点击的按钮下标
              if(e.index === 0){
                // 去购物车
                location.href = "cart.html";
              }
          })
        }
        
      }
    })

  })



})