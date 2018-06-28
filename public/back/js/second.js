$(function(){

  var currentPage = 1
  var pageSize = 5

  render()
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        var temStr = template("tpl",info)
        $("tbody").html(temStr)


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


  $(".Sbtn").click(function(){
    $("#SnModal").modal("show")
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      dataTye:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var droptplStr = template("dropdownTpl",info)
        $(".dropdown-menu").html(droptplStr)


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
  })
  //给dropdown-menu注册委托事件,让a可以被点击
  $(".dropdown-menu").on("click","a",function(){
   // 获取选中的文本,设置给上面按钮的内容
   var txt = $(this).text()
    $('#dropdownTxt').text(txt)
    //获取id设置name="categoryId"的input框
    var id = $(this).data("id")
    $('[name = categoryId]').val(id)
  //  选择一级分类后,需要将name="categoryId"的input框的校验状态设置成VALID
    $('#form').data("bootstrapValidtor").updateStatus("categoryId","VALID")
  })



  //使用js初始化文件上传

  $("fileupload").fileupload({
    dataType:"json",

    done:function(e,data){
        $('#imgBox img').attr("src",data.result.picAddr)

      $("[name = brandLogo]").val(data.result.picAddr)

      $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID")

    }

  })


  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{
        validator:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      categoryName:{
        validator:{
          notEmpty:{
            message:"请输入二级分类"
          }
        }
      },
      categoryName:{
        validator:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  })

  $('#form').on("success.form.bv",function(e){
    e.preventDefault()
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      dataType:"json",
      success:function(info){
        if(info.success){
          $('#SnModal').modal("hide")
          $('#form').data("bootstrapValidator").resetForm(true)
          currentPage = 1
          render()

          $('#dropdownTxt').text("请选择一级分类")
          $('#imgBox img').attr("src","images/none.png")
        }
      }
    })
  })


})