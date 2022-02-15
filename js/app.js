$(document).ready(function () {
  function overlay(show) {
    if (show) {
      var top = $(window).scrollTop();
      var left = $(window).scrollLeft();
      $(window).scroll(function () {
        $(this).scrollTop(top).scrollLeft(left);
      });
    } else {
      $(window).unbind("scroll");
    }
  }

  $("#burgerBtn").click(function (evt) {
    evt.preventDefault();
    $("#burgerBtn").toggleClass("burger--active");
    $("#nav").toggleClass("nav--active");
    $(".container.mob").toggleClass("active");
    $("html").toggleClass("noscroll");

    if ($(this).hasClass("active")) {
      overlay(true);

      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    } else {
      overlay(false);

      document.ontouchmove = function (e) {
        return true;
      };
    }
  });

  $("#cabinetPrizesSlider")
    .not(".slick-initialized")
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      centerMode: false,
      autoplay: false,
      prevArrow: $("#cabinetPrizesArrowPrev"),
      nextArrow: $("#cabinetPrizesArrowNext"),
    });

  if ($(".select").length > 1) {
    $("select").each(function () {
      let $this = $(this).not(".select-search");
      let parent = $(this).not(".select-search").parents(".select");
      $this.select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: parent,
      });
    });
    $(".select-search").each(function () {
      let $this = $(this);
      let parent = $(this).parents(".select");
      $this.select2({
        dropdownParent: parent,
      });
    });
  } else {
    $("select").select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: $(".select"),
    });
  }

  function checkValidate() {
    var form = $("form");

    $.each(form, function () {
      $(this).validate({
        ignore: [],
        errorClass: "error",
        validClass: "success",
        rules: {
          name: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            phone: true,
          },
          message: {
            required: true,
          },
          password: {
            required: true,
            normalizer: function normalizer(value) {
              return $.trim(value);
            },
          },
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
          var placement = $(element).data("error");
          if (placement) {
            $(placement).append(error);
          } else {
            error.insertBefore(element);
          }
        },
        messages: {
          phone: "Некорректный номер",
          email: "Некорректный e-mail",
        },
      });
    });
    jQuery.validator.addMethod("email", function (value, element) {
      return (
        this.optional(element) ||
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)
      );
    });
    jQuery.validator.addMethod("phone", function (value, element) {
      return (
        this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value)
      );
    });
  }
  checkValidate();

  $(".faq__header").click(function () {
    const faqItem = $(this).parents(".faq__item");
    faqItem.toggleClass("faq__item--active");
  });

  $("input[type=tel]").mask("8-999-999-9999");
  $("#card_number").mask("9999-9999-9999-9999");

  $("#stockSlider")
    .not(".slick-initialized")
    .slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      centerMode: false,
      autoplay: false,
      prevArrow: $("#stockSliderPrev"),
      nextArrow: $("#stockSliderNext"),
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

  $(".video__btn").click(function (evt) {
    evt.preventDefault();

    $(this).fadeOut();

    // $("#video").get(0).play();
    // $("#video").attr("controls", "controls");
  });

  function closePopup() {
    $(".popup").removeClass("popup--show");
    $("html").removeClass("noscroll");
    $("#burgerBtn").removeClass("burger--active");
    $("#nav").removeClass("nav--active");
    overlay(false);
  }

  function openPopup(popupId) {
    $(popupId).addClass("popup--show");
    $("html").addClass("noscroll");
    overlay(true);
  }

  $("[data-popup]").click(function (evt) {
    evt.preventDefault();
    let data = $(this).data("popup");
    closePopup();
    openPopup(data);
  });

  // $(document).on("click", function (evt) {
  //   if (
  //     !(
  //       $(evt.target).parents(".popup__wrap").length ||
  //       $(evt.target).hasClass("popup__wrap") ||
  //       $(evt.target).data("popup")
  //     )
  //   ) {
  //     closePopup();
  //   }
  // });

  $(".popup__close__btn").click(function (evt) {
    evt.preventDefault();

    closePopup();
  });

  $(document).keydown((evt) => {
    if (evt.keyCode == 27) {
      closePopup();
    }
  });

  $("#registrationForm").submit(function (evt) {
    evt.preventDefault();

    openPopup($("#successfulRegistration"));
  });

});
