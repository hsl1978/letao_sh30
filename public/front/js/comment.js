
// 利用mui实现区域滚动


mui('.mui-scroll-wrapper').scroll({
  // scrollY: true,
  indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


// 获得slider插件对象，进行轮播图配置
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 专门用于解析地址栏的方法

function getSeach( k ){
  // 获取地址栏中的信息
  var str = location.search;//"?key=%E5%8C%A1%E5%A8%81%E9%B9%8F&name=pp&age=18&desc=%E5%B8%85"
// 转码成中文
str = decodeURI(str); // "?key=匡威鹏&name=pp&age=18&desc=帅"
// 去掉第一个问号
// str.slice(start,end)
// 从start开始到end结束,包含start,不包含end,
str = str.slice(1); //  "key=匡威鹏&name=pp&age=18&desc=帅"

// 使用split 将字符串分割成数组
var arr = str.split("&");  //["key=匡威鹏", "name=pp", "age=18", "desc=帅"]

 var obj = {};

//  遍历数组，取出每个键和值
arr.forEach(function(v,i){  // v "age = 18"
  var key = v.split("=")[0];//键 age
  var value = v.split("=")[1];//键 18

  obj[key] = value;
})

return obj[k];
}