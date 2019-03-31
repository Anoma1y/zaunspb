import "../assets/scss/style.scss";

const init = () => {
  const dataSrc = document.querySelectorAll('div[data-src]');
  const bgStyle = "background-image: url({url}); animation-name: fade; animation-duration: 1s";

  dataSrc.forEach((item) => {
    item.setAttribute('style', bgStyle.replace("{url}", item.getAttribute('data-src')));
  })
};

document.addEventListener('DOMContentLoaded', init);

$(function () {
	//smoothscroll
	$('.main-menu a[href^="#"], p.menu > a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");

		var target = this.hash,
		    menu = target;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top + 2
		}, 500, 'swing', function () {
			window.location.hash = target;
		});
	});
	//Mobile Menu
	$('#mobile-trigger').bind('click', function (e) {
		$(this).toggleClass('active');
		e.preventDefault();
		$('.menu-main-overlay').fadeIn('400', function () {
			$('#menu-open').toggleClass('active');
			$('.menu-main-wrap').toggleClass('active');
			$('.menu-effect_1').toggleClass('active');
		});
	});

	$('.menu-main-overlay').bind('click', function () {
		$('.menu-main-overlay').fadeOut('400', function () {
			$('#menu-open').removeClass('active');
			$('#icon-toggle').removeClass('active');
			$('.menu-main-wrap').removeClass('active');
			$('.menu-effect_1').removeClass('active');
		});
	});
	var imageOverlay = $('<div id="overlay"></div>');
	var overlayImg = $("<img>");

	imageOverlay.append(overlayImg);

	$("body").append(imageOverlay);

	$('.instruction img').on('click', function () {
		var imgSrc = $(this).attr("src");

		overlayImg.attr("src", imgSrc);
		imageOverlay.fadeIn('400');
	});

	$('.gallery-panel img').on('click', function () {
		var imgSrc = $(this).attr("src");

		overlayImg.attr("src", imgSrc);
		imageOverlay.fadeIn('400');
	});

	//Display none for overlay
	$("#overlay").click(function () {
		$("#overlay").fadeOut('400');
	});
	var checkEmail = false;
	var checkName = false;
	var checkText = false;
	$('#form-email').on('blur', function (e) {
		if ($(this).val() != '') {
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			if (pattern.test($(this).val())) {
				$(this).css({ 'border': '1px solid #569b44' });
				checkEmail = true;
				$('#error').css('opacity', 0);
			} else {
				$(this).css({ 'border': '1px solid #ff0000' });
				checkEmail = false;
				$('#error').css('opacity', 1);
				$('#error').text('Укажите правильный адрес E-mail');
			}
		} else {
			$(this).css({ 'border': '1px solid #ff0000' });
			checkEmail = false;
			$('#error').css('opacity', 1);
			$('#error').text('Укажите почту');
		}
	});
	$('#form-name').on('blur', function (e) {
		if ($(this).val() != '') {
			$(this).css({ 'border': '1px solid #569b44' });
			checkName = true;
			$('#error').css('opacity', 0);
		} else {
			$(this).css({ 'border': '1px solid #ff0000' });
			checkName = false;
			$('#error').css('opacity', 1);
			$('#error').text('Укажите имя');
		}
	});
	$('#form-text').on('blur', function (e) {
		if ($(this).val().length >= 20) {
			$(this).css({ 'border': '1px solid #569b44' });
			checkText = true;
			$('#error').css('opacity', 0);
		} else {
			$(this).css({ 'border': '1px solid #ff0000' });
			checkText = false;
			$('#error').css('opacity', 1);
			$('#error').text('Сообщение должно быть больше 20 символов');
		}
	});
	$('#form-name, #form-email').on('keypress', function (e) {
		e = e || window.event;
		if (e.keyCode == 13 || e.which == 13) {
			e.preventDefault() ? e.preventDefault() : e.returnValue = false;
		}
	});
	//Ajax send email
	$('#sendEmailBtn').on('click', function (e) {
		e.preventDefault();
		var formArray = $('#sendEmailForm').serializeArray();
		var name = $('#form-name').val();
		var email = $('#form-email').val();
		var text = $('#form-text').val();
		if (checkEmail === true && checkName === true && checkText === true) {
			$.ajax({
				url: 'email.php',
				type: 'POST',
				data: {
					name: name,
					email: email,
					text: text
				}
			}).done(function () {
				$('#sendEmailBtn').fadeOut('400');
				setTimeout(function () {
					$('#sendEmailBtn').after('<h2 class="sendOk">Отправлено</h2>');
				}, 250);
			}).fail(function () {
				$('#error').css('opacity', 1);
				$('#error').text('Ошибка при отправке');
				$('#sendEmailBtn').val("Отправить");
			}).always(function () {
				$('#sendEmailBtn').val("Отправка");
			});
		} else {
			if (!checkEmail) {
				$('#form-email').css({ 'border': '1px solid #ff0000' });
			} else {
				$('#form-email').css({ 'border': '1px solid #569b44' });
			}
			if (!checkName) {
				$('#form-name').css({ 'border': '1px solid #ff0000' });
			} else {
				$('#form-name').css({ 'border': '1px solid #569b44' });
			}
			if (!checkText) {
				$('#form-text').css({ 'border': '1px solid #ff0000' });
			} else {
				$('#form-text').css({ 'border': '1px solid #569b44' });
			}
			$('#error').css('opacity', 1);
			$('#error').text('Заполните все поля');
		}
	});

	// Slideshow 
	$("#slider1").responsiveSlides({
		maxwidth: 100,
		speed: 800
	});
});