$("#pending").sortable();
$("#pending").disableSelection();

$("#completed").sortable();
$("#completed").disableSelection();

function getDay(){
    var today = new Date();
    var dd = today.getDate();
	if(dd<10) {
    dd='0'+dd
} 
    $('.day-here').html(dd);
}

function getDayName(){
    var today = new Date();
    var dd = today.getDay();
	dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = dayNames[dd],
    $('.day-name-here').html(dayOfWeek);
}

function getMonth(){
    var today = new Date();
	var mm = today.getMonth()+1; /*January is 0*/
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    mm = months[mm],
    $('.month-here').html(mm);
}

function getYear(){
    var today = new Date();
    var yyyy = today.getFullYear();
    $('.year-here').html(yyyy);
}

countTodos();
getDay();
getMonth();
getYear();
getDayName();

// all done btn
$("#checkAll").click(function(){
    AllDone();
});

$("#insertButton").click(function(){
    if($('.insert-task').val() != ''){
           var todo = $('.insert-task').val();
            createTodo(todo); 
            countTodos();
           }else{
               // some validation
           }
});

//create todo
$('.insert-task').on('keypress',function (e) {
      e.preventDefault
      if (e.which == 13) {
           if($(this).val() != ''){
           var todo = $(this).val();
            createTodo(todo); 
            countTodos();
           }else{
               // some validation
           }
      }
});
// mark task as done
$('.todo-list').on('change','#pending li input[type="checkbox"]',function(){
    if($(this).prop('checked')){
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
        countTodos();
    }
});

//delete done task from "already done"
$('.todo-list').on('click','.remove-item',function(){
    removeItem(this);
});

// count tasks
function countTodos(){
    var count = $("#pending li").length;
    $('.count-todos').html(count);
}

//create task
function createTodo(text){
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
    $('#pending').append(markup);
    $('.insert-task').val('');
}

//mark task as done
function done(doneItem){
    var done = doneItem;
    var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#completed').append(markup);
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#pending li').each( function() {
         myArray.push($(this).text());   
    });
    
    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#completed').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }
    
    // myArray
    $('#pending li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();
}


