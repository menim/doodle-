'use strict';

(function (w, d) {
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

    /* Init sliders */

  var slider = tns({
    container: '.doodle-slider__wrapper',
    items: 1,
    mode: 'gallery'
  });

   
  var doodleStep = new Lightbox({
    selector: '[data-rel="aiLightbox"]', // string
    lazyload: true, // boolean
    arrows: true, // boolean
    counter: true, // boolean
    slideSpeed: 500,
    container: 'gallery2'
  });

  var doodleVisual = new Lightbox({
    selector: '[data-rel="aiLightbox"]', // string
    lazyload: true, // boolean
    arrows: true, // boolean
    counter: true, // boolean
    slideSpeed: 500,
    container: 'gallery1',
  });

  var doodleOk = new Lightbox({
    selector: '[data-rel="aiLightbox"]', // string
    lazyload: true, // boolean
    arrows: true, // boolean
    counter: true, // boolean
    slideSpeed: 500,
    container: 'gallery3',
  });

  /* scrool to init */

  var scroll = new SmoothScroll('a[href*="#"]');

  /* Appear images and text on main page, when scroll */

  var targets = d.querySelectorAll('[class*="hide"]');

  var callback = function callback(entries) {
    entries.forEach(function(entry) {
      if (entry.intersectionRatio) {
        entry.target.classList.add('show');
      }
    });
  };

  var observer = new IntersectionObserver(callback);

  targets.forEach(function(target) {
    return observer.observe(target);
  });

  /* swap to gallery page when click on ribbon with "watch pages" inscription */

  function slideSection(e) {
     e.preventDefault();
     var ribbonBtn = e.target;
     var doodleContainer = ribbonBtn.parentNode;
     var containersList = doodleContainer.querySelectorAll('.doodle-item__container');
     containersList[0].classList.toggle('doodle-item__container_translate_left');
     containersList[1].classList.toggle('doodle-item__container_translate_right');
     ribbonBtn.classList.toggle('doodle-item__ribbon_active');
     ribbonBtn.querySelectorAll('.doodle-item__triangle').forEach(function(item){
       item.classList.toggle('doodle-item__triangle_rotate_180');
     });
  }

  document.querySelectorAll('.doodle-item__ribbon').forEach(function(ribbon) {
    ribbon.addEventListener('click', slideSection);
  });


  /* Fill all svg images */

  setTimeout(function () {
    var el = document.querySelectorAll(".svg-path");
    var len = el.length;
    for (var i = 0; i < len; i++) {
      el[i].setAttribute('fill', 'gray');
    }
  }, 5000);


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
})(window, document);
