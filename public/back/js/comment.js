//这个进度条放在入口函数的外面，这样就可以在每个页面都有这个效果了


 
 // ajax全局事件机制

 $(document).ajaxStart(function() {
  // 开启进度条
  　　NProgress.start();
});

$(document).ajaxStop(function() {
  // 关闭进度条
  　　NProgress.done();
});



$(function(){

  // 公共的功能
    // 1.左侧二级菜单切换功能
    $('#category').click(function(){
      // 找下一个兄弟元素
      $(this).next().stop().slideToggle();
    })

    // 2.左侧菜单切换功能
    $('.lt_topbar .icon_left').click(function(){
      // 让左侧菜单进行切换，toggleClass 切换类
      $('.lt_aside').toggleClass("hidemenu");
      $('.lt_topbar').toggleClass("hidemenu");
      $('.lt_main').toggleClass("hidemenu");
    });



    // 3.公共退出功能
    $('.lt_topbar .icon_right').click(function(){
          // 显示退出模态框
          $("#logoutModal").modal("show");
    });

    $('#logoutBtn').click(function(){
      // 调用接口，让后台销毁当前用户的登录状态
      $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
          // console.log(info);
          if(info.success){
            location.href = "login.html";
          }
          
        }

      })
    })
})