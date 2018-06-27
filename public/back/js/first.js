$(function(){
  var currentPage = 1
  var pageSize = 2

  render()

  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        var tmpStr = template("tpl",info)
        $("tbody").html(tmpStr)

      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:Math.ceil(info.total / info.size),
        onPageClicked:function(a,b,c,page){
          currentPage = page
          render()
        }
      })
    }
  })
}

$(".Fbtn").click(function(){
  $("#FtModal").modal("show")
})

$("#form").bootstrapValidator({
  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    categoryName:{
      validators:{
        notEmpty:{
          message:"请输入一级分类"
        }
      }
    }
  }
})


  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        if(info.success){
          $("#FtModal").modal("hide")
          currentPage = 1
          render()

          $("#form").data("bootstrapValidator").resetForm(true)
        }
      }

    })
  })
})