$(function(){



  // // 开启进度条(这是假的，我们要在请求的时候，同步，结束的时候关闭进度条)
  // NProgress.start();

  // setTimeout(function(){

  //   // 结束进度条
  //   NProgress.done();
  // },1000);


  // ajax全局事件
  //需求：在第一个ajax发送的时候开启进度条， 等待所有的ajax都结束后关闭进度条
  // ajaxComplete()  在每个ajax完成（成功或失败都调用）时调用
    // ajaxError()  在每个ajax如果失败时调用
    // ajaxSuccess()  在每个ajax如果成功时调用
    // ajaxSend()  在每个ajax即将要发送时调用

    // ajaxStart()  当第一个ajax开始发送请求时就会调用（这个时候开启进度条）
    // ajaxStop()  当所有的ajax请求完成时调用（这个时候关闭进度条）
   
    $(document).ajaxStart(function(){
      // 开启进度条
      NProgress.start();
    })
    $(document).ajaxStop(function(){
      // 关闭进度条
      NProgress.done();
    })

})