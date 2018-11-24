// 1从后体获取数据，进行渲染
$(function() {
  var currentPage = 1; //当前页

  var pageSize = 2; //一页的条数

  var picArr = []; //专门用于存储需要上传的图片

  // 一进入页面渲染一次
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        //利用模板引擎渲染
        var htmlStr = template("productTpl", info);

        $(".lt_content tbody").html(htmlStr);

        // 做分页操作
        $("#paginator").bootstrapPaginator({
          // 设置版本号
          bootstrapMajorVersion: 3,
          // 设置当前页
          currentPage: info.page,
          // 设置总页数
          totalPages: Math.ceil(info.total / info.size),

          // 点击事件
          onPageClicked: function(a, b, c, page) {
            // 设置当前页
            currentPage = page;
            //  渲染
            render();
          }
        });
      }
    });
  }

  //  2.点击添加商品按钮，显示模态框
  $("#addProductBtn").click(function() {
    $("#productModal").modal("show");

    // 二级分类列表渲染

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);

        var htmlStr = template("drowTextTpl", info);

        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  // 3.给a注册点击事件，渲染文本到下拉框
  $(".dropdown-menu").on("click", "a", function() {
    // 获取当前被点击的a的文本，赋值给ul
    var txt = $(this).text();
    // 获取id
    var id = $(this).data("id");
    // console.log(id);

    // console.log(txt);
    $(".dropdownText").text(txt);

    // id赋值给隐藏域
    $('[name="brandId"]').val(id);

    // 校验成功，校验状态重置
    $("#form")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
  });

  // 4.多图片上传

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      // console.log(data);
      var picObj = data.result; //图片的信息(包含图片的名称和地址)

      // 往数组的最前面追加(来一张图片的地址和名字，加到数组里)
      picArr.unshift(picObj);
      // console.log(picArr);

      // 获取图片上传的地址
      var picUrl = picObj.picAddr;

      // 赋值给img的src
      $("#imgBox").prepend('<img  width="100" src="' + picUrl + '" alt="" />');

      if (picArr.length > 3) {
        // 删除数组中的最后一项
        picArr.pop();

        // 删除最后一张图片
        $("#imgBox img:last-of-type").remove();
      }
      if (picArr.length === 3) {
        $("#form")
          .data("bootstrapValidator")
          .updateStatus("picStatus", "VALID");
      }
    }
  });

  // 5.配置表单校验
  $("#form").bootstrapValidator({
    // 配置排除项，需要对隐藏域进行校验
    excluded: [],
    // 配置小图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", // 校验成功
      invalid: "glyphicon glyphicon-remove", // 校验失败
      validating: "glyphicon glyphicon-refresh" // 校验中
    },
    // 配置校验规则
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 请输入商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      // 请输入商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 请输入商品库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须是非0开头的数字"
          }
        }
      },
      // 请输入商品尺码
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "必须是xx-xx的格式，xx是两位数字"
          }
        }
      },
      // 请输入商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 请输入商品现价
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  //6. 注册成功事件，阻止默认事件的提交，通过ajax提交
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();
    var paramsStr = $("#form").serialize(); //所有表单内容数据

    // 需要拼接上图片的地址和名称
    paramsStr +=
      "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr +=
      "&picName2=" + picArr[0].picName + "&picAddr2=" + picArr[0].picAddr;
    paramsStr +=
      "&picName3=" + picArr[0].picName + "&picAddr3=" + picArr[0].picAddr;

    // console.log(paramsStr);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramsStr,
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          // 添加成功
          // 关闭模态框
          // console.log("aa");

          $('#productModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置所有的表单内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);
          $('.dropdownText').text("请选择二级分类");

          // 删除图片的同时，清空数组
          $('#imgBox img').remove();
          picArr=[];
        }

      }
    })
  })
   
});
