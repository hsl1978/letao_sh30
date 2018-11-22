$(function(){
   
  // 从后台获取数据，通过模板引擎进行渲染
var currentPage = 1;//当前页
var pageSize = 5; //每页条数
 
// 一进入页面进行一次渲染
  render();

  // 把渲染页面的ajax请求封装成一个函数
 function render(){


  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:'json',
    success:function(info){
      // console.log(info);
      var htmlStr = template('firstTpl',info);
      $('tbody').html(htmlStr);
      

      //  分页功能实现
     $('.pagination').bootstrapPaginator({
        // 设置当前的版本号
       bootstrapMajorVersion:3,
       // 显示第几页
       currentPage:info.page,
       // 总页数
      totalPages:Math.ceil(info.total /info.size),
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
       onPageClicked:function(a,b,c,page){
        // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
        currentPage = page;
        // 渲染页面
        render();

        } 
     })
    }
  })
 }
  


})