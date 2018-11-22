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
          // console.log(info);
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
   
// 获取添加分类按钮，注册点击事件，显示模态框

$('#addBtn').click(function(){
  // 显示模态框
  $('#secondModal').modal('show');

  // 发送ajax请求,请求所有的一级分类列表，进行渲染
  // 通过传参 page=1 pageSize=100模拟请求所有一级分类列表的接口

  $.ajax({
    type:'get',
    url:'/category/querySecondCategoryPaging',
    data:{
      page:1,
      pageSize:100,
    },
    dataType:'json',
    success:function(info){
      // console.log(info);

      var htmlStr = template("pullTpl",info);
      $(".dropdown-menu").html(htmlStr);
      
    }
  })
});

// 给下拉列表添加选中功能，就是选中下面的分类名称，显示到上面

$('.dropdown-menu').on('click',"a",function(){
  // 获取a的文本
  var txt = $(this).text();
  // 设置给按钮里面的span
  $('.dropdownText').text(txt);

  // 获取a 中自定义属性存储的id
  var id =$(this).data("id");

  // 赋值给隐藏域，用于提交
  $('[name="categoryId"]').val(id);

  // 手动将隐藏域的状态改成成功
  // updataStatus
  // 参数一。字段名称
  // 参数二。校验状态 VALID校验成功
  // 参数三。配置校验规则，用来配置错误提示信息
  $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID");

   
});



// 调用fileUpload方法，发送文件上传请求
 $("#fileupload").fileupload({
    dataType:"json",//返回回来的数据类型
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data);
      var result = data.result;//后台返回的结果
      // 获取图片的地址赋值给img 的src

      var picUrl = result.picAddr;
      $('#imgBox img').attr("src",picUrl);

      // 将图片地址赋值给隐藏域
      $('[name="brandLogo"]').val(picUrl);

      // 重置隐藏域的校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");

    }
 });


// 添加表单校验
$('#form').bootstrapValidator({
  // 配置排除项，需要对隐藏域进行较验
  excluded:[],
  // 配置小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  // 配置校验字段
  fields:{
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    brandName:{
      validators:{
        notEmpty:{
          message:"请输入二级分类"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请上传图片"
        }
      }
    },
  }
})


// 表单数据获取，发送ajax请求，渲染页面
$('#form').on('success.form.bv',function(e){
  // 阻止默认提交
  e.preventDefault();
  $.ajax({
    type:'post',
    url:'/category/addSecondCategory',
    data: $('#form').serialize(),
    dataType:'json',
    success:function(info){
      // console.log(info);
      // 关闭模态框
      $('#secondModal').modal('hide');
      // 渲染页面
      currentPage = 1;
      render();
      // 重置表单
      $('#form').data("bootstrapValidator").resetForm(true);

      // 下拉菜单文本重置
      $('.dropdownText').text("请选择一级分类");

      // 找到图片重置
      $('#imgBox img').attr("src","images/none.png");
      
    }
  })
})



})