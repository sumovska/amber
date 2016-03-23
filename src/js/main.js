/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/*
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/** About carousel */
	$('.about').each(function () {
		var _list = $('.list', this),
			settings = {
				slidesToShow: 1,
				slidesToScroll: 1,
				mobileFirst: true,
				adaptiveHeight: true,
				infinite: false,
				dots: true,
				customPaging: function (slider, i) {
					return '<span class="dots" data-role="none"></span>';
				},
				arrows: false,
				responsive: [
					{
						breakpoint: 750,
						settings: 'unslick'
					}
				]
			};
		_list.slick(settings);
		$(window).on('resize', function () {
			if ($(window).width() >= 750) {
				if (_list.hasClass('slick-initialized')) {
					_list.slick('unslick');
				}
			} else {
				if (!_list.hasClass('slick-initialized')) {
					_list.slick(settings);
				}
			}
		});
	});

	/** Service carousel */
	$('.service').each(function () {
		var _list = $('.list', this),
			settings = {
				slidesToShow: 1,
				slidesToScroll: 1,
				mobileFirst: true,
				adaptiveHeight: true,
				infinite: false,
				dots: true,
				customPaging: function (slider, i) {
					return '<span class="dots" data-role="none"></span>';
				},
				arrows: false,
				responsive: [
					{
						breakpoint: 750,
						settings: 'unslick'
					}
				]
			};
		_list.slick(settings);
		$(window).on('resize', function () {
			if ($(window).width() >= 750) {
				if (_list.hasClass('slick-initialized')) {
					_list.slick('unslick');
				}
			} else {
				if (!_list.hasClass('slick-initialized')) {
					_list.slick(settings);
				}
			}
		});
	});

});