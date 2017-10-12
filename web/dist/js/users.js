    $('#usuarios').DataTable({
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
        "info": false,
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