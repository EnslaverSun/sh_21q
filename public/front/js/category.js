$(function(){
 $.ajax({
   type:"get",
   url:"/category/queryTopCategory",
   dataType:"json",
   success:function(info){
     console.log(info);
     var temStr = template("tmp",info)
     $('.mui-scroll-wrapper .cate_l').html(temStr)
      renderId(info.rows[0].id)
   }
 })

   $('.cate_l').on("click","a",function(){
     var id = $(this).data("id")
     renderId(id)

    $(this).addClass("current").parent().siblings().find("a").removeClass("current")
   })


 function  renderId(id){
   $.ajax({
     type:"get",
     url:"/category/querySecondCategory",
     dataType:"json",
     data:{
       id : id
     },
     success:function(info) {
       console.log(info);
       var temStr = template("tpl",info)
       $('.mui-scroll-wrapper .cate_r').html(temStr)
     }
   })
 }


})