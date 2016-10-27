/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	$(document).ready(function(){
	$(window).scroll(function(){
		$('.hideme').each(function(i){
			var bottomOfObject = $(this).offset().top+$(this).outerHeight();
			var bottomOfWindow = $(window).scrollTop()+$(window).height();
			if(bottomOfWindow>bottomOfObject) {
				if($(this).hasClass('doodle-item-content')){
					$(this).animate({'right':'0'});
					$(this).animate({'opacity':1});
				}
					$(this).animate({'left':'0'},700);
					$(this).animate({'opacity':'1'},700);
			}
		});
	});

	$('.preview').hide();
	$('.doodle-item-ribbon a').click(function(e){
				e.preventDefault();
				var i=1;
				var container = $(this).parent().parent();		
				var items = container.find('.doodle-container');
				var frstChild=items.eq(0);
				var secChild =items.eq(1);
				var elem = container.find('.preview');
				var containerPreview = elem.parent();
				frstChild.toggleClass('clicked');
				secChild.toggleClass('clicked-two');
				$(this).parent().toggleClass('clicked-ribbon');
				$(this).children().toggleClass('rotate');
					
	setTimeout(function () {
			container.toggleClass('full');}, 800);	
			$(window).scroll(function(){
				console.log($('.full').scrollTop());

			//console.log($(this).scrollTop());
			//console.log(container.offset().top);
		});


		setTimeout(function(){
			elem.each(function(){
						if($(this).css('display')==='none'){
							$(this).fadeIn(i*300);
						}
					i++;				
				});
		}, 800);	
				i=1;
			});
	});




/***/ }
/******/ ]);