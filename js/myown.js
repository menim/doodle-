$(document).ready(function() {
  
  /*Intial config*/

  "use strict";
  $(".fancybox").fancybox({
    padding: 0,
    helpers: {
      title: null,
      overlay: {
        locked: false
      }
    }
  });

  $("#doodle-slider-wrapper").slick({
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: "linear",
    arrows: true,
    mobilefirst: true
  });

  document.body.className += " loaded";
  

  /*Appear images and text on main page, when scroll*/

  var windowVar = $(window), hideme = $(".hideme"), hidemeLen = hideme.length;
  windowVar.scroll(function() {
    for (var i = 0; i < hidemeLen; i++) {
      var self = $(hideme[i]),
        bottomOfObject = self.offset().top + self.outerHeight(),
        bottomOfWindow = windowVar.scrollTop() + windowVar.height();
      if (bottomOfWindow > bottomOfObject) {
        if (self.hasClass("doodle-item__content")) {
          self.animate({ right: 0 }, 700).animate({ opacity: 1 });
        } else {
          self.animate({ left: 0, opacity: 1 }, 700).animate({ opacity: 1 });
        }
      }
    }
  });

  /* scroll to*/

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000
          );
          return false;
        }
      }
    });

    /* swap to gallery page when click on ribbon with "watch pages" inscription */

    var self = null,
      container = null,
      items = null,
      frstChild = null,
      secChild = null,
      elem = null,
      elemLen = null,
      containerPreview = null;

    $(".doodle-item__ribbon").find("a").click(function(e) {
      e.preventDefault();
      self = $(this);
      container = self.parent().parent();
      items = container.find(".doodle-item__container");
      frstChild = items.eq(0);
      secChild = items.eq(1);
      elem = container.find(".preview");
      elemLen = elem.length;
      containerPreview = elem.parent();

      frstChild.toggleClass("clicked");
      secChild.toggleClass("clicked-two");
      self.parent().toggleClass("clicked-ribbon");
      self.children().toggleClass("rotate");

      setTimeout(function() {
        for (var j = 0; j < elemLen; j++) {
          if ($(elem[j]).css("display") === "none") {
            $(elem[j]).delay(j * 150).fadeIn(200);
          }
        }
      }, 800);
    });
  });

  /* Fill all svg images */

  setTimeout(function() {
    var el = document.querySelectorAll(".st0"), len = el.length;
    for (var i = 0; i < len; i++) {
      el[i].setAttribute("fill", "gray");
    }
  }, 5000);
});

/* collapse-extend menu on mobile */

var hamburger_btn = document.querySelector(".hamburger-btn"),
  header = document.querySelector("header"),
  headWrapper = document.querySelector("header .container"),
  h = headWrapper.clientHeight,
  additional_class = " is-active";

hamburger_btn.addEventListener("click", function() {
  if (parseInt(header.style.height) !== h) {
    this.className += additional_class;
    header.style.height = h + "px";
  } else {
    header.style.height = "130px";
    this.className = this.className.replace(" is-active", "");
  }
});

/* FORM VALIDATION */

function validateName(name) {
  var re = /^[а-яА-яіІЇїЄєґҐёЁA-Za-z]+$/;
  if (name.value === "" || !re.test(name.value)) {
    name.nextElementSibling.innerHTML = "Вы ввели неправильное имя";
    name.nextElementSibling.className = "error is-active-error";
    return false;
  }
  return true;
}

function validateTextarea(elem) {
  if (elem.value === "") {
    elem.nextElementSibling.innerHTML =
      "Сообщение не может быть пустым. Пожалуйста введите текст сообщения";
    elem.nextElementSibling.className = "error is-active-error";
    return false;
  }
  return true;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value === "" || !re.test(email.value)) {
    email.nextElementSibling.innerHTML = "Вы ввели неправильный email-адрес";
    email.nextElementSibling.className = "error is-active-error";
    return false;
  }
  return true;
}

var form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  var nameVal = document.getElementById("name"),
    textVal = document.getElementById("message"),
    email = document.getElementById("email");
  if (
    !validateEmail(email) ||
    !validateTextarea(textVal) ||
    !validateName(nameVal)
  ) {
    event.preventDefault();
  }
});

/* DETECT SWIPE GESTURE */

var xDown = null;
var yDown = null;

$(".doodle-item__container").on("touchstart", function(e) {
  xDown = e.originalEvent.touches[0].clientX;
});

$(".doodle-item__container").on("touchmove", function(e) {
  var self = $(this),
    ribbon = self.parent().find(".doodle-item__ribbon").find("a").children();
  if (!xDown) {
    return;
  }

  var xUp = e.originalEvent.touches[0].clientX, xDiff = xDown - xUp;

  if (xDiff > 100) {
    self.addClass("clicked");
    self.next().addClass("clicked-two");
    ribbon.addClass("rotate");
    var el = self.next().addClass("clicked-two").find(".preview"),
      elLen = el.length;
    setTimeout(function() {
      //el.each(function(item){
      for (var k = 0; k < elLen; k++) {
        if ($(el[k]).css("display") === "none") {
          $(el[k]).delay(k * 150).fadeIn(200);
        }
      }
      //});
    }, 800);
  } else if (xDiff < -50) {
    self.prev().removeClass("clicked");
    self.removeClass("clicked-two");
    ribbon.removeClass("rotate");
  }
});
