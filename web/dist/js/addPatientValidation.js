$.validator.addMethod("nonNumeric", function (value, element) {
    return this.optional(element) || isNaN(Number(value));
});

$.validator.addMethod("noSpace", function(value, element) { 
    return value.indexOf(" ") < 0 && value != ""; 
  });


$.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
}, "Username must contain only letters, numbers, or dashes.");

  
$.validator.messages.required = '';


$('#addPatient').validate({
    rules: {
        firstName: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        lastName: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        documentNumber: {
            required: true,
            maxlength: 50,
        },
        birthday: {
            required: true,
        },
        address: {
            required: true,
        },
        documentTypeId: {
            required: true,
        },
        genderId: {
            required: true,
        },
        houseTypeId: {
            required: true,
        },
        heatingTypeId: {
            required: true,
        },
        waterTypeId: {
            required: true,
        }
    },
    messages: {
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
            pattern:"Debe contener solo letras",
        },
        documentNumber: {
            required: "Ingrese el documento",
            maxlength: "Ingrese un documento valido",
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
            pattern:"Debe contener solo letras",
        },
        birthday: {
            required: "Ingrese la fecha",
            max: "Ingrese una fecha valida",
            min: "Ingrese una fecha valida",
        },
        address: {
            required: "Ingrese la dirección del domicilio",
        },
        phone: {
            minlength: "Ingrese un teléfono válido"
        },
        documentTypeId: {
            required: "Seleccione el tipo de documento",
        },
        genderId: {
            required: "Seleccione el género",
        },
        heatingTypeId: {
            required: "Seleccione el tipo de calefacción",
        },        
        houseTypeId: {
            required: "Seleccione el tipo de casa",
        },
        waterTypeId: {
            required: "Seleccione el tipo de Agua",
        },
    },
    highlight: function (element) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).removeClass('is-invalid');
    },
    submitHandler: function (form) {
        form.submit();
    },

});

  //evita submit on enter

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  

$("#goBack").click(function(){
    $('#addPatient').trigger('next.m.1'); 
});

$("#goNext").click(function(){
    if ($('#firstName').valid() & $('#lastName').valid() & $('#documentNumber').valid() & $('#documentTypeId').valid()& $('#birthday').valid() & $('#address').valid() & $('#phone').valid()& $('#genderId').valid()) {
        $('#addPatient').trigger('next.m.2');
    }
});

$("#cancelbtn").click(function(){
    $('#addPatient').modal('hide')
    $('#addPatient')[0].reset();  
    $('#addPatient').trigger('next.m.1');   
    $('#addPatient').validate().resetForm()
})



$(".deletebtn").click(function(){
    $("#deletedId").val($(this).data("id"))
    tr = $(this).closest('tr')
    name = $(tr).find("td").eq(2).text()
    surname = $(tr).find("td").eq(3).text()
    $(".modalText").text(name + ' ' + surname);
});
