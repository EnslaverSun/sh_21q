
$(function(){
  $('.category').click(function(){
    $('.child').stop().slideToggle()
  })
})


  $('.ups .ins').click(function(){
    $('.aside').toggleClass("hiddens");
    $('.main').toggleClass("hiddens")
    $('.ups').toggleClass("hiddens")
})


$('.ups .outs').click(function(){
  $('#logoutModal').modal("show")
})

$('#logoutBtn').click(function(){
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    dataType:"json",
    success:function(info){
      if(info.success){
        location.href = "login.html"
      }
    }
  })
})