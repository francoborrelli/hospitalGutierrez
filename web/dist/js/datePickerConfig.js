
$('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: true,
    language: "es",
    autoclose: true,
    orientation: "bottom right",
    endDate : 'now',
    todayBtn: 'linked',
});

$('.datepicker-days').find("td").each(
    $(this).click(function(){
    $("#controlDate").valid();
}));