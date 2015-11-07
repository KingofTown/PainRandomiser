$(document).ready(function(){
	
	// Fade in button
	$('.pushme').fadeIn(500);
	$('.viewall').fadeIn(1000);
	
	// Load history
	cards.loadHistory();
	
	// Load all cards
	cards.loadAll();
	
	// CLICKZ
	// Genrate card on button click
	$('.pushme').click(function(){
		cards.rolled = true;
		$('.allcards').fadeOut(200);
		cards.avoidunlucky = false;
		cards.loadHistory();
		cards.generate();
	});
	
	$('.viewall').click(function(){
		$('.allcards').fadeIn(300);
	});
	
	$('.view-all-close').click(function(){
		$('.allcards').fadeOut(200);
	});
	
	$('.button-unlucky').click(function(){
		cards.avoidunlucky = false;
		cards.percentages.curse = 200;
		
		if (cards.rolled) {
			$('.pushme').click();
		} else {
			$('.refate').click();
		}
		setTimeout(function() {
			cards.percentages.curse = 3;	
			console.log("Unlucky Roll Percentage Reset");
		},3000);
	});
	
	$('.button-goodbye').click(function(){
		cards.percentages.leave = 200;

		if (cards.rolled) {
			$('.pushme').click();
		} else {
			$('.refate').click();
		}
		setTimeout(function() {
			cards.percentages.leave = 3;	
			console.log("Leave Card Percentage Reset");
		},3000);
	});
	
	var tab = 'questcards';
	$('.allcards-button').click(function(){
		var clicked = $(this).data('tab');
		$('.' + tab).removeClass('allcards-selected');
		$('.' + clicked).addClass('allcards-selected');
		$('.viewall-list-' + tab).fadeOut(200);
		setTimeout(function() { 
			$('.viewall-list-' + clicked).fadeIn(200);
		},250);
		tab = clicked;
	});
	
	var reflate_clicked = false;
	$('.refate').click(function(){
		if (!reflate_clicked) 
		{
			cards.avoidunlucky = false;
			
			// Animate
			reflate_clicked = true;
			$('.refate, .failed').stop().fadeOut(200);
			$('.card1, .card2, .card3').stop().fadeOut(500);
			
			setTimeout(function() {

				// If was unlucky
				if (cards.unlucky) {
					$('.refate').stop().fadeOut(200);
					cards.unlucky = false;
					cards.avoidunlucky = true;
				}
				
				// Reset margins
				$('.card1').css({'margin-left':0});
				$('.card2').css({'margin-right':0});
				$('.refate').animate({'margin-top':280},500);
			
				// Set Timeout 
				setTimeout(function() {
					cards.loadHistory();
					cards.generate();
				}, 250);
				
			},600);
		}
		
		setTimeout(function(){ reflate_clicked = false; }, 1500);
	});
	
	$('.failed').click(function()
	{
		cards.avoidunlucky = true;
		
		if (cards.unlucky) {
			$('.card3').fadeOut(300);
			$('.failed').stop().fadeOut(300);
			$('.refate').removeClass('refate-unlucky').css({'margin-top':450, 'margin-left':280}).stop().animate({'margin-left':370},500);
			
			setTimeout(function() {
				cards.generate(true);
			},500);
		} else {
			// Fade out failed
			$('.failed').stop().fadeOut(400);
			
			// Move cards left
			$('.card1').animate({'margin-left':-110},500);
			$('.card2').animate({'margin-right':-115},500);
			$('.card3').animate({'margin-top':150},500);
			$('.refate').animate({'margin-top':580},500);

			// Generate Card
			setTimeout(function() {
				cards.generate(true);
			},550);
		}
	});
	
	// Chroma
	$('.button-chroma').click(function() {
		
		$('html').css({
			'background-image':'none',
			'background-color':'#0000FF',
		});
		
		$('.logo').hide();
	});
	
	
	// HOVERZ
	$('.refate, .failed').hover(function(){
		$(this).stop(true,true);
		$(this).animate({opacity:1}, 300);
	}, function(){
		$(this).stop(true,true);
		$(this).animate({opacity:0.7}, 300);
	});
	
	
	// Add tooltips
	$(".tooltip").uitooltip();
});

var Cookies = {
	Expires: {
		default: 365	
	},
	
	set: function(Name, Value) {
		$.cookie(Name, Value, { expires: Cookies.Expires.default });	
	},
	
	get: function(Name) {
		return $.cookie(Name);
	},
	
	getAll: function() {
		return $.cookie();
	},
	
	remove: function(Name) {
		$.removeCookie(Name);
	}		
};

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38265462-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function($){ $.fn.uitooltip = function(){
	return this.each(function() {
		var text = $(this).data("tooltip");
		
		if(text != undefined) {
			$(this).hover(function(e){
				$("#tooltip-style").remove();
				var text = $(this).data("tooltip");
				var tipX = e.pageX + 5;
				var tipY = e.pageY + 5;
				$("body").append("<div id='tooltip-style' style='position: absolute; z-index: 9999; display: none;'>" + text + "</div>");
				var tipWidth = $("#tooltip-style").width()
				$("#tooltip-style").width(tipWidth);
				$("#tooltip-style").css("left", tipX).css("top", tipY).show();
			}, function(){
				$("#tooltip-style").remove();
			});
			$(this).mousemove(function(e){
				var tipX = e.pageX + 12;
				var tipY = e.pageY + 12;
				var tipWidth = $("#tooltip-style").outerWidth(true);
				var tipHeight = $("#tooltip-style").outerHeight(true);
				if(tipX + tipWidth > $(window).scrollLeft() + $(window).width()) tipX = e.pageX - tipWidth;
				if($(window).height()+$(window).scrollTop() < tipY + tipHeight) tipY = e.pageY - tipHeight;
				$("#tooltip-style").css("left", tipX).css("top", tipY).show();
			});
		}
	});
}})(jQuery);

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


