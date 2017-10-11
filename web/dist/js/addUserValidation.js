$.validator.addMethod("nonNumeric", function (value, element) {
    return this.optional(element) || isNaN(Number(value));
});

$.validator.addMethod("noSpace", function(value, element) { 
    return value.indexOf(" ") < 0 && value != ""; 
  });
  
$.validator.addMethod("requireOne", function(value, element) {
       return ($('.require-one:checked').size() > 0);
});

$('#addUser').validate({
    rules: {
        _name: {
            required: true,
            nonNumeric: true,
        },
        _surname: {
            required: true,
            nonNumeric: true,
        },
        _username: {
            minlength: 6,
            required: true,
            noSpace: true,
        },
        _email: {
            required: true,
            email: true
        },
        _pass: {
            required: true,
            minlength: 6,
        },
        _confirmPass: {
            required: true,
            minlength: 6,
            equalTo: '#_pass',
        },
        Recepcionista:{
            requireOne: true
        },
        Admin:{
            requireOne: true
        },
        Pediatra:{
            requireOne: true
        }
    },
    messages: {
        _name: {
            required: "Ingrese el nombre",
            nonNumeric: "Ingrese un nombre valido",
        },
        _username: {
            required: "Ingrese el nombre de usuario",
            minlength: "Debe tener al menos 6 caracteres",
            noSpace: "No puede tener espacios en blanco"
        },
        _surname: {
            required: "Ingrese el apellido",
            nonNumeric: "Ingrese un apellido valido",
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
        Recepcionista:{
            required: ""
        },
        Admin:{
            required: ""
        },
        Pediatra:{
            required: ""
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

goBack = function (step){
    $('#addUser').trigger('next.m.' + step); 
}

goTo = function (step) {
    switch (step) {
        case 2:
            if ($('#_name').valid() & $('#_surname').valid() & $('#_email').valid() & $('#_username').valid() & $('#_pass').valid() & $('#_confirmPass').valid()) {
                $('#addUser').trigger('next.m.' + step);
            }
        case 3:
            break;
        default:
    }
}