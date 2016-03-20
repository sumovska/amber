/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/*
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);


	/** Replace all SVG images with inline SVG */
	$('img.svg').each(function () {
		var $img = $(this), imgID = $img.attr('id'), imgClass = $img.attr('class'), imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			var $svg = $(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			$img.replaceWith($svg);
		}, 'xml');
	});


	/** Header */
	$('.header').each(function () {
		window.body = $('body');
		$('.toggle', this).on('click', function () {
			body.addClass('nav-visible').on('click', function () {
				if ($(this).hasClass('nav-done')) {
					$(this).removeClass('nav-done');
					setTimeout(function () {
						body.removeClass('nav-visible');
					}, 500);
				}
			});
			if (!$('body').is('.nav-done')) {
				setTimeout(function () {
					body.addClass('nav-done');
				}, 20);
			} else {
				body.removeClass('nav-done');
				setTimeout(function () {
					body.removeClass('nav-visible');
				}, 500);
			}
			return false;
		});
		$('.location', this).on('click', function (e) {
			var self = $(this), target = $(self.attr('href')), duration = 2000;
			if (!target.hasClass(open)) {
				target.addClass('open').trigger('location');
			}
			$.scrollTo(target, duration, 'swing');
			e.preventDefault();
		});
	});


	/** Navigation init */
	$('.nav').each(function () {
		$('ul', this).append('<li class="close"><a href="#">Close X</a></li>').wrap('<div class="space"></div>');
	});


	/** Article */
	$('.article').each(function () {
		$('.picture', this).each(function () {
			var pic = $('.pic-hidden', this);
			$(this).append(pic.clone().addClass('duplicate'));
		});
	});


	/** FAQ */
	$('.faq').each(function () {
		$('.entry', this).each(function () {
			var self = $(this), q = $('.question', self), a = $('.answer', self);
			$('a', this).on('click', function (e) {
				self.toggleClass('open');
				a.slideToggle(200);
				e.preventDefault();
			});
		});
	});


	/** Features Carousel */
	$('.features').each(function () {
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
						breakpoint: 568,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
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


	/** Steps Carousel */
	$('.steps').each(function () {
		var _list = $(this),
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


	/** Scrollto */
	$('.js-scroll').on('click', function (e) {
		var self = $(this), target = $(self.attr('href')), duration = 800;
		duration = Math.floor(Math.abs(self.offset().top - target.offset().top) / 3);
		if (duration < 800) {
			duration = 800
		}
		$.scrollTo(target, duration, 'swing');
		e.preventDefault();
	});


	/** Checkbox, Radiobox */
	$('.checkbox').each(function () {
		$(this).append('<span class="square"></span>');
	});
	$('.radiobox').each(function () {
		if ($('.circle', this).length === 0) {
			$(this).append('<span class="circle"></span>');
		}
	});


	/** Custom selectbox */
	$('select').selectric({
		maxHeight: 200,
		disableOnMobile: false,
		responsive: true
	});


	/** Custom selectbox */
	$('.inputfile').each(function () {
		function resultAppend(name) {
			$result.append('<li>' + name + '<a href="#" class="minus"/></li>');
		}

		function bindMinus() {
			$('.minus', $result).off('click').on('click', function (e) {
				$(this).closest('li').remove();
				e.preventDefault();
			});
		}

		var $input = $(this), $label = $input.next('label'), $result = $input.nextAll().filter('.result').eq(0);
		bindMinus();

		$input.on('change', function (e) {
			var fileName = '';
			if (this.files && this.files.length > 1) {
				fileName = this.files;
				for (var i = 0; i < this.files.length; i++) {
					resultAppend(this.files[i].name);
				}
			} else if (e.target.value) {
				resultAppend(e.target.value.split('\\').pop())
			}
			bindMinus();
		});
	});


	/** Google Map */
	$('.map').each(function () {
		var _map = $(this);

		/** Map initialization */
		window.mapInit = function () {
			if (typeof google != 'undefined') {
				var pos = new google.maps.LatLng(-28.084093, 153.441456);

				var map = new google.maps.Map(_map[0], {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: pos,
					zoom: 16,
					scrollwheel: false,
					disableDefaultUI: true,
					backgroundColor: "#d3d3d3"
				});
				var style = [{"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#d3d3d3"}]}, {"featureType": "transit", "stylers": [{"color": "#808080"}, {"visibility": "off"}]}, {
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{"visibility": "on"}, {"color": "#b3b3b3"}]
				}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]}, {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"weight": 1.8}]}, {
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [{"color": "#d7d7d7"}]
				}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#ebebeb"}]}, {"featureType": "administrative", "elementType": "geometry", "stylers": [{"color": "#a7a7a7"}]}, {
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [{"color": "#ffffff"}]
				}, {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]}, {"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#efefef"}]}, {
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [{"color": "#696969"}]
				}, {"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"visibility": "on"}, {"color": "#737373"}]}, {"featureType": "poi", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [{"visibility": "off"}]
				}, {"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{"color": "#d6d6d6"}]}, {"featureType": "road", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {}, {
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [{"color": "#dadada"}]
				}];
				var theme = new google.maps.StyledMapType(style, {name: "Grayscale"});
				map.mapTypes.set('grey', theme);
				map.setMapTypeId('grey');

				var pin = new google.maps.MarkerImage(
					'img/pin.png',
					new google.maps.Size(38, 38),
					new google.maps.Point(0, 0),
					null,
					new google.maps.Size(38, 38)
				);
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					icon: pin
				});
				google.maps.event.addDomListener(window, 'resize', function () {
					mapCenter.call(map);
				});
				mapCenter.call(map);
			}
		};

		/** Map centering */
		window.mapCenter = function () {
			var center = this.getCenter();
			google.maps.event.trigger(this, 'resize');
			this.setCenter(center);
		};

		/** Map script */
		function init() {
			$.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=en-EN&callback=mapInit');
			_map.fadeIn();
		}

		$(this).on('location', function () {
			init();
		});

		if ($(this).hasClass('open')) {
			init();
		}
	});


	/** Facebook widget */
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

});