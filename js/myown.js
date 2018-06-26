
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
    container: 'gallery1'
  });

  var doodleOk = new Lightbox({
    selector: '[data-rel="aiLightbox"]', // string
    lazyload: true, // boolean
    arrows: true, // boolean
    counter: true, // boolean
    slideSpeed: 500,
    container: 'gallery3'
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

  function slideSection(e) {
    e.preventDefault();
    var ribbonBtn = e.target;
    var doodleContainer = ribbonBtn.parentNode;
    var containersList = doodleContainer.querySelectorAll('.doodle-item__container');
    containersList[0].classList.toggle('doodle-item__container_translate_left');
    containersList[1].classList.toggle('doodle-item__container_translate_right');
    ribbonBtn.classList.toggle('doodle-item__ribbon_active');
    ribbonBtn.querySelectorAll('.doodle-item__triangle').forEach(function (item) {
      item.classList.toggle('doodle-item__triangle_rotate_180');
    });
  }

  document.querySelectorAll('.doodle-item__ribbon').forEach(function (ribbon) {
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

  var contactForm = document.getElementById("contact-form");
  var nameField = document.getElementById("name");
  var emailField = document.getElementById("email");
  var textField = document.getElementById("message");
  var formBtn = document.getElementById("submit-btn");

  var validRegExp = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^[а-яА-яіІЇїЄєґҐёЁA-Za-z]+$/
  };

  var hasError = function hasError(field) {
    if (field.type === "button" || field.type === "submit") {
      return;
    }

    var emailTest = validRegExp.email.test(field.value);
    var nameTest = validRegExp.name.test(field.value);

    if (field.value === "") {
      return "Пожалуйста заполните поле";
    }
    if (field.name === "name" && !nameTest) {
      return "Вы ввели неправильное имя";
    }
    if (field.name === "email" && !emailTest) {
      return "Вы ввели неправильный email";
    }
  };

  var showError = function showError(field, error) {
    field.classList.add("form-error");
    var id = field.id || field.name;

    if (!id) return;
    var message = field.form.querySelector(".error-message#error-for-" + id);

    if (!message) {
      message = document.createElement("div");
      message.className = "error-message";
      message.id = "error-for-" + id;
      field.parentNode.insertBefore(message, field.nextSibling);
    }

    field.setAttribute("aria-describedby", "error-for-" + id);

    message.innerHTML = error;

    message.style.display = "block";
    message.style.visibility = "visible";
  };

  var removeError = function removeError(field) {
    field.classList.remove("form-error");
    field.removeAttribute("aria-describedby");

    var id = field.id || field.name;
    if (!id) return;

    var message = field.form.querySelector(".error-message#error-for-" + id);
    if (!message) return;

    message.innerHTML = "";
    message.style.display = "none";
    message.style.visibility = "hidden";
  };

  contactForm.addEventListener("blur", function (event) {
    var error = hasError(event.target);
    if (error) {
      showError(event.target, error);
      return;
    }
    removeError(event.target);
  }, true);

  document.addEventListener("submit", function (event) {
    var fields = event.target.elements;
    var fieldsLen = fields.length;

    var error, hasErrors;
    for (var i = 0; i < fieldsLen; i++) {
      error = hasError(fields[i]);
      if (error) {
        showError(fields[i], error);
        if (!hasErrors) {
          hasErrors = fields[i];
        }
      }
    }

    if (hasErrors) {
      event.preventDefault();
      hasErrors.focus();
    }
  });
})(window, document);
//# sourceMappingURL=myown.js.map
