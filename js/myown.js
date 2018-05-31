'use strict';

(function (w, d, $) {
  'use strict';

  var throttle = function throttle(action) {
    var isRunning = false;
    return function () {
      if (isRunning) return;
      isRunning = true;
      w.requestAnimationFrame(function () {
        action();
        isRunning = false;
      });
    };
  };

  $(d).ready(function () {
    /* Init sliders */

    var slider = tns({
      container: '.doodle-slider__wrapper',
      items: 1,
      mode: 'gallery'
    });

    $('.fancybox').fancybox({
      padding: 0,
      helpers: {
        title: null,
        overlay: {
          locked: false
        }
      }
    });

    /* scrool to init */

    var scroll = new SmoothScroll('a[href*="#"]');

    /* Appear images and text on main page, when scroll */

    var targets = d.querySelectorAll('[class*="hide"]');

    var callback = function callback(entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio) {
          entry.target.classList.add('show');
        }
      });
    };

    var observer = new IntersectionObserver(callback);

    targets.forEach(function (target) {
      return observer.observe(target);
    });

    /* swap to gallery page when click on ribbon with "watch pages" inscription */

    var self = null;
    var container = null;
    var items = null;
    var frstChild = null;
    var secChild = null;
    var elem = null;
    var elemLen = null;
    var containerPreview = null;

    $('.doodle-item__ribbon').click(function (e) {
      e.preventDefault();
      self = $(this);
      container = self.parent();
      items = container.find('.doodle-item__container');
      frstChild = items.eq(0);
      secChild = items.eq(1);
      /*      elem = container.find('.preview');
            elemLen = elem.length;
            containerPreview = elem.parent();*/

      frstChild.toggleClass('doodle-item__container_translate_left');
      secChild.toggleClass('doodle-item__container_translate_right');
      self.toggleClass('doodle-item__ribbon_active');
      self.children().toggleClass('doodle-item__triangle_rotate_180');

      /*      setTimeout(function() {
              for (let j = 0; j < elemLen; j++) {
                if ($(elem[j]).css('display') === 'none') {
                  $(elem[j]).delay(j * 150).fadeIn(200);
                }
              }
            }, 800);*/
    });

    /* Fill all svg images */

    setTimeout(function () {
      var el = document.querySelectorAll(".svg-path");
      var len = el.length;
      for (var i = 0; i < len; i++) {
        el[i].setAttribute('fill', 'gray');
      }
    }, 5000);
  });

  /* collapse-extend menu on mobile */

  var hamburger_btn = d.querySelector('.hamburger-btn');
  var header = d.querySelector("header");
  var headWrapper = d.querySelector("header .container");
  var headerHeight = headWrapper.clientHeight;
  var additionalClass = ' hamburger-btn_active';

  hamburger_btn.addEventListener('click', function () {
    if (parseInt(header.style.height) !== headerHeight) {
      this.className += additionalClass;
      header.style.height = headerHeight + 'px';
    } else {
      header.style.height = '130px';
      this.className = this.className.replace(' hamburger-btn_active', '');
    }
  });

  /* FORM VALIDATION */

  /** Validate text input with name, should not be empty and must consist
     of letters
     @param {string} name - value of input
     @return {bool}
  */
  function validateName(name) {
    var re = /^[а-яА-яіІЇїЄєґҐёЁA-Za-z]+$/;
    if (name.value === '' || !re.test(name.value)) {
      name.nextElementSibling.innerHTML = 'Вы ввели неправильное имя';
      name.nextElementSibling.className = 'error is-active-error';
      return false;
    }
    return true;
  }

  /** Validate textarea, should not be empty
     @param {string} text - value of textarea
     @return {bool}
  */
  function validateTextarea(text) {
    if (elem.value === '') {
      elem.nextElementSibling.innerHTML = 'Сообщение не может быть пустым. Пожалуйста введите текст сообщения';
      elem.nextElementSibling.className = 'error is-active-error';
      return false;
    }
    return true;
  }

  /** Validate email input, should be valid email address
    @param {string} email  - value of email input
    @return {bool}    
  */
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value === '' || !re.test(email.value)) {
      email.nextElementSibling.innerHTML = 'Вы ввели неправильный email-адрес';
      email.nextElementSibling.className = 'error is-active-error';
      return false;
    }
    return true;
  }

  var form = d.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    var nameVal = d.getElementById('name');
    var textVal = d.getElementById('message');
    var email = d.getElementById('email');
    if (!validateEmail(email) || !validateTextarea(textVal) || !validateName(nameVal)) {
      event.preventDefault();
    }
  });
})(window, document, jQuery);

/* DETECT SWIPE GESTURE */
/*
let xDown = null;
let yDown = null;

$('.doodle-item__container').on('touchstart', function(e) {
  xDown = e.originalEvent.touches[0].clientX;
});

$('.doodle-item__container').on('touchmove', function(e) {
  let self = $(this);
  let ribbonTriangles = self.parent().find('.doodle-item__ribbon').find('a').children();
  if (!xDown) {
    return;
  }

  let xUp = e.originalEvent.touches[0].clientX, xDiff = xDown - xUp;

  if (xDiff > 100) {
    self.addClass('doodle__container_translate_left');
    self.next().toggle('doodle__container_translate_right');
    ribbonTriangles.addClass('rotate');
       /*let el = self.next().addClass('clicked-two')/*.find('.preview');
 let elLen = el.length;
    setTimeout(function() {
      el.each(function(item) {
        for (let k = 0; k < elLen; k++) {
          if ($(el[k]).css('display') === 'none') {
            $(el[k]).delay(k * 150).fadeIn(200);
          }
        }
      });
    }, 800);
  } else if (xDiff < -50) {
    self.prev().removeClass('doodle__container_translate_left');
    self.next().toggle('doodle__container_translate_right');
    ribbonTriangles.removeClass('rotate');
  }
});*/
//# sourceMappingURL=my-exp.js.map
//# sourceMappingURL=myown.js.map
