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
            minlength: 6,
            required: true,
            noSpace: true,
            maxlength: 50,
            remote: '/admin/security/validateUserName'
        },
        email: {
            required: true,
            email: true,
            maxlength: 255,
            remote: '/admin/security/validateEmail'
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
            maxlength: "No puede tener más de 50 caracteres",
            remote: "El nombre de usuario ya ha sido utilizado"
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
            required: "Ingrese el email",
            remote: "El correo ingresado ya ha sido utilizado"
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
