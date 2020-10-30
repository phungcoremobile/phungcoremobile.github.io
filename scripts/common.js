// トップページのFirst Viewスライダー用

$(window).on("load",function(){
	var photoSlider = ".Slider__top,.interior_model-room--slider .main";
	var thumbnailItem = ".Slider__dots li,.interior_model-room--slider .dot li";
	var itemCount = $(thumbnailItem).length;
	$(thumbnailItem).each(function(){
		var index = $(thumbnailItem).index(this);
		$(this).attr("data-index",index);
	});
	$(photoSlider).on('init',function(slick){
		var index = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
		$(thumbnailItem+'[data-index="'+index+'"]').addClass("active");
	});
	$(photoSlider).slick({
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
	});
	$(thumbnailItem).on('click',function(){
		var index = $(this).attr("data-index");
		$(photoSlider).slick("slickGoTo",index,false);
	});
	$(photoSlider).on('beforeChange',function(event,slick, currentSlide,nextSlide){
		$(thumbnailItem).each(function(){
			$(this).removeClass("active");
		});
		$(thumbnailItem+'[data-index="'+nextSlide+'"]').addClass("active");
	});
});




// work-detail-sliderスライダー用
$(document).ready(function(){
	var slider = $('.work-detail-slider').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow: '<img src="../../assets/img/works/detail/pre-arrow.png" class="prev-arrow">',
		nextArrow: '<img src="../../assets/img/works/detail/next-arrow.png" class="next-arrow">',
		dots: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				centerMode: false,
				variableWidth: false,
				arrows: false,
				dots: false,
			}
		}]
	});

	// スライダーの小さいサイズ画像用
	$('.work-detail-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		// console.log(currentSlide);
		$('.work-detail-slider__dots li').removeClass("active");
		$('.work-detail-slider__dots li[data-target='+currentSlide+']').addClass("active");
	});

	$('.work-detail-slider__dots li').click(function(){
		var number =$(this).attr('data-target');
		$('.work-detail-slider').slick('slickGoTo',number);
	});
});

// トップページのWorksスライダー用
$(document).ready(function(){
	var slider = $('.Top__works__Slider').slick({
		autoplay: true,
		variableWidth: true,
		slidesToShow: 3,
		slidesScroll: 1,
		autoplaySpeed: 3000,
		arrows: true,
		dots: false,
		prevArrow: '<img src="./assets/img/service/interior/preview.png" class="prev-arrow">',
		nextArrow: '<img src="./assets/img/service/interior/next.png" class="next-arrow">',
		responsive: [{
			breakpoint: 1200,
			settings: {
				centerMode: true,
				slidesToShow: 1,
				variableWidth: true,
				arrows: false,
				dots: false,
			}
		}]
	});
});
$(document).ready(function(){
	var slider = $('.iselco__works__Slider').slick({
		autoplay: true,
		variableWidth: true,
		slidesToShow: 3,
		slidesScroll: 1,
		autoplaySpeed: 1000,
		arrows: false,
		dots: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				centerMode: false,
				slidesToShow: 2,
				variableWidth: false,
				arrows: false,
				dots: false,
			}
		}]
	});
});

$(function(){
	// ページのトップに戻る
	var btn = $('.gotop__button');
	$(window).scroll(function(){
		if ($(window).scrollTop() > 300){
			btn.addClass('show');
		}else{
			btn.removeClass('show');
		}
	});

	// SP版のメニュー
	$(".Sp__menu").click(function(){
		$(this).closest('dd').toggleClass("active");
		$(this).closest('body').toggleClass("bg");
	});

	$(".Sp__menu").click(function(){
		if($(".header_ol.sp").is(":visible")){
			$(this).closest('body').find(".header_ol.sp").hide();
			$(this).closest('body').find(".header_ul.sp li").removeClass("active");
		};
	})
	$(".header_ol.sp li a").click(function(){
		$(this).closest(".header_dd").removeClass("active");
		$(this).closest(".header_ul.sp").toggleClass("active");
		$(this).closest("body").removeClass("bg");
	})
	//
	$(".header_ul.sp .service,.header_ul.sp .about").click(function(){
		$(this).toggleClass("active");
		$(this).find("ol").slideToggle();
	});


	// object_fit_img
	objectFitImages('img.object_fit_img,img.object-fit-img');

	// service_interiorページのQA用
	$(".interior__QA .question").click(function(){
		$(this).next(".answer").slideToggle();
		$(this).closest("li").toggleClass("active");
	});
	$(".pulldown_title").click(function(){
		$(this).next(".pulldown_content").slideToggle();
		$(this).closest(".pulldown_style01").toggleClass("active");
	});
});

// service_interiorページのスライダー用
$(document).ready(function(){
	var slider = $('.interior__banner').slick({
		autoplay: true,
		variableWidth: true,
		slidesToShow: 1,
		slidesScroll: 1,
		autoplaySpeed: 1000,
		arrows: true,
		prevArrow: '<img src="../assets/img/service/interior/preview.png" class="prev-arrow">',
		nextArrow: '<img src="../assets/img/service/interior/next.png" class="next-arrow">',
		dots: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			}
		}]
	});
});

// property page
$(function(){
	$('.property_aticle:eq(0)').show();
	$('.property_search_nav li').click(function() {
	  $('.property_search_nav li').removeClass('active');
	  $(this).addClass('active');
	  var n = $('.property_search_nav li').index(this);
	  $('.property_aticle').hide();
	  $('.property_aticle:eq('+ n +')').fadeIn(300);
	});
  });

$(function(){
	
	$(window).resize(function () {
		var w=$(window).width();
		if( w < 1200 ){
			$(".header_ul.sp li a").unbind('mouseenter').unbind('mouseleave')
		}else{
			$(".header_dd").removeClass("active");
			$("body").removeClass("bg");
		}
	})

});


// 物件一覧に入る前のログイン画面
$(function(){
	$(".property-login_bgr,.property-close_button").click(function(){
		$(this).closest(".property-login").hide();
	})
});

// スクロール時出てくるアニメーション
$(window).scroll(function (){
	$('.fadein,.u-animation').each(function(){
			var elemPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > elemPos - windowHeight + 200){
					$(this).addClass('active');
			}
	});
});

// fix show menu
$(function(){
	if($('.company_select-block'.length)){
		$('.company_select li').removeClass('active');
		$('.company_selected_detail article').removeClass('active');
		var current_url = window.location.href;
		if(current_url.indexOf('company_info') != -1){
			$('#company_info').addClass('active');
			$('#company011').addClass('active');
		}
		else{
			if(current_url.indexOf('company_accept') != -1){
				$('#company_accept').addClass('active');
				$('#company022').addClass('active');
			}
			else{
				if(current_url.indexOf('company_employ') != -1){
					$('#company_employ').addClass('active');
					$('#company033').addClass('active');
				}
				else{
					$('#company_info').addClass('active');
					$('#company011').addClass('active');
				}
			}
		}
	}
});

// headerの会社概要をクリック時
$(function(){
	var ac=$('.active_tap li a');

	for(var i=0;i<ac.length;i++){
		// console.log(i)
		$('.active_tap li:eq('+ i +')').click(function() {
			var a=$('.active_tap li').index(this);
			console.log(a)
			$('.company_select-click').removeClass('active');
			$('.company_select-click:eq('+ a +')').addClass('active');
			$('.company_select-show').hide();
			$('.company_select-show:eq('+ a +')').fadeIn(300);
		})
	}
});

// company page
$(function(){
	$('.company_select-click').click(function() {
	  $('.company_select-click').removeClass('active');
	  $(this).addClass('active');
	  var n = $('.company_select-click').index(this);
	  $('.company_select-show').hide();
	  $('.company_select-show:eq('+ n +')').fadeIn(300);
	});
  });

// headerの会社概要をクリック時 sp
$(function(){
	var ac=$('.active_tap_sp li a');

	for(var i=0;i<ac.length;i++){
		// console.log(i)
		$('.active_tap_sp li:eq('+ i +')').click(function() {
			var a=$('.active_tap_sp li').index(this);
			// console.log(a)
			$('.company_select-click').removeClass('active');
			$('.company_select-click:eq('+ a +')').addClass('active');
			$('.company_select-show').hide();
			$('.company_select-show:eq('+ a +')').fadeIn(300);
		})
	}
});


// 事例page
// $(".select-categoryForm").each(function() {
// 	var classes = $(this).attr("class"),
// 		id      = $(this).attr("id"),
// 		name    = $(this).attr("name");
// 	var template =  '<div class="' + classes + '">';
// 		template += '<span class="select-category-trigger">' + $(this).attr("placeholder") + '</span>';
// 		template += '<div class="select-categoryOptions">';
// 		$(this).find("option").each(function() {
// 		  template += '<span class="select-categoryOption ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
// 		});
// 	template += '</div></div>';
	
// 	$(this).wrap('<div class="select-categoryWrap"></div>');
// 	$(this).hide();
// 	$(this).after(template);
//   });
//   $(".select-categoryOption:first-of-type").hover(function() {
// 	$(this).parents(".select-categoryOptions").addClass("select-categoryOption-hover");
//   }, function() {
// 	$(this).parents(".select-categoryOptions").removeClass("select-categoryOption-hover");
//   });
//   $(".select-category-trigger").on("click", function() {
// 	$('html').on('click',function() {
// 	  $(".select-categoryForm").removeClass("opened");
// 	});
// 	$(this).parents(".select-categoryForm").toggleClass("opened");
// 	event.stopPropagation();
//   });
//   $(".select-categoryOption").on("click", function() {
// 	$(this).parents(".select-categoryWrap").find("select").val($(this).data("value"));
// 	$(this).parents(".select-categoryOptions").find(".select-categoryOption").removeClass("selection");
// 	$(this).addClass("selection");
// 	$(this).parents(".select-categoryForm").removeClass("opened");
// 	$(this).parents(".select-categoryForm").find(".select-category-trigger").text($(this).text());
// 	$(this).parents(".select-categoryForm").find(".select-category-trigger").addClass('categorySelected');
//   });
  
  

