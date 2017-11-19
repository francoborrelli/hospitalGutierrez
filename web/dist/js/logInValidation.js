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
            required: "",
            minlength: ""
        },
        username: {
            required: ""
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

