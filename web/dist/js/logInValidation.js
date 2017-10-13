$( window ).resize(function() {
    if ($(window).width() < 875){
    $('#_password').popover('hide')
    $('#_email').popover('hide')
    }else{
        if (($(window).width() > 875)){
            $('#_password').popover('show')
            $('#_email').popover('show')
        }
    }
  });

$('#logInForm').validate({
    rules: {
        email: {
            required: true,
            email: true
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
        email: {
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
