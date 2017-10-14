var oTable =  $('#patients').DataTable({
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.modal( {
                header: function ( row ) {
                    var data = row.data();
                    return 'Paciente '+data[2]+' '+data[3];
                }
            } ),

            //Renderiza la tabla de datos del usuario en el modal de detalles.

            renderer: function ( api, rowIdx, columns ) {
                    var first = '<table class="table"><br>'
                    columns.slice(0,8).forEach(function ( col, i ) {
                            first += ('<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
                                '<td>'+col.title+':'+'</td> '+
                                '<td>'+col.data+'</td>'+
                            '</tr>')
                    } )
                    first += "</table>";

                    var second = '<table class="table"><br>'
                    columns.slice(9,15).forEach(function ( col, i ) {
                            second += ('<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
                                '<td>'+col.title+':'+'</td> '+
                                '<td>'+col.data+'</td>'+
                            '</tr>')
                    } )
                    second += "</div></table>";

                    var myvar = '<ul class="nav nav-tabs" id="myTab" role="tablist">'+
                    '                <li class="nav-item">'+
                    '                  <a class="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-expanded="true">Datos Personales</a>'+
                    '                </li>'+
                    '                <li class="nav-item">'+
                    '                  <a class="nav-link" id="demo-tab" data-toggle="tab" href="#demo" role="tab" aria-controls="demo">Datos Demograficos</a>'+
                    '                </li>'+
                    '              </ul>'+
                    '              <div class="tab-content" id="myTabContent">'+
                    '                <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab"><table class"table">' + first +
                                    '</table></div>'+
                    '                <div class="tab-pane fade" id="demo" role="tabpanel" aria-labelledby="demo-tab">' + second +'</div>'+
                    '             </div>';
                    console.log(first)
                    return myvar
                }
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
