$(function () {
  $(".fade-img img:not(:first-child)").hide();
  setInterval(function () {
    $(".fade-img img:first-child")
      .fadeOut("slow")
      .next("img")
      .fadeIn("slow")
      .end()
      .appendTo(".fade-img");
  }, 3500);
});

$(function () {
  $(window).scroll(function () {
    $(".effect-fade").each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight) {
        $(this).addClass("effect-scroll");
      }
    });
  });
});
