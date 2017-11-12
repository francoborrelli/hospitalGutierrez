// métodos personalizados del validador

$.validator.addMethod("nonNumeric", function (value, element) {
    return this.optional(element) || isNaN(Number(value));
});

$.validator.addMethod("noSpace", function (value, element) {
    return value.indexOf(" ") < 0 && value != "";
});

$.validator.addMethod("nombreReal", function(value, element) {
    return this.optional(element) || /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/i.test(value);
}, "");

$.validator.messages.required = '';

// Inicializacion del validador del formulario addPatients

$('#addPatient').validate({
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
            remote: {
              url: "/admin/security/validatePatientDocument",
              data: {
                documentTypeId: function() {
                return $("#documentTypeId").val();
              }
            }
          }
        },
        birthday: {
            required: true,
        },
        address: {
            required: true,
        },
        phone: {
            minlength: 5,
        },
        documentTypeId: {
            required: true,
        },
        genderId: {
            required: true,
        },
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
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            nombreReal: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
            pattern: "Debe contener solo letras",
        },
        documentNumber: {
            required: "Ingrese el documento",
            maxlength: "Ingrese un documento valido",
            remote: "Ya existe un paciente con este número de documento"
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            nombreReal: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres",
            pattern: "Debe contener solo letras",
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
