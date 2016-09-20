$(document).ready(function(){


/////////////////////////////////////////////////
/////////////is login/ /////////////////////////
///////////////////////////////////////////////
if(true){
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/is_login/",
        dataType:"json",

        success: function (data) {
                if(data.reg){
                        $("#login").hide();
                        $("#profile").show();
                }
                else{
                    $("#login").show();
                        $("#profile").hide();
                }
                
                            },
        error:function(){
            console.log("error");
        }
    });

}

/////////////////////////////////////////////////
/////////////logout/// /////////////////////////
///////////////////////////////////////////////
$("#logout").click(function(){

    do_ajax();
    $.ajax({
        type: "GET",
        url: "/logout/",
        dataType:"json",

        success: function (data) {
               if(data.reg)
                window.location="/home/";
                            },
        error:function(){
            console.log("error");
        }
    });
});

/////////////////////////////////////////////////
/////////////change password////////////////////
///////////////////////////////////////////////
$("#change_pw").click(function(){

    do_ajax();
    $.ajax({
        type: "POST",
        url: "/change_pw/",
        dataType:"json",
        data:{
            pw1:$("#change_pw1").val(),
            pw2:$("#change_pw2").val(),
        },
        success: function (data) {
          
                            },
        error:function(){
            console.log("error");
        }
    });
});
$('#change_pw_form')
  .form({
    password1: {
        identifier: 'password1',
        rules: [
          {
          type   : 'length[6]',
          prompt : 'رمز عبور شما باید حداقل شش رقم باشد'
        }
        ]
      },
      password2: {
        identifier: 'password2',
        rules: [
          {
          type   : 'length[6]',
          prompt : 'رمز عبور شما باید حداقل شش رقم باشد'
        },
        {
          type   : 'match[password1]',
          prompt : 'رمز ها مطابقت ندارند'
        }
        ]
      }
  });




/////////////////////////////////////////////////
/////////////search exam////////////////////////
///////////////////////////////////////////////
$("#search_exam").click(function(){
    $("#exam_dimmer").addClass("active");
    $(".exam").remove();
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/get_exams/",
        dataType:"json",
        data:{
            year:$("#year_select").val(),
            lesson:$("#lesson_select").val(),
            type:$("#type_select").val()
        },
        success: function (data) {
    $("#exam_dimmer").removeClass("active");
                         var d = $.parseJSON(data.fields);
            $.each(d, function(key,val){
                            $("#get_exam_div").append("<div class='ui raised segment exam' id=exam"+val.pk+"></div>");
                            $("#exam"+val.pk).append("<label>"+val.fields.title+"</label>");
                            $("#exam"+val.pk).append("<button class='ui tiny green button download' id="+val.fields.file+" > دانلود<i class='arrow circle down icon'></i></button>");

                });
                
                            },
        error:function(){
    $("#exam_dimmer").removeClass("active");

            console.log("error");
        }
    });


});
  
$('.tabular.menu .item').tab();

  $("#karname_context").children().first().addClass("active");
$(".karname_own").first().addClass("active");

$('#karname_context .item').tab(
    {
    // special keyword works same as above
    context: 'parent'
  });

if(window.location.href.indexOf("time_table")>-1){
    $.ajax({
        type: "GET",
        url: "/get_timetable/",
        dataType:"json",
        success: function (data) {
            var d = $.parseJSON(data.fields);
            $.each(d, function(key,val){
                var str="";
                var name="";
                var teacher="";
                $.each(val.fields, function(fieldname, field) {
                    if(fieldname=="day"){
                        str+=field;
                        str+="_";
                    }
                    else if(fieldname=="zang"){
                        str+=field;
                        str+="_";
                    }
                   else if(fieldname=="paye"){
                        str+=field;
                    }
                    else if(fieldname=="title"){
                       name=field;
                    }
                    else if(fieldname=="teacher"){
                        teacher=field;
                    }
                       
                     
                });
                $("#"+str).html("");
                $("#"+str).append("<h5>"+name+"</h5>");
                $("#"+str).append("<h5>"+teacher+"</h5>");

                });
        },
        error:function(){
            console.log("error");
        }
    });
}

$(document).on('click','.download',function(){
    var id=$(this).attr("id");
  window.location="/static/media/"+id;
});
/////////////////////////////////////////////////
/////////////get pages//////////////////////////
///////////////////////////////////////////////

do_ajax();
    $.ajax({
        type: "POST",
        url: "/get_pages/",
        dataType:"json",
        success: function (data) {
            if(parseInt(data.result)<=3){
                for (var i=1;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    $("#page"+i).attr("href",'/all/page/'+i);
                }
                $("#page"+parseInt($(".active_page").html())).addClass("active");
            }
            else{
                    for (var i=parseInt($(".active_page").html())-1;i<=parseInt($(".active_page").html())+1;i++){
                        if(i!=0)
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    $("#page"+i).attr("href",'/all/page/'+i);

                                            }
                    $(".pagination_menu").append("<div class= 'disabled item' ></div>");
                    if(parseInt($(".active_page").html())+1<parseInt(data.result)-1){

                    for (var i=parseInt(data.result)-1;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    $("#page"+i).attr("href",'/all/page/'+i);
                }   }
                else{
                    for (var i=parseInt($(".active_page").html())+2;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    $("#page"+i).attr("href",'/all/page/'+i);
                }
                }

            }
        },
        error:function(){
            console.log("error");
        }
    });


/////////////////////////////////////////////////
/////////////like post /////////////////////////
///////////////////////////////////////////////

$(".like_item").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(4,id.length);
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/like_post/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#like_lable"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});






/////////////////////////////////////////////////
/////////////dislike post /////////////////////////
///////////////////////////////////////////////

$(".dislike_item").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(7,id.length);
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/dislike_post/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#dislike_lable"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});







/////////////////////////////////////////////////
/////////////like comment /////////////////////////
///////////////////////////////////////////////

$(".like_item_cm").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(7,id.length);
    console.log(id);
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/like_cm/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#like_lable_cm"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});





/////////////////////////////////////////////////
/////////////dislike comment/////////////////////
///////////////////////////////////////////////


$(".dislike_item_cm").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(10,id.length);
    console.log(id);

    do_ajax();
    $.ajax({
        type: "GET",
        url: "/dislike_cm/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#dislike_lable_cm"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});



/////////////////////////////////////////////////
/////////////post mouseover/////////////////////
///////////////////////////////////////////////

$(".post").on('mouseenter',function(){
    $(this).css("top",-3);
});
$(".post").on('mouseleave',function(){
    $(this).css("top",+3);
});

$('.ui.dropdown').dropdown();


/////////////////////////////////////////////////
/////////////about us///////////////////////////
///////////////////////////////////////////////
$("#about_us").click(function(){
    window.location.href="/about_us/";

});


/////////////////////////////////////////////////
/////////////profile////////////////////////////
///////////////////////////////////////////////
$("#profile").click(function(){
    window.location.href="/profile/";

});

/////////////////////////////////////////////////
/////////////exams//////////////////////////////
///////////////////////////////////////////////

$("#exams").click(function(){
    window.location.href="/exams/";
});



/////////////////////////////////////////////////
/////////////time table/////////////////////////
///////////////////////////////////////////////

$("#timetable").click(function(){
    window.location.href="/time_table/";

});

/////////////////////////////////////////////////
/////////////teachers///////////////////////////
///////////////////////////////////////////////

$("#teachers").click(function(){
    window.location.href="/teachers/";

});

/////////////////////////////////////////////////
/////////////stars//////////////////////////////
///////////////////////////////////////////////

$("#stars").click(function(){
    window.location.href="/stars/";

});

/////////////////////////////////////////////////
/////////////contatc us/////////////////////////
///////////////////////////////////////////////

$("#contact_us").click(function(){
    window.location.href="/contact_us/";

});


$("#home").click(function(){
    window.location.href="/home/";
});




/////////////////////////////////////////////////
/////////////next post /////////////////////////
///////////////////////////////////////////////

$(".next_btn").click(function(){
    var id=$(this).attr("id").substr(2,$(this).attr("id").length);
    var str="/single/"+id;
    window.location.href=str;
});




/////////////////////////////////////////////////
/////////////latest posts/////////////////////////
///////////////////////////////////////////////

$(".latest_p").click(function(){
    var id=$(this).attr("id").substr(3,$(this).attr("id").length);
    var str="/single/"+id;
    window.location.href=str;
});





/////////////////////////////////////////////////
/////////////send comment///////////////////////
///////////////////////////////////////////////

$(".submit_comment").click(function(){
    var id=$(this).attr("id").substr(14,$(this).attr("id").length);
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/send_comment/",
        dataType:"json",
        data :{
            name:$("#cm_name").val(),
            email:$("#cm_email").val(),
            text:$("#cm_cm").val(),
            id:id
                    },
        success: function (data) {
            window.location.reload();
        },
        error:function(){
            console.log("error");
        }
    });
});






/////////////////////////////////////////////////
/////////////login//////////////////////////////
///////////////////////////////////////////////

$("#login").click(function(){
    $('.ui.modal.login').modal({blurring: true}).modal('show');
});
$('.ui.accordion').accordion();
$('.ui.checkbox').checkbox();
$(".menu .item").tab();


$("#confirm_reg").click(function(){
    
   window.location='/home/';
    $('#success_reg')
    .modal('hide')
    ;


});

$("#confirm_err").on('click',function(){
 
    $('#error_reg')
    .modal('hide')
    ;

    $("#username_field").addClass("error");
});


$("#login_submit").click(function(){
     $("#reg_dimmer2").addClass("active");
    do_ajax();
    $.ajax({
        type: "GET",
        url: "/login_user/",
        dataType:"json",
        data :{
            username:$("#login_username").val(),
            password :$("#login_password").val()
                    },
        success: function (data) {
            $("#reg_dimmer2").removeClass("active");
            if(data.reg=="true"){
                    $('#success_reg')
                    .modal('show')
                    ;
                    $("#login").hide();

            }
            else{
                  $('#error_reg')
                    .modal('show')
                    ;
            }
        },
        error:function(){
            console.log("error");
        }
    });
});



/////////////////////////////////////////////////
/////////////search/////////////////////////////
///////////////////////////////////////////////

// $("#search").on('click',function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     var search_text=$("#search_text").val();
//     do_ajax();
//     $.ajax({
//         type: "POST",
//         url: "/search_post/",
//         dataType:"json",
//         data :{
//             name:search_text
//                     },
//         success: function (data) {
//         },
//         error:function(){
//             console.log("error");
//         }
//     });
// });



});





/////////////////////////////////////////////////
////////////CSRF token//////////////////////////
///////////////////////////////////////////////
    function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }




/////////////////////////////////////////////////
////////////ajax////////////////////////////////
///////////////////////////////////////////////
function do_ajax(){

var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: true, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}