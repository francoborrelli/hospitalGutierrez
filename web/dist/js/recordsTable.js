// Date correct Sorting

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "date-uk-pre": function ( a ) {
        if (a == null || a == "") {
            return 0;
        }
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },
 
    "date-uk-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "date-uk-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );


//Configuración de la tabla de controles

var oTable =  $('#recordsTable').DataTable({
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.modal( {
                header: function ( row ) {
                    var data = row.data();
                    return 'Control '+data[0];
                }
            } ),

            //Renderiza la tabla de datos del controles en el modal de detalles.

            renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                tableClass: 'table'
            } )
        }
    },
    columns: [
        { responsivePriority: 2 }, //fecha
        { responsivePriority: 3 }, //Pediatra
        { responsivePriority: 1 }, //Opciones
    ],
    "order": [
        [0, "dsc"]
    ],
    "aoColumnDefs": [{
        "bSortable": false,
        "aTargets": [2]
    },
    { type: 'date-uk', targets: 0 }
    ],
    "bLengthChange": false,
    "info": false,
    "bFilter": false,
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


//buttons configuration

$('.btn-delete').click(function() {
    $action = $(this).closest("td").find(".btn-show").attr('href');
    $date = $(this).closest("tr").find("td").first().text();
    $('#modalDate').text($date);
    $('#deleteRecordForm').attr('action', $action + '/remove');
  });
  

// Reports responsiveness

$('a.nav-link').click(function(){
    $('a.nav-link').each(function(){
        $(this).removeClass('active');
    })
    $(this).addClass('active');
    href = $(this).attr('href');
    $('.tab-pane').each(function(){
        $(this).removeClass('show active');
    })
    $(href).addClass('show active');
    window.dispatchEvent(new Event('resize'));
    oTable.columns.adjust().draw();
})
