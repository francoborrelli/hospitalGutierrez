$(".editbtn").click(function(){
    reset();
    modal = $("#editUser")
    modal.find("#UserId").val($(this).data("id"))
    tr = $(this).closest('tr').find("td")
    $("#editUsername").val($(tr).eq(0).text())
    $("#editName").val($(tr).eq(1).text())
    $("#editSurname").val($(tr).eq(2).text())
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
    $('#editAdmin').prop('checked', false);
    $('#editPediatra').prop('checked', false);
    $('#editRecepc').prop('checked', false);
}
