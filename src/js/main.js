/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/*
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/** Header */
	$('.header').each(function () {
		$('.menu', this).prepend('<span class="toggle"></span>')
	});

	$('.about').each(function(){
		$('.list', this).slick({
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
		});
	});

});