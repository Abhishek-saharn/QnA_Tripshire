$(document).on('click','#askbutton',function(){
  // alert("works");
    $('#askmodal').modal('show');
});
$(document).on('click','#askbutton2', function(){

        var text = $('#askText').val();
      //  alert(text);

    $.post('/saveQuestion',{text:text},function(){},"json")
    .done(function(data){
          if(data.status=="Success")
          {alert("Question added");
                 window.location.href = "/home";

            }
    })
    .fail(function(data){

    });



});
function addURL(element)
{
    var id = $(element).data('id');
    $(element).attr('href', function() {
        return this.href + id;
    });
}
