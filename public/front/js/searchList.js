


$(function(){

// 1.获取地址栏传递的搜索关键字
  var key = getSeach("key");
  console.log(key);

  // 2.赋值给我们input搜索框

  $('.search_input').val(key);

  render();
  // 3.根据搜索关键字发送ajax请求，获取数据并且渲染
  function render(){


    // 在发送请求，重新渲染前，由于请求时需要时间的,
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};
    paramsObj.proName = $('.search_input').val();
    paramsObj.page =  1;
    paramsObj.pageSize =  100;
 
    var $current=$('.lt_sort a.current')
    
     if($current.length === 1){
      //  有高亮，需要排序
      console.log("需要排序");
      // 怎么获取参数
     var sortName = $current.data("type"); //price / num

    //  通过判断箭头的方向，
    var sortValue = $current.find("i").hasClass('fa-angle-down') ? 2:1;
     
    paramsObj[sortName] = sortValue;
  }

  console.log(paramsObj);
  

 setTimeout(function(){
  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data: paramsObj,
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr = template("searchListTpl",info);
      $('.lt_product').html(htmlStr);
    }
  })
 },1000)


  }


  // 4.点击搜索按钮，
  $('.search_btn').click(function(){
    render();
  });


  // 5.点击a排序的按钮，实现高亮效果
    //  (1)如果当前的a没有current类，添加current类，其它的移除
    //  (2)如果当前的a已经有了current类，切换图标的方向，箭头的上下方向(改变类)


  $('.lt_sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      // 有current类
      // 切换箭头的方向
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else{

      // 添加，排它
      $(this).addClass('current').siblings().removeClass('current');
    }

    //调用render直接渲染
    render(); 
  })

  
})