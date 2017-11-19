//Inicializa la validacion del iniciar sesión

$('#logInForm').validate({
    rules: {
        username: {
            required: true,
        },
        pass: {
            minlength: 6,
            required: true,
        },
    },
    messages: {
        pass: {
            required: "Por favor ingrese su contraseña",
            minlength: "Su contraseña debe tener al menos 6 caracteres"
        },
        username: {
            required: "Por favor ingrese su nombre de usuario"
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

