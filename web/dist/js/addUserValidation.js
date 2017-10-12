// custom validation methods

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


// validation definition

$('#addUser').validate({
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
        username: {
            alphanumeric: true,
            minlength: 6,
            required: true,
            noSpace: true,
            maxlength: 50,
        },
        email: {
            required: true,
            email: true,
            maxlength: 255,
        },
        pass: {
            required: true,
            minlength: 6,
            maxlength: 255,
        },
        confirmPass: {
            required: true,
            minlength: 6,
            equalTo: '#pass',
        },
    },
    messages: {
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        username: {
            required: "Ingrese el nombre de usuario",
            minlength: "Debe tener al menos 6 caracteres",
            noSpace: "No puede tener espacios en blanco",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
        },
        pass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        confirmPass: {
            required: "Re-ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres",
            equalTo: "La contraseña no coincide"
        },
        email: {
            email: "Ingrese un email valido",
            required: "Ingrese el email"
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

// Buttons Actions

$("#goBack").click(function(){
    $('#addUser').trigger('next.m.1'); 
});

$("#goNext").click(function(){
    if ($('#firstName').valid() & $('#lastName').valid() & $('#email').valid() & $('#username').valid() & $('#pass').valid() & $('#confirmPass').valid()) {
        $('#addUser').trigger('next.m.2');
    }
});

$("#cancelbtn").click(function(){
    $('#addUser').modal('hide')
    $('#addUser')[0].reset();
    $('#addUser').validate().resetForm();    
    return true
})

$(".deletebtn").click(function(){
    $("#deletedId").val($(this).data("id"))
    tr = $(this).closest('tr')
    name = $(tr).find("td").eq(1).text()
    console.log($(tr).find("td").eq(1).text())
    surname = $(tr).find("td").eq(2).text()
    $(".modalText").text(name + ' ' + surname);
});


