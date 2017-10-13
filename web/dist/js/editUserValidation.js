$(".editbtn").click(function(){
    reset();
    id = $(this).attr("data-id");
    modal = $("#editUser")
    $('#userId').val(id)
    tr = $(this).closest('tr').find("td")
    $("#editUsername").val($(tr).eq(0).text())
    $("#editName").val($(tr).eq(1).text())
    $("#editLastName").val($(tr).eq(2).text())
    $("#editEmail").val($(tr).eq(3).text())
    roles = $(tr).eq(4).text().split(/(?=[A-Z])/);

    roles.forEach(function(element) {
            $('#edit' + element ).prop('checked', true);
    }, this);
});

reset = function(){
    $('#editUser')[0].reset();
    $('#activeState').closest("label").removeClass("active")
    $('#blockedState').closest("label").removeClass("active")
    $('#editPass').removeClass('is-invalid');
    $('#newPass').removeClass('is-invalid');
    $('#confirmNewPass').removeClass('is-invalid');
    $('#activeState').attr('checked', false);  
    $('#blockedState').attr('checked', false);  
    $('#editUser').validate().resetForm();    
}

  


$('#editUser').validate({
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
        actualPass: {
            required: function(element){
                return (($("#newPass").val().length > 0) || ($("#confirmNewPass").val().length > 0));
            },
            minlength: 6,
            maxlength: 255,
        },
        pass: {
            required: function(element){
                return (($("#editPass").val().length > 0) || ($("#confirmNewPass").val().length > 0));
            },
            minlength: 6,
            maxlength: 255,
        },
        confirmNewPass: {
            required: function(element){
                return (($("#newPass").val().length > 0) || ($("#editPass").val().length > 0));
            },
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
        actualPass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        pass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        confirmNewPass: {
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

$( document ).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });

    $('.nav-link').click(function(e){
        if (!$('#editUser').valid()){
        e.preventDefault();
        e.stopPropagation();
        }
    })

});
    