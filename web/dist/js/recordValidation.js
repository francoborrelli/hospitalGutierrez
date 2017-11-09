$('textarea').autoResize();

$('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: true,
    language: "es",
    autoclose: true,
    orientation: "bottom right",
    endDate : 'now',
});

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
        fisicalObservations: {
            required: true,
        },
        vacunation: {
            required: true,
        },
        maturation: {
            required: true,
        },
        maturationObservations: {
            required: true,
        },
        vaccinationObservations: {
            required: true,
        }
    },
    messages: {
        controlDate: {
            required: "Seleccione la fecha de la consulta",
        },
        weight: {
            required: "Debe ingresar el peso",
            step: "Debe tener solo dos decimales",
            min: "Debe ser mayor a cero"
        },
        fisicTest: {
            required: "Debe seleccionar una opción",
        },
        fisicalObservation: {
            required: "Debe llenar este campo",
        },
        vacunation: {
            required: "Debe seleccionar una opción",
        },
        maturation: {
            required: "Debe seleccionar una opción",
        },
        maturationObservations: {
            required: "Debe llenar este campo",
        },
        vaccinationObservations: {
            required: "Debe llenar este campo",
        },
        fisicalObservations: {
            required: "Debe llenar este campo",
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