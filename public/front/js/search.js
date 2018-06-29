/**
 * Created by TiAmo Tau on 2018/6/29.
 */
$(function(){
  render()
    //获取历史记录
    function getHistory(){
      //获取本地存储中存储的数据
      var history = localStorage.getItem("list") || '[]'
      //将数据转换成数组
      var arr = JSON.parse(history)
      //将数组通过模板引擎渲染历史记录
      return arr
    }
  //  读取历史记录,进行页面渲染
  function render(){
    //获取历史记录
    var arr = getHistory()
    //对模板引擎进行渲染
    var htmlStr = template("tpl",{arr:arr})
    $('.sear_cont').html(htmlStr)
  }
  //给清空按钮添加点击事件,(事件委托)
  $('.sear_cont').on("click",".icon_empty",function(){
    //使用mui框架
    mui.confirm("是否清空所有历史记录?","温馨提示",["取消","确认"],function(e){
      if(e.index === 1){
        //将list从本地存储中删除
        localStorage.removeItem("list")
        //重新渲染
        render()
      }
    })
  })
  //点击删除按钮,添加点击事件(事件委托)
  $('.sear_bot').on("click",".icon_delete",function(){
    var that = this
    //mui框架
    mui.confirm("是否确认删除该条数据","温馨提示",["取消","确认"],function(e){
      if( e.index ===1){
        //获取该条数据的下标
        var index = $(that).data("index")
        //获取下表所在的数组
        var arr = getHistory()
        //通过下标删除数组对应项
        arr.splice(index,1)
        //将数据存储到本地历史记录中
        localStorage.setItem("list",JSON.stringify(arr))
        //重新渲染
        render()
      }
    })
  })

$(".sear_btn").click(function(){
  //获取关键字
  var key = $(".sear_input").val()
  if(key === ''){
    mui.toast("请输入搜索关键字")
    return
  }
//  获取数组
  var arr = getHistory()
  //数组中去处重复的内容
  var index = arr.indexOf(key)
  if( index > -1){
    arr.splice(index , 1)
  }
  //数组长度申明
  if( arr.length >= 10 ){
    arr.pop()
  }
//  添加到数组最前面
  arr.unshift(key)
//  存储到本地历史记录中
  localStorage.setItem("list",JSON.stringify(arr))
//  重新渲染
  render()

//  清空搜索栏
  $(".sear_input").val("")

//  进行页面跳转
  location.href = "searchList.html?key=" + key
})
})