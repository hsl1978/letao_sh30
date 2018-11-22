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
  

//  点击分类按钮显示模态框
$('#addBtn').click(function(){
  // 模态框展示
  $('#firstModal').modal("show");

})

// 表单校验
// $('#firstAddBtn').click(function(){
  $('#form').bootstrapValidator({
    //  校验图标显示
     feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    // 配置校验字段
    fields:{
      categoryName:{
        // 配置校验规则
        validators:{
          //配置非空校验
          notEmpty:{
            message:"请输入一级分类名称",
          }
        }
      }
    }
  });
  

// 注册表单校验成功事件，阻止默认的表单的提交，通过ajax提交

  $('#form').on("success.form.bv",function(e){

    // 阻止默认表单的提交
    e.preventDefault();
    // 发送ajax请求,添加成功后重新渲染页面
    $.ajax({
       type:'post',
       url:'/category/addTopCategory',
       data:$('#form').serialize(),
       dataTpe:'json',
       success:function(info){
        //  console.log(info);
        if(info.success){
          // 添加成功

          // 关闭模态框
          $('#firstModal').modal("hide");
          // 重新渲染页面
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 内容和状态都要重置
          $('#form').data("bootstrapValidator").resetForm(true);
        }
       }
     })
  })

// })


})