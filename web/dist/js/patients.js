var oTable =  $('#patients').DataTable({
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.modal( {
                header: function ( row ) {
                    var data = row.data();
                    return 'Paciente '+data[2]+' '+data[3];
                }
            } ),
            renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                tableClass: 'table'
            } )
        }
    },
    columns: [
        { responsivePriority: 2 }, //Tipo doc
        { responsivePriority: 2 }, // documento
        { responsivePriority: 4 }, //nombre
        { responsivePriority: 4 }, //apellido
        { responsivePriority: 6 }, //nacimiento
        { responsivePriority: 3 }, //Genero
        { responsivePriority: 7 }, //Domicilio
        { responsivePriority: 8 }, //Tel
        { responsivePriority: 5 }, //Obra social
        { responsivePriority: 10 }, //heladera
        { responsivePriority: 10 }, //Electricidad
        { responsivePriority: 10 }, //Mascotas
        { responsivePriority: 10 }, //Vivienda
        { responsivePriority: 10 }, //calefaccion
        { responsivePriority: 10 }, //Agua
        { responsivePriority: 1 }   //Opciones
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
