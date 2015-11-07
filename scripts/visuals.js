var cards = {
	
	rolled: false,
	unlucky: false,
	hadunlucky: false,
	avoidunlucky: true,
	curseduration: null,
	
	card1: null,
	card2: null,
	card3: null,
	
	// 3/200 aka 1.5%
	percentages: {
		leave: 3,
		curse: 3,
	},
	
	generate: function(punish)
	{
		if (!cards.unlucky) 
		{
			// Fade out the button
			$('.pushme').animate({ 'margin-top': -30, opacity: 0 }, 500, 'swing', function() { $('.pushme').css({'margin-top': 50}); });
			$('.logo').fadeIn(500);
			$('.viewall').fadeOut(200);
			$('.push').fadeOut(500);
			$('.allcards').fadeOut(200);
			$('.card1').removeClass('card1-unlucky');
			$('.card2').removeClass('card2-unlucky');
			$('.refate').removeClass('refate-unlucky');
			$('.failed').removeClass('failed-unlucky');
			$('.refate').css({'margin-left':362});
		}
		
		// How lucky are you?
		var luck = Math.floor(Math.random() * 199);
		if (luck < cards.percentages.curse)  { cards.unlucky = true; }
		
		// If lucky or not
		if (!cards.avoidunlucky && cards.unlucky && !cards.hadunlucky)
		{
			$('.card3').css('margin-top',0);
			
			cards.hadunlucky = true;
			$('.refate').stop().fadeOut(300);
			$('.failed').stop().fadeOut(300);
			$('.card1, .card2').stop().fadeOut(200);
			
			$('.head').fadeIn(100);
			$('.logo').fadeOut(500);
			setTimeout(function(){
				$('.head').animate({
					'margin-top':110
				},2000);
			}, 500);
			
			setTimeout(function(){
				$('.ha1').fadeIn(300);
				$('.ha2').fadeIn(900);
				$('.ha3').fadeIn(1500);
				
			},2000);
			
			setTimeout(function(){
				$('.ha1').fadeOut(300);
				$('.ha2').fadeOut(900);
				$('.ha3').fadeOut(1500);
				
			},3500);
			
			setTimeout(function(){
				
				$('.card1').css({'margin-left':-110});
				$('.card2').css({'margin-right':-115});
				$('.card3').css({'margin-top':-10});
				
				Cookies.remove('dontstarve-dsakamb-card1');
				Cookies.remove('dontstarve-dsakamb-card2');
		
				// Two cursed cards
				var ranum = Math.floor(Math.random() * Cards.Curses.length);
				cards.card1 = ranum;
				var data = Cards.Curses[ranum];
				$('.card1').addClass('card1-unlucky');
				cards.show('card1', data, 'curse');
				
				var ranum = Math.floor(Math.random() * Cards.Curses.length);
				cards.card2 = ranum;
				var data = Cards.Curses[ranum];
				$('.card2').addClass('card2-unlucky');
				cards.show('card2', data, 'curse');
				
				$('.head').fadeOut(300);
				setTimeout(function() { 
					$('.head').css({'margin-top':1});
				},500);
				
				var ranum = Math.floor(Math.random() * Cards.Quests.length);
				var data = Cards.Quests[ranum];
				cards.show('card3', data, 'quest');
				
				$('.refate').fadeIn(500);
				$('.refate').addClass('refate-unlucky');
				
				$('.failed').fadeIn(500);
				$('.failed').addClass('failed-unlucky');
				
			},5000);
		}
		else
		{
			cards.unlucky = false;
			cards.hadunlucky = false;
			setTimeout(function() 
			{
				if (punish) 
				{
					Cookies.remove('dontstarve-dsakamb-card3');
					
					// Card 1 Cursed
					var ranum = Math.floor(Math.random() * Cards.Curses.length);
					cards.card3 = ranum;
					
					// Reroll if same
					if (cards.card2 == cards.card3) {
						ranum = Math.floor(Math.random() * Cards.Curses.length);
					}
					
					// print
					var data = Cards.Curses[ranum];
					cards.show('card3', data, 'curse');
				}
				else
				{
					// Clean Cookies
					Cookies.remove('dontstarve-dsakamb-card1');
					Cookies.remove('dontstarve-dsakamb-card2');
					Cookies.remove('dontstarve-dsakamb-card3');
					
					cards.curseduration = null;
					
					// How lucky are you? 3 in 200 chance. (0.15%)
					var timetogo = Math.floor(Math.random() * 199);
					
					// Card 1
					var ranum = Math.floor(Math.random() * Cards.Quests.length);
					cards.card1 = ranum;
					var data = Cards.Quests[ranum];
					cards.show('card1', data, 'quest', timetogo);
					
					// Card 2
					var ranum = Math.floor(Math.random() * Cards.Curses.length);
					cards.card2 = ranum;
					var data = Cards.Curses[ranum];
					cards.show('card2', data, 'curse');
					
					setTimeout(function() {
						$('.refate').fadeIn(300);
						$('.failed').fadeIn(300);
					}, 200);
				}
			}, 
			700);
		}
	},
			
	show: function(Class, card, type, timetogo)
	{
		// Format Data
		var Title 		= card[0];
		var Flavour 	= card[1];
		var Action 		= card[2];
		var Days 		= card[3];
		var Img 		= card[4];
		var Additional 	= card[5];
		
		// Check for additional data
		if (Additional) 
		{
			var ranum = Math.floor(Math.random() * Additional.length);
			Additional = Additional[ranum];
			Title 	= Title.replace('[]', Additional);
			Flavour = Flavour.replace('[]', Additional);
			Action 	= Action.replace('[]', Additional);
		}
		
		// Pick a random day
		if (Days) 
		{
			var SetDays = Math.floor(Math.random() * Days.length);
			SetDays = Days[SetDays];
			cards.curseduration = SetDays;
			
			if (cards.curseduration) {
				SetDays = cards.curseduration;
			}
			
			var DaysText = "day";
			if (SetDays > 1) { DaysText = "Days"; }
			var DaysDisplay = '<div class="shadow card-sun-num">' + SetDays + '</div><div class="shadow card-sun-text">' + DaysText + '</div>';
			
		} 
		else 
		{
			SetDays = 'Quest!';
			var DaysDisplay = '<div class="shadow card-sun-num" style="margin-top:35px;">!</div>';
		}
		
		// Save card in cookies
		Cookies.set('dontstarve-dsakamb-'+ Class, [Title, Flavour, Action, SetDays, Img].join('|'));
		
		// Set heading text
		var ActionText = type.toUpperCase();
		
		// Output card
		if (timetogo < cards.percentages.leave) {
			$('.' + Class).html('<div class="card-frame card-leave"></div>');
		} else {
			$('.' + Class).html('<div class="card-frame card-frame-'+ type +'"></div><div class="shadow card-task-title card-task-title-'+ type +'">'+ Title +'</div><div class="card-image" style="background-image:url(cards/'+ Img +');"></div><div class="card-sun">' + DaysDisplay + '</div><div class="card-task"><div class="shadow card-task-flavor">' + Flavour + '</div><div class="shadow card-task-action"><div class="action-text action-text-'+ type +'">'+ ActionText +'</div>' + Action + '</div>');
		}
		$('.' + Class).fadeIn(500);
	},
	
	addhistory: function(card)
	{
		// Format Data
		var Title 	= card[0];
		var Flavour = card[1];
		var Action 	= card[2];
		var Days 	= card[3];
		var Img 	= card[4];
		
		// Tooltip
		var Tooltip = cards.createTooltip(card);

		// Append
		$('.card-history').append('<div class="tooltip footer-image" style="background-image:url(cards/'+ Img +');" data-tooltip="' + Tooltip + '"><div class="footer-days">' + Days + '</div></div>');
	},
	

	loadHistory: function(Total)
	{
		var data1 = Cookies.get('dontstarve-dsakamb-card1');
		var data2 = Cookies.get('dontstarve-dsakamb-card2');
		var data3 = Cookies.get('dontstarve-dsakamb-card3');

		$('.card-history').html('');
		if (data1 && data2)
		{
			$('.closebutton').fadeIn(200);
			cards.addhistory(data1.split('|'));
			cards.addhistory(data2.split('|'));
			if (data3) {
				cards.addhistory(data3.split('|'));	
			}
			$(".tooltip").uitooltip();
		}
		else 
		{
			$('.card-history').html('<div style="color:#666;">Your last decided fate will appear here.</div>');	
		}
		

	},
	
	setHistoryTotal: function(Total)
	{
		cards.historyTotal = Total;		
	},
	
	clearHistory: function()
	{
		var data = Cookies.remove('dontstarve-dsakamb-card1');
		var data = Cookies.remove('dontstarve-dsakamb-card2');
		
		$('.card-history').fadeOut(200);
		$('.closebutton').fadeOut(200);
		setTimeout(function() {
			$('.card-history').html('<div style="color:#666;">Your last decided fate will appear here.</div>');	
			$('.card-history').fadeIn(200);
		}, 350);
	},
	
	// Function loads all cards into the "View All Fates" window.
	loadAll: function()
	{
		// Fill fates table
		for (var i = 0; i < Cards.Quests.length; i++) 
		{
			// Get Card
			var card = Cards.Quests[i];
			
			// Set Data
			var Title 	= card[0];
			var Flavour = card[1];
			var Action 	= card[2];
			var Days 	= card[3];
			var Img 	= card[4];
			
			// Tooltip
			var Tooltip = cards.createTooltip(card);
			
			// Append
			$('.viewall-list-questcards').append('<span class="card-block tooltip" data-tooltip="' + Tooltip + '">' + Title + '</span>');
		}
		
		for (var i = 0; i < Cards.Curses.length; i++) 
		{
			// Get Card
			var card = Cards.Curses[i];
			
			// Set Data
			var Title 	= card[0];
			var Flavour = card[1];
			var Action 	= card[2];
			var Days 	= card[3];
			var Img 	= card[4];
			
			// Tooltip
			var Tooltip = cards.createTooltip(card);
			
			// Append
			$('.viewall-list-cursecards').append('<span class="card-block tooltip" data-tooltip="' + Tooltip + '">' + Title + '</span>');
		}
	},
	
	createTooltip: function(card)
	{
		// Format Data
		var Title 	= card[0];
		var Flavour = card[1];
		var Action 	= card[2];
		var Days 	= card[3];
		var Img 	= card[4];
		
		// Set Days
		if (Days) {
			daysdisplay = '<strong>' + Days + '</strong> day';
			if (Days > 1 ) {
				daysdisplay = daysdisplay + 's';	
			}
		} else {
			daysdisplay = 'Quest!';	
		}
		
		Flavour = Flavour.replace('[]', '[random]');
		Action = Action.replace('[]', '[random]');
		
		// Return tooltip
		return "<div><img src=\'cards/"+ Img +"\' style=\'width:100%;margin-bottom:10px;\' /></div><div class=\'card-task-title2\' style=\'font-size:22px;\'>" + Title + "</div><div style=\'padding:0 0 3px 3px;font-size:12px;color:#6986A3;'><strong>" + daysdisplay + "</strong></div><div class=\'card-task-detail\' style=\'padding:8px 3px 5px 3px;font-size:13px;opacity:0.5;letter-spacing:1px;\'>" + Flavour + "</div><div class=\'card-task-detail\' style=\'padding:8px 3px 0 3px;font-size:13px;letter-spacing:1px;\'>" + Action + "</div>";
	},
	
}