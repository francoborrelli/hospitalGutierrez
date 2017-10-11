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

$.validator.addMethod("checkboxGroup", function(value, element) { 
    result = $("input[type=checkbox]:checked").length > 0;
    if (result) {
        $("input[type=checkbox]").each(function() {
            $( this ).removeClass('is-invalid');
        })
    }
    else {
        $("input[type=checkbox]").each(function() {
            $( this ).addClass('is-invalid');
        })
    }
    return result;
}, "");
  
$.validator.messages.required = '';


// validation definition

$('#addUser').validate({
    rules: {
        _name: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        _surname: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        _username: {
            alphanumeric: true,
            minlength: 6,
            required: true,
            noSpace: true,
            maxlength: 50,
        },
        _email: {
            required: true,
            email: true,
            maxlength: 255,
        },
        _pass: {
            required: true,
            minlength: 6,
            maxlength: 255,
        },
        _confirmPass: {
            required: true,
            minlength: 6,
            equalTo: '#_pass',
        },
    },
    messages: {
        _name: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        _username: {
            required: "Ingrese el nombre de usuario",
            minlength: "Debe tener al menos 6 caracteres",
            noSpace: "No puede tener espacios en blanco",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        _surname: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
        },
        _pass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        _confirmPass: {
            required: "Re-ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres",
            equalTo: "La contraseña no coincide"
        },
        _email: {
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


$("input[type=checkbox]").each(function(){
    $(this).rules("add", "checkboxGroup");
});

// Buttons Actions

$("#goBack").click(function(){
    $('#addUser').trigger('next.m.1'); 
});

$("#goNext").click(function(){
    if ($('#_name').valid() & $('#_surname').valid() & $('#_email').valid() & $('#_username').valid() & $('#_pass').valid() & $('#_confirmPass').valid()) {
        $('#addUser').trigger('next.m.2');
    }
});

$("#cancelbtn").click(function(){
    $('#addUser').modal('hide')
    $('#addUser')[0].reset();
    $('#addUser').validate().resetForm();    
    return true
})

