$('#configForm').validate({
    rules: {
        title: {
            required: true,
            maxlength: 50,
        },
        email: {
            required: true,
            email: true,
            maxlength: 255,
        },
        listAmount: {
            required: true,
            number: true,
        },
    },
    messages: {
        title: {
            required: "Ingrese el título",
            maxlength: "No puede tener más de 50 caracteres"
        },
        listAmount: {
            required: "",
            number: "",
            min: "",
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

// Desabilita las pestallas cuando hay un error de validación

$( document ).ready(function() {
    $('.nav-link').click(function(e){
        if (!$('#configForm').valid()){
        e.preventDefault();
        e.stopPropagation();
        }
    })
});
    