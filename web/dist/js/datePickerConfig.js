
$('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: true,
    language: "es",
    autoclose: true,
    orientation: "bottom right",
    endDate : 'now',
    todayBtn: 'linked',
});

$('.datepicker').datepicker().on('changeDate', function (ev) {
    $("#controlDate").valid();
});

if ((typeof dataBirthday) !== 'undefined') {

    $('.datepicker').datepicker("setStartDate", dataBirthday);
    
}