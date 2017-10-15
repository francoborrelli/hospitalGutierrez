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
        pageAmount: {
            required: true,
            number: true,
        },
    },
    messages: {
        title: {
            required: "Ingrese el título",
            maxlength: "No puede tener más de 50 caracteres"
        },
        pageAmount: {
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

  //evita submit on enter

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  

$( document ).ready(function() {
    $('.nav-link').click(function(e){
        if (!$('#configForm').valid()){
        e.preventDefault();
        e.stopPropagation();
        }
    })
});
    