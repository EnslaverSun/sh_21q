$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId
  var isDelete


  render()
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info)

        var temStr = template("tpl",info)

        $("tbody").html(temStr)


        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render()
          }
        })
      }
    })
  }


        $("tbody").on("click",".btn",function(){
          $('#userModal').modal("show")
          currentId = $(this).parent().data("id");
          isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        })

      $("#Btn").click(function(){
        $.ajax({
          type:"post",
          url:"/user/updateUser",
          dataType:"json",
          data:{
            id:currentId,
            isDelete:isDelete
          },
          success:function(info){
            $("#userModal").modal("hide")
            render()
          }
        })
      })
})