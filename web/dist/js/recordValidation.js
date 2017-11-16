$('textarea').autoResize();

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

// Inicializacion del validador del formulario addRecord

$('#addRecord').validate({
    rules: {
        controlDate: {
            required: true,
        },
        weight: {
            required: true,
        },
        fisicTest: {
            required: true,
        },
        fisicTestObservation: {
            required: true,
        },
        vaccination: {
            required: true,
        },
        maturation: {
            required: true,
        },
        maturationObservation: {
            required: true,
        },
        vaccinationObservation: {
            required: true,
        }
    },
    messages: {
        controlDate: {
            required: "Debe seleccionar una fecha",
        },
        weight: {
            required: "Debe ingresar el peso",
            step: "Debe tener solo dos decimales",
            min: "Debe ser mayor a cero",
            number: "Debe ingresar un número válido"
        },
        fisicTest: {
            required: "Debe seleccionar una opción",
        },
        fisicTestObservation: {
            required: "Debe llenar este campo",
        },
        vaccination: {
            required: "Debe seleccionar una opción",
        },
        maturation: {
            required: "Debe seleccionar una opción",
        },
        maturationObservation: {
            required: "Debe llenar este campo",
        },
        vaccinationObservation: {
            required: "Debe llenar este campo",
        },
        fisicalObservation: {
            required: "Debe llenar este campo",
        },
        pc: {
            step: "Debe tener solo dos decimales",
            min: "Debe ser mayor a cero",
            number: "Debe ingresar un número válido"
        },
        ppc: {
            step: "Debe tener solo dos decimales",
            min: "Debe ser mayor a cero",
            number: "Debe ingresar un número válido"
        },
        height: {
            step: "Debe tener solo dos decimales",
            min: "Debe ser mayor a cero",
            number: "Debe ingresar un número válido"
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
