
// 利用mui实现区域滚动


mui('.mui-scroll-wrapper').scroll({
  // scrollY: true,
  indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

