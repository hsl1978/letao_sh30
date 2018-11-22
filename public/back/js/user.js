$(function(){


  
  var currentPage = 1;//当前页
  var pageSize = 5;//每页条数

  var currentid;//当前用户的id
  var isDelete;//修改的状态

// 1.一进入页面，发送ajax请求，获取用户列表数据，通过模板引擎渲染
  render();


  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryuser',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template("tmp",info);
        $('tbody').html(htmlStr);
  
  
  
        // 根据后台返回的数据，进行分页初始化
          // 分页管理
    $('#paginator').bootstrapPaginator({
      bootstrapMajorVersion:3,//指定了版本号
      currentPage:info.page,//当前页
      totalPages:Math.ceil(info.total / info.size),//总页数3页
      // size:"min",//设置控件大小
      onPageClicked:function(a,b,c,page){//点击事件，
        // console.log(page);
        // 根据page重新请求数据，重新渲染
        currentPage = page;


        // 根据当前页重新渲染

        render();
      }
    })
      }
    })
  }


// 点击启用禁用按钮，显示模态框(事件委托)


$('tbody').on('click','.btn',function(){

  // console.log('批量注册事件');

  $('#userModal').modal('show');
  // 获取用户id
  currentid = $(this).parent().data('id');
  // 获取需要修改的状态，根据按钮的类名来判断具体传什么

 isDelete =  $(this).hasClass('btn-danger')? 0 : 1;
})

// 点击确定按钮，完成用户的操作

$('#userBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        //id://用户的id
        id:currentid,
        // isDelete : //将用户改成什么状态，1启用，0禁用
        isDelete:isDelete,
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          // 关闭模态框
          $('#userModal').modal('hide');
          // 重新渲染页面
          render();
        }
      }

    })
})


})