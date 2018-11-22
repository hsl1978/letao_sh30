$(function(){

   var currentPage = 1;
   var pageSize = 5;
    //发送ajax请求，渲染页面

    // 一进入页面渲染一次
    render();
    function render(){

      $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
          page:currentPage,
          pageSize:pageSize,
        },
        dataType:'json',
        success:function(info){
          console.log(info);
          var htmlStr = template("secondTpl",info);
          $('tbody').html(htmlStr);
          
          // 分页的功能实现
          $('#paginator').bootstrapPaginator({
            // 版本号
            bootstrapMajorVersion:3,
            currentPage:info.page,//当前页
            // 总页数
            totalPages:Math.ceil(info.total / info.size),
            // 给每个页码添加点击事件
            onPageClicked:function(a,b,c,page){
              // 更新当前页，并且渲染
              currentPage = page;
              render();
            }

          })
        }

      })
    }
   










})