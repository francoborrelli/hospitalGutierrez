
$('#editArticles').validate({
    messages: {
        title0: {
            required: "",
        },
        title1: {
            required: "",
        },
        title2: {
            required: "",
        },
        body0: {
            required: "",
        },
        body1: {
            required: "",
        },
        body2: {
            required: "",
        },
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
