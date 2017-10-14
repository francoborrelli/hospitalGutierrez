$( document ).ready(function() {
    navValidate('#editPatient');
});
    

$(".editbtn").click(function(){
    reset();

    id = $(this).attr("data-id");
    $('#patientId').val(id)

    tr = $(this).closest('tr').find("td")

    $("#editTypeDni").val($(tr).eq(0).text())
    $("#editDni").val($(tr).eq(1).text())
    $("#editFirstName").val($(tr).eq(2).text())
    $("#editLastName").val($(tr).eq(3).text())
    $("#editGender").val($(tr).eq(5).text())
    $("#editAddress").val($(tr).eq(6).text())
    $("#editPhone").val($(tr).eq(7).text())
    $("#editInsurance").val($(tr).eq(8).text())

    check('#editFridge', 9);
    check('#editElectricity', 10);
    check('#editPets', 11);

    $("#editHouse").val($(tr).eq(12).text())
    $("#editHeat").val($(tr).eq(13).text())    
    $("#editWater").val($(tr).eq(14).text())

    var dateAr = $(tr).eq(4).text().split('/');
    var newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0]
    $("#editBirthday").val(newDate)



});
reset = function(){
    $('#editPatient')[0].reset();
    $('#editPatient').validate().resetForm();    
}

check = function(id, number){
    if ($(tr).eq(number).text() == "Si"){
        $(id).prop("checked", "checked")
    }  
}

$('#editPatient').validate({
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
        dni: {
            required: true,
            maxlength: 50,
        },
        birthday: {
            required: true,
        },
        address: {
            required: true,
        },
    },
    messages: {
        firstName: {
            required: "Ingrese el nombre",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
            maxlength: "No puede tener más de 50 caracteres"
        },
        dni: {
            required: "Ingrese el documento",
            maxlength: "Ingrese un documento valido",
        },
        lastName: {
            required: "Ingrese el apellido",
            nonNumeric: "Debe contener solo letras",
            alphanumeric: "Debe contener solo letras",
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
        }
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


