$(document).on('click','#ansButton',function(){

    var text = $('#ansText').val();
    //  alert("text");
    var url=window.location.href;
    $('#formfeedback').modal({backdrop: 'static', keyboard: false});
 $('#ansfeedback').modal('show');
   $("#statusofsubmit").html("Wait...");
$.post(url,{text:text},function(){},"json")
.done(function(data){

      if(data.status=='Success'){

        $('#ansfeedback').modal('show');
     $("#statusofsubmit").html(data.status);
     location.reload();

      }
})
.fail(function(data){
  $("#modal-footer").show();
     $("#statusofsubmit").html("There was some error!! Try Again");
});



});
