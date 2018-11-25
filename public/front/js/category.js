$(function(){

  //  一进入页面


  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      // console.log(info);
      var htmlStr = template("leftTpl",info);

      $('#leftCate').html(htmlStr);

      // 默认渲染第一条二级分类
      renderById(info.rows[0].id);
      
    }
  })



   $('.lt_category_left').on("click","a",function(){
     
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");


    var id = $(this).data("id");
    renderById(id);
   })

   function renderById(id){
    //  根据id发送ajax请求

    $.ajax({
    type:'get',
    url:'/category/querySecondCategory',
    dataType:'json',
    data:{
      id:id,
    },
    success:function(info){
      console.log(info);
      var htmlStr = template("rightTpl",info);
      $(".lt_category_right ul").html(htmlStr);
    }
    })

   }

})