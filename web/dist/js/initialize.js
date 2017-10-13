$(document).ready(function () {
  //Activa los tooltips de la página

  $('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
  });

  //efecto de navbar
  $(window).scroll(function () {
    if ($(document).scrollTop() > 40) {
      $('body>nav.navbar').addClass('shrink');
    } else {
      $('body>nav.navbar').removeClass('shrink');
    }
  });


  //evita submit on enter

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
});