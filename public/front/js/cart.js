

$(function(){
  
//  1.一进入页面，发送ajax请求，获取当前购物车的数据
//  (1)如果当前用户未登录，后台返回error，拦截到登录页
//  (2)如果当前用户已登录，后台返回 购物车数据
   render();
  function render(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        console.log(info);

        if(info.error === 400){
          // 拦截到登录页
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        // 说明用户已登陆过，返回购物车数据 info是一个数组，需要包装
        var htmlStr = template("cartTpl",{list:info});
        $('.lt_main ul').html(htmlStr);
      }
    });

  }




  // 2.删除功能
  // (1)给所有的删除按钮添加点击事件
  // (2)获取id,发送请求
  // (3)重新渲染页面

  $('.lt_main').on("click",".btn_delete",function(){

    // 获取id
    var id = $(this).data("id");

    // 发送删除请求
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{
        id:[id],
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          // 删除成功，页面要重新渲染
          render();
        }
        
      }
    })
  })

})