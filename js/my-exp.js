'use strict';

(function (w, d, $) {

  $(d).ready(function () {
    /* Intial slider config */

    'use strict';

    $('#doodle-slider__wrapper').slick({
      infinite: true,
      speed: 1000,
      fade: true,
      cssEase: 'linear',
      arrows: true,
      mobilefirst: true,
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

    /* Appear images and text on main page, when scroll */

    let winH = w.innerHeight || 0;
    let viewHeight = Math.max(d.documentElement.clientHeight, winH);
    let sections = d.querySelectorAll('[class*="hide"]');

    w.addEventListener('resize', () => {
      winH = w.innerHeight || 0;
      viewHeight = Math.max(d.documentElement.clientHeight, winH);
    });

    w.addEventListener('scroll', () => {
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < viewHeight) {
          if (section.className.indexOf('show') === -1) {
            section.className += ' show';
          }
        }
      });
    });

    /* scroll to*/

/*   $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });*/
 
  let links = d.querySelectorAll('a[href*="#"]:not([href="#"])');
  links.forEach((link) => {
    link.addEventListener('click', function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : d.querySelector('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    })
  })



    /* swap to gallery page when click on ribbon with "watch pages" inscription */

    let self = null;
    let container = null;
    let items = null;
    let frstChild = null;
    let secChild = null;
    let elem = null;
    let elemLen = null;
    let containerPreview = null;

    $('.doodle-item__ribbon').click(function(e) {
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

    setTimeout(function() {
      let el = document.querySelectorAll(".svg-path");
      let len = el.length;
      for (let i = 0; i < len; i++) {
        el[i].setAttribute('fill', 'gray');
      }
    }, 5000);
  });
      
  /* collapse-extend menu on mobile */

  let hamburger_btn = d.querySelector('.hamburger-btn');
  let header = d.querySelector("header");
  let headWrapper = d.querySelector("header .container");
  let headerHeight = headWrapper.clientHeight;
  let additionalClass = ' hamburger-btn_active';

  hamburger_btn.addEventListener('click', function() {
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
    let re = /^[а-яА-яіІЇїЄєґҐёЁA-Za-z]+$/;
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
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value === '' || !re.test(email.value)) {
      email.nextElementSibling.innerHTML = 'Вы ввели неправильный email-адрес';
      email.nextElementSibling.className = 'error is-active-error';
      return false;
    }
    return true;
  }

  let form = d.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    let nameVal = d.getElementById('name');
    let textVal = d.getElementById('message');
    let email = d.getElementById('email');
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
