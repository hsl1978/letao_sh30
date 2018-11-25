// 

/**
 * 功能分析
 *  功能1：本地历史记录渲染
 *  功能2: 清空所有历史记录
 *  功能3：删除单条历史记录
 *  功能4：添加搜索历史
 */


 /**
  * 由于整个页面都在进行本地历史的操作，所以约定键名:search_list
     以下代码用于在控制台执行，添加假的代码

  var arr = ['耐克','阿迪','新百伦','阿迪王','特步','花花公子'];
  var jsonStr = JSON.stringify(arr);
  localStorage.setItem("search_list",jsonStr);
  */

  $(function(){

    /**
     * 功能1：本地历史记录功能展示
     * 思路：
     *    (1)从本地读取搜索历史
     *    (2)读出来的是jsonStr，转换成数组
     *    (3)结合模板引擎渲染
     */

     
       render();
      
      //  获取本地历史记录数组
      function getHistory(){
        // 对没有数据时进行默认值处理
        var jsonStr = localStorage.getItem("search_list") || '[]';
        // 将jsonStr转成数组
        var arr = JSON.parse(jsonStr);

        return arr;
      }

      // 读取本地历史数组，并根据本地历史数组渲染
      function render(){
        var arr = getHistory();

          // 结合模板引擎进行渲染
        var htmlStr = template("searchTpl",{list:arr});
         $('.lt_history').html(htmlStr);
      }


      /**
       * 功能2：清空所有历史记录
       *   （1）给清空记录添加点击事件，通过事件委托注册
       *   （2）利用removeItem删除所有的历史记录
       *   （3）重新渲染页面
       */  


       $(".lt_history").on("click",".btn-empty",function(){
          // 参数1: 确认框文本内容
          // 参数2: 大标题
          // 参数3: 按钮文本的数组
          // 参数4: 关闭模态框的回调函数
          mui.confirm("你确定要清空历史记录吗？","温馨提示",["取消","确认"],function(e){
              // console.log("确认被关闭了");
              console.log(e);
              
              if(e.index === 1){
               // 确认按钮被点击

                localStorage.removeItem("search_list");
                // 重新渲染页面
                render();
              
              }
 
          })
       })


       /**
        * 功能3：删除单条历史记录
        *    (1) 给所有的删除按钮添加点击事件(事件委托)
        *    (2) 获取存储的下标，将数组的对应项删除
        *    (3) 将数组转成JSON字符串存储到本地存储中
        *    (4) 重新渲染
        */

        $(".lt_history").on("click",".btn-delete",function(){
              var index = $(this).data("index");

              // 获取数组
              var arr = getHistory();

              // 根据下标删除数组的对应项 splice
              // 会改变原数组（splice）
              // arr.splice(从哪开始，删几个，替换的项1，替换的项2，。。。)

              arr.splice(index,1);


              // 转成json存储到本地

              localStorage.setItem("search_list",JSON.stringify(arr));
                // 重新渲染
              render();
        })



        /**
         * 功能4：添加历史记录功能
         * 思路：
         *    (1) 给搜索按钮添点击事件
         *    (2) 获取搜索关键字，添加到数组的最前面（unshift）
         *    (3) 将数组转成jsonStr，存储到本地存储中
         *    (4) 重新渲染
         */
         
          $('.search_btn').click(function(){
            // 获取搜索关键字，添加到数组的最前面
            var key = $('.search_input').val().trim();
              
            // 非空处理
            if(key === ""){
              mui.toast("请输入关键字");
              return;
            }
            // 添加到数组的最前面
            var arr = getHistory();

            // 判断有没有重复的项，有的话要删除
            // indexOf(key)返回的是关键字在数组中首次出现的位置  如果要检索的字符串值没有出现，则该方法返回 -1

            var index = arr.indexOf(key);
              // 如果已经有了重复项，需要将重复项删除
            if(index != -1){
                //1. 有重复项。将重复项删除 splice(从哪开始，删几个，替换项....)
                arr.splice(index,1);
              }
              // 2.如果长度超过10个，需要删除最后一个
              if(arr.length >=10){
                // 数组的pop()方法,删除最后一个
                arr.pop();
              }

              // 往数组的最前面追加
            arr.unshift(key);

            // 转成jsonStr的字符串
            var jsonStr = JSON.stringify(arr);

            // 添加到本地
            localStorage.setItem("search_list",jsonStr);

            // 重新渲染
            render();

            // 清空搜索框的内容
            $('.search_input').val("");

            // 跳转到商品列表页
            location.href = "search_list.html?key="+key;
          })


  })