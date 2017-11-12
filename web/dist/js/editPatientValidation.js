// metodos adicionales del validador

$.validator.addMethod("nonNumeric", function (value, element) {
    return this.optional(element) || isNaN(Number(value));
});

$.validator.addMethod("noSpace", function (value, element) {
    return value.indexOf(" ") < 0 && value != "";
});

$.validator.addMethod("nombreReal", function (value, element) {
    return this.optional(element) || /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/i.test(value);
}, "");

$(document).ready(function () {
    $document = $('#documentNumber').val();
    $type = $('#documentTypeId').val();
});


//inicializacion de la validacion del formulario de datos personales

$('#editPersonalInfo').validate({
    rules: {
        firstName: {
            nombreReal: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        lastName: {
            nombreReal: true,
            required: true,
            nonNumeric: true,
            maxlength: 50,
        },
        documentNumber: {
            required: true,
            maxlength: 50,
        },
        birthday: {
            required: true,
        },
        address: {
            required: true,
        },
        documentTypeId: {
            required: true,
            remote: {
                url: "/admin/security/validatePatientDocument",
                data: {
                    documentTypeId: function () {
                        return $("#documentTypeId").val();
                    },
                    modified: function () {
                        return (($("#documentTypeId").val() !== $type) || ($("#documentNumber").val() !== $document));
                    }
                }
            }
        },
        genderId: {
            required: true,
        },
        phone: {
            minlength: 5,
        },
    },    
    messages: {
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            nombreReal: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        documentNumber: {
            required: "Ingrese el documento",
            maxlength: "Ingrese un documento valido",
            remote: "Ya existe un paciente con este número de documento",
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            nombreReal: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
        },
        birthday: {
            required: "Ingrese la fecha",
            max: "Ingrese una fecha valida",
            min: "Ingrese una fecha valida",
        },
        address: {
            required: "Ingrese la dirección del domicilio",
        },
        phone: {
            minlength: "Ingrese un teléfono válido"
        },
        documentTypeId: {
            required: "Seleccione el tipo de documento",
        },
        genderId: {
            required: "Seleccione el género",
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

//inicializacion de la validacion del formulario de datos demograficos

$('#editDemographicInfo').validate({
    rules: {
        houseTypeId: {
            required: true,
        },
        heatingTypeId: {
            required: true,
        },
        waterTypeId: {
            required: true,
        }
    },
    messages: {
        heatingTypeId: {
            required: "Seleccione el tipo de calefacción",
        },
        houseTypeId: {
            required: "Seleccione el tipo de casa",
        },
        waterTypeId: {
            required: "Seleccione el tipo de Agua",
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

//Efecto en los botones
$('.nav-link').click(function () {
    form = $(this).attr("data-form")
    if ($(form).length == 0) {
        $("#editbtn").prop('disabled', true);
    } else {
        $("#editbtn").prop('disabled', false);
        $('#editbtn').attr('data-target', $(this).data("form"));
    }
})

$(document).ready(function () {
    form = $('.nav-link.active').attr("data-form")
    if ($(form).length == 0) {
        $("#editbtn").prop('disabled', true);
    } else {
        $("#editbtn").prop('disabled', false);
        $('#editbtn').attr('data-target', $(this).data("form"));
    }
});



$('#btnClose').click(function () {
    $(this).closest('form')[0].reset();
    $(this).closest('form').validate().resetForm()
})