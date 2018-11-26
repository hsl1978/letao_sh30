
$(function(){


 $("#loginBtn").click(function(){
  //  登录功能，点击按钮，发送登录请求即可

  // 获取用户名和密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    
    if(username === ""){
      mui.toast("请输入用户名");
      return;
    }
 
    if(password === ""){
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password,
      },
      dataType:'json',
      success:function(info){

        console.log(info);
        if(info.error === 403){
          mui.toast("用户名或者密码错误");
          return;
        } 
        
        if(info.success){
          // 登录成功
          //(1)有传参，从商品详情页跳过来的，传递了retUrl,需要跳转回去
          //(2)没有传参，将参数地址获取，跳回去
         if(location.search.indexOf("retUrl") != -1){

           var retUrl = location.search.replace("?retUrl=","");
 
           // 得到地址，跳回去
           location.href = retUrl;
          }else{
            // 没传参，跳到用户页
            location.href = "user.html";
  
          }
         }
      }
    })
 
 
 
  })

})