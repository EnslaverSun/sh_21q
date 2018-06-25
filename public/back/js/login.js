
//使用插件
$(function(){
  $('#form').bootstrapValidator({
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    },

  fields:{
    username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        stringLength:{
          message:"用户名长度必须在2~6个字符之间",
          min:2,
          max:6
        },
        callback:{
          message:"用户名不存在"
        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        stringLength:{
          message:"密码长度必须在6~12个字符之间",
          min:6,
          max:12
        },
        callback:{
          message:"密码错误"
        }
      }
    }
  }
  })

//表单校验成功,阻止默认提交,使用ajax提交
    $('#form').on("success.form.bv",function(e){
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        datatype:"json",
        data:$('#form').serialize(),
        success:function(info){
          if(info.success){
            location.href = "index.html"
          }
          //处理响应
          if(info.error === 1000){
            $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback")
          }
          if(info.error === 1001){
            $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
          }
        }
      })
    })

//重置表单
$("[type = 'reset']").on("click",function(){
  $("form").data("bootstrapValidator").resetForm()
})

//进度条功能
$(document).ajaxStart(function(){
  NProgress.start()
})
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done()
    },500)
  })
})