$( window ).resize(function() {
    if ($(window).width() < 875){
    $('#_password').popover('hide')
    $('#_username').popover('hide')
    }else{
        if (($(window).width() > 875)){
            $('#_password').popover('show')
            $('#_username').popover('show')
        }
    }
  });

$('#logInForm').validate({
    rules: {
        _username: {
            required: true,
            email: true
        },
        _password: {
            minlength: 6,
            required: true,
        },
    },
    messages: {
        _password: {
            required: "Por favor ingrese su contraseña",
            minlength: "Su contraseña debe tener al menos 6 caracteres"
        },
        _username: {
            email: "Por favor ingrese un email valido",
            required: "Por favor ingrese su email"
        },
    },
    errorPlacement: function (err, element) {
        $(element).popover({
            placement: 'right',
            trigger: 'manual'
        });
        $(element).attr('data-content', err.text());
        if ($(window).width() > 870){
            $(element).popover('enable'); 
            $(element).popover('show'); 
        }  
    },

    highlight: function (element) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).popover('hide');
        $(element).removeClass('is-invalid');
        show = false;
        $(element).popover('disable');
    },
    submitHandler: function (form) {
        form.submit();
    },
});