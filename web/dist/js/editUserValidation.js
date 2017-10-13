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
            remote: {
                url: '/admin/security/validateUserName',
                data: {
                    userId: function() {
                        return $("#userId").val();
                    }
                }
            }
        },
        email: {
            required: true,
            email: true,
            maxlength: 255,
            remote: {
                url: '/admin/security/validateEmail',
                data: {
                    userId: function() {
                        return $("#userId").val();
                    }
                }
            }
        },
        pass: {
            required: function(element){
                return (($("#newPass").val().length > 0) || ($("#confirmNewPass").val().length > 0));
            },
            minlength: 6,
            maxlength: 255,
        },
        confirmPass: {
            required: function(element){
                return (($("#newPass").val().length > 0) || ($("#confirmNewPass").val().length > 0));
            },
            minlength: 6,
            equalTo: '#newPass',
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
            equalTo: "Las contraseñas no coinciden"
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

$( document ).ready(function() {
    $('.nav-link').click(function(e){
        if (!$('#editUser').valid()){
        e.preventDefault();
        e.stopPropagation();
        }
    })
});
    
