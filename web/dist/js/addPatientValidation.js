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
        dni: {
            required: true,
            maxlength: 50,
        },
        birthday: {
            required: true,
        },
        address: {
            required: true,
        },
    },
    messages: {
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        dni: {
            required: "Ingrese el documento",
            maxlength: "Ingrese un documento valido",
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
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
        }
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



$("#goBack").click(function(){
    $('#addPatient').trigger('next.m.1'); 
});

$("#goNext").click(function(){
    if ($('#firstName').valid() & $('#lastName').valid() & $('#dni').valid()& $('#birthday').valid() & $('#address').valid() & $('#phone').valid()) {
        $('#addPatient').trigger('next.m.2');
    }
});

$("#cancelbtn").click(function(){
    $('#addPatient').modal('hide')
    $('#addPatient')[0].reset();
    $('#addPatient').validate().resetForm();    
    $('#addPatient').trigger('next.m.1'); 
    return true
})