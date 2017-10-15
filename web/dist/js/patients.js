//Configuración de la tabla de pacientes

var oTable =  $('#patients').DataTable({
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.modal( {
                header: function ( row ) {
                    var data = row.data();
                    return 'Paciente '+data[0]+' '+data[1];
                }
            } ),

            //Renderiza la tabla de datos del usuario en el modal de detalles.

            renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                tableClass: 'table'
            } )
        }
    },
    columns: [
        { responsivePriority: 2 }, //nombre
        { responsivePriority: 2 }, //apellido
        { responsivePriority: 3 }, //Tipo doc
        { responsivePriority: 3 }, //documento
        { responsivePriority: 1 }   //Opciones
    ],
    "order": [
        [0, "asc"]
    ],
    "aoColumnDefs": [{
        "bSortable": false,
        "aTargets": [4]
    }],
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

//evita submit de formulario al apretar enter 

$(document).ready(function () {
    $(window).keydown(function (event) {
        if ((event.keyCode == 13)) {
            event.preventDefault();
            return false;
        }
    });
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