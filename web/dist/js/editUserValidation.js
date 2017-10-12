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
    roles = $(tr).eq(4).text();
    if (~roles.indexOf("Recepcionista")){
        $('#editRecepc').prop('checked', true);
    }
    if (~roles.indexOf("Pediatra")){
        $('#editPediatra').prop('checked', true);
    }
    if (~roles.indexOf("Administrador")){
        $('#editAdmin').prop('checked', true);
    }

    state = $(tr).eq(5).text();
    if (~state.indexOf("Activo")){
        $('#activeState').attr('checked', true);  
        $('#activeState').closest("label").addClass("active")
    }else{
        $('#blockedState').attr('checked', true);  
        $('#blockedState').closest("label").addClass("active")
    }
});

reset = function(){
    $('#editUser')[0].reset();
    $('#activeState').closest("label").removeClass("active")
    $('#blockedState').closest("label").addClass("active")
    $('#editPass').removeClass('is-invalid');
    $('#newPass').removeClass('is-invalid');
    $('#confirmNewPass').removeClass('is-invalid');
    $('#editUser').validate().resetForm();    
}

  


$('#editUser').validate({
    rules: {
        editName: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        editLastName: {
            alphanumeric: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        editUsername: {
            alphanumeric: true,
            minlength: 6,
            required: true,
            noSpace: true,
            maxlength: 50,
        },
        editEmail: {
            required: true,
            email: true,
            maxlength: 255,
        },
        editPass: {
            required: function(element){
                return (($("#newPass").val().length > 0) || ($("#confirmNewPass").val().length > 0));
            },
            minlength: 6,
            maxlength: 255,
        },
        newPass: {
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
        editName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        editUsername: {
            required: "Ingrese el nombre de usuario",
            minlength: "Debe tener al menos 6 caracteres",
            noSpace: "No puede tener espacios en blanco",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        editLastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
        },
        editPass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        newPass: {
            required: "Ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres"
        },
        confirmNewPass: {
            required: "Re-ingrese la contraseña",
            minlength: "Debe tener al menos 6 caracteres",
            equalTo: "La contraseña no coincide"
        },
        editEmail: {
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
    