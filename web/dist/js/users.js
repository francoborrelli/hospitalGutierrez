var oTable =  $('#usuarios').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal( {
                    header: function ( row ) {
                        var data = row.data();
                        return 'Detalles de '+data[1]+' '+data[2];
                    }
                } ),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                    tableClass: 'table'
                } )
            }
        },
        columns: [
            { responsivePriority: 2 },
            { responsivePriority: 3 },
            { responsivePriority: 3 },
            { responsivePriority: 4 },
            { responsivePriority: 2 },
            { responsivePriority: 2 },
            { responsivePriority: 1 }
        ],
        "order": [
            [0, "asc"]
        ],
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [6]
        }],
        "bLengthChange": false,
        "bFilter": false,
        "info": false,
        "bPaginate": false,
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ usuarios",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando usuarios del _START_ al _END_",
            "sInfoEmpty": "Mostrando usuarios del 0 al 0",
            "sInfoFiltered": "(filtrado de un total de _MAX_ usuarios)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
        }
    });


$(document).ready(function() {
    $('select#stateFilter').change( function() { oTable.columns(5).search(this.value).draw(); } );
    } 
);


  //evita submit on enter

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
//Habilita enter en el search

$('.searchForm').find('input').each(function () {
    $(this).on('keydown', function (e) {
        if (e.which == 13) {
            $('#searchForm').submit()
            console.log("hola")
        }
    });

})

// Buttons Actions

$("#goBack").click(function(){
    $('#addUser').trigger('next.m.1'); 
});

$("#goNext").click(function(){
    if ($('#firstName').valid() & $('#lastName').valid() & $('#email').valid() & $('#username').valid() & $('#pass').valid() & $('#confirmPass').valid()) {
        $('#addUser').trigger('next.m.2');
    }
});

$("#cancelbtn").click(function(){
    $('#addUser').modal('hide')
    $('#addUser')[0].reset();
    $('#addUser').validate().resetForm();  
    $('#addUser').trigger('next.m.1');   
    return true
})

$(".deletebtn").click(function(){
    $("#deletedId").val($(this).data("id"))
    tr = $(this).closest('tr')
    name = $(tr).find("td").eq(1).text()
    surname = $(tr).find("td").eq(2).text()
    $(".modalText").text(name + ' ' + surname);
});
