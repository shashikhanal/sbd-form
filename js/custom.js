
// $( document ).ready(function() {
//
//   $('select').material_select();
// 	$('input.autocomplete').autocomplete({
//     data: {
//       "Saleways Hattigauda":null,
//       "Saleways Sitapaila":null,
//       "Saleways Maharajgunj":null,
//       "Saleways Lagankhel":null,
//       "Saleways Pulchwok":null,
//       "Saleways Satdobato":null,
//       "BBSM Naxal":null,
//       "BBSM Anamnagar":null,
//       "BBSM Kalanki":null,
//       "BBSM Balaju":null,
//       "BBSM Tripureshwor":null,
//       "BBSM Maharajgunj":null,
//       "BBSM Chucchepati":null,
//       "BBSM Koteshwor":null,
//       "BBSM Patan":null,
//       "Bigmart Narayanthan":null,
//       "Bigmart Jamal":null,
//       "Bigmart Sanepa":null,
//       "Bigmart Golfutar":null,
//       "Bigmart Bhakhundole":null,
//       "Bigmart Naxal":null,
//       "Bigmart Sundarbasti":null,
//       "Bigmart Sukedhara":null,
//       "Bigmart Anamnagar":null,
//       "Bigmart Pepsicola":null,
//       "Bigmart Kadaghari":null,
//       "Bigmart Thulo Bharyang":null,
//       "Bigmart Dhunchepakha":null,
//       "Bigmart Mandikatar":null,
//       "Bigmart Citycenter":null,
//       "Bigmart Jhamsikhel":null,
//       "Bigmart Tokha":null,
//       "Bigmart Samakhusi":null,
//       "Bigmart Khumaltar":null,
//       "Bigmart Ekantakuna":null,
//       "Bigmart Gongabu":null,
//       "Bigmart Nayabazar":null,
//       "Bigmart Lazimpat":null,
//       "Bigmart Battisputali":null,
//       "Bigmart Baneshwor":null,
//       "Bigmart Shantinagar":null,
//     }
//   });
// });

$( document ).ready(function() {
    var chkdArray =[];
    $('select').material_select();
    $('.skuCheck').on('click',function() {
        var checked=false;
        var qtyInp=$(this).parent().siblings('.qtyInpParnt').children('.qtyInp');
        var element_parent=qtyInp.parents().eq(6).siblings('.collapsible-header').children('h6').children('span');
        var element =qtyInp.parents().eq(6);
        console.log("element id..",element.attr('id'));
        chkdArray =[];
        if( $(this).is(':checked')) {
            checked=true;
            qtyInp.removeAttr('disabled');
                var input=qtyInp;
                var is_name=input.val();
                if(is_name) {
                    input.removeClass("invalid").addClass("valid");
                } else {
                    input.removeClass("valid").addClass("invalid");
                }

        } else {
            if(hasValue(qtyInp)){
                emptyValue(qtyInp);
            }
            qtyInp.attr('disabled','disabled');
            if(qtyInp.hasClass('valid'))
                qtyInp.removeClass('valid');
            else if (qtyInp.hasClass('invalid')){

                qtyInp.removeClass('invalid');
                qtyInp.siblings('span').removeClass('error_show');
                qtyInp.siblings('span').css('display','none');
                allChecked(element);
                if(chkdArray.length == 0) {
                    element_parent.css('display','none');
                 }

            }
        }

    });
    $('input').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");
        } else{
            input.removeClass("valid").addClass("invalid");
        }
    });
    //action after submit button click event
    $('#submitBtn').click (function(event){
        var form_data=$("#outletForm").serializeArray();
        var error_free=true;
        for (var input in form_data) {

            var element=$('input[name="'+form_data[input]['name']+'"]');
            // var valid=element.hasClass("valid");
            var valid =false;

           if(element.hasClass("valid") || element.is(":checkbox") || element.is('[disabled=disabled]')){
              valid =true;
           }

            var error_element=$("span", element.parent());
             var error_element_parent=element.parents().eq(6).siblings('.collapsible-header').children('h6').children('span');
            // var error_element_parent=element.parentsUntil($('div'),".collapsible-header");

            //debugger;
            if (!valid) {
                error_element.css('display','inline');
                error_element_parent.css('display','inline');
                error_element_parent.removeClass("error").addClass("error_show");
                error_element.removeClass("error").addClass("error_show");
                error_free=false;
            } else{
                error_element.css('display','none');
                error_element_parent.css('display','none');
                error_element.removeClass("error_show").addClass("error");
            }
        }
        if (!error_free){
            event.preventDefault();
        }
        else{
            // alert('No errors: Form will be submitted');
        }

    });

    function allChecked(element) {
        var count =0;
        console.log("inside all checked..",element);
         element.find($('input[type=checkbox]')).each(function(){
            if ($(this).is(":checked")) {
                console.log("id of $this",$(this).attr('id'));
                chkdArray.push($(this).attr('name'));
            }
        });
    }
    function hasValue(elem) {
        return $(elem).filter(function() { return $(this).val(); }).length > 0;
    }
    function emptyValue(elem) {
        return $(elem).filter(function() { return $(this).val('')});
    }
  //Autocomplete
    $(function() {
        $.ajax({
            type: "GET",
            url: "outlets.csv",
            success: function(data) {
            var lines=csvJSON(data);
            $('input.autocomplete').autocomplete({
              data: lines,
              limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
            });
           }
         });
        function csvJSON(csv) {
            var lines=csv.split("\n");
            var objectArray=[];
            var object={};
            for(var count = 0 ; count < lines.length -1 ; count ++){
            object[lines[count]]=null;
            }
            return object;
        }
    });
});
