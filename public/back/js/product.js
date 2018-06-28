$(function(){
  var currentPage = 1
  var pageSize  = 2
  var picArr = []

  render()

  function  render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      dataType:"json",
      data:{
        page : currentPage,
        pageSize : pageSize
      },
      success:function(info){
        console.log(info)
        var temStr = template("tpl",info)
        $("tbody").html(temStr)

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage: info.page,
          size:"mini",
          tooltipTitles:function(type, page, current){
            switch (type){
              case "first":
                return "首页"
              case "prev":
                return "上一页"
              case "fnext":
                return "下一页"
              case "last":
                return "尾页"
              case "page":
                return "前往第" + page + "页"
            }
          },
          itemTexts:function( type, page, current){
            switch (type){
              case "first":
                return "首页"
              case "prev":
                return "上一页"
              case "next":
                return "下一页"
              case "last":
                return "尾页"
              case "page":
                return  page
            }
          },
          onPageClicked:function(a,b,c,page){
            currentPage = page
            render()
          }

        })
      }
    })
  }

  $('.Sbtn').click(function(){
    $("#SnModal").modal("show")
    $.ajax({
      type:"get",
      url: "/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
        page: 1,
        pageSize:100
      },
      success:function(info){
        console.log(info)
        var temStr = template("protpl",info)
        $('.dropdown-menu').html(temStr)
      }
    })
  })

  $('.dropdown-menu').on("click","a",function(){
    var txt = $(this).text()
    $('#dropdownTxt').text(txt)

    var id = $(this).data("id")
    $("[name = brandId]").val(id)
    $('#form').data("bootstrapValidator").updateStatus("brandId","VALID")
  })

$('#fileupload').fileupload({
  dataType:"json",
  done:function(e,data){

    var picurl = data.result.picAddr

    picArr.unshift(data.result)

    $("#imgBox").prepend('<img src=" '+ picurl +'" width="100" height="100">')

    if(picArr.length > 3){
      picArr.pop()
      $("#imgBox img:last-of-type").remove()
    }
    if(picArr.length === 3){
      $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID")

      console.log(picArr)
    }
  }
})

  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
          validators:{
            notEmpty:{
              message:"请输入二级分类"
            }
          }
        },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp: /^[1-9]\d*$/,
            message:"商品库存必须是非零开头的数字"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp: /^\d{2}-\d{2}$/,
            message:"商品尺码必须是 xx-xx 的格式, 例如 32-40"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传三张图片"
          }
        }
      },
    }
  })


    $('#form').on("success.form.bv",function(e){
      e.preventDefault()
      var dataStr = $('#form').serialize()
    console.log($('#form').serialize())
      dataStr += "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName
      dataStr += "&picAddr2=" + picArr[1].picAddr + "&picName2=" + picArr[1].picName
      dataStr += "&picAddr3=" + picArr[2].picAddr + "&picName3=" + picArr[2].picName

      console.log(dataStr)
      $.ajax({
        type:"post",
        url:"/product/addProduct",
        dataType:"json",
        data:dataStr,
        success:function(info){
          if(info.success){
            $('#SnModal').modal("hide")
            $('#form').data("bootstrapValidator").resetForm(true)
            currentPage = 1
            render()
            $('.dropdownTxt').text("请输入二级分类")
            $('#imgBox img').remove()
          }
        }
      })
    })

})