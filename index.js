var Discord = require('discord.io');
var auth = require('./auth.json');
// Configure logger settings

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.TOKEN,
   autorun: true
});
bot.on('ready', function (evt) {
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var dice = false;

        if(args.length > 1){
			dice = args[1];
		};

        args = args.splice(1);
        switch(cmd) {
		
		//Output available commands. We should clean this up.
	    case 'help':
				bot.sendMessage({
				to:channelID,
				message: 'Current commands: !roll #d#'
			});
	    break;


        case 'roll':
				if(dice){
					var result = rolldice(dice);
					bot.sendMessage({
					to: channelID,
					message: result
					});
						}else{
							bot.sendMessage({
							to: channelID,
							message: 'No dice value(IE: 1d6)'
							});
						} 
 	   break;
 
 
             // Just add any case commands if you want to..
          }
      }
});


//Function to return a dice roll.
function rolldice(dice){

	//So users can 1d6 or 1D6
	dice = dice.toUpperCase();
	
	var args = dice.split('D');
	
	if(typeof args[1] == 'undefined') args[1] = toString(args);
	
	//split out any dice modifiers
	var sub = args[1].split('+');
	var results = '';
	var total = 0;	

		// We need to split out any modifiers.
		// Sub 0 is the left side + in 2d6+2
		// Before handling this, args 1 will include 6+2
		if(sub.length > 1){
			args[1] = sub[0];
			sub = sub[1];
		}else{sub = 0;}
		
		//Leave function on poorly formatted request.
		if(isNaN(Number(args[0])) ||
		isNaN(Number(args[1])) ||
		args.length === 1 ||
		args.length > 2){
			return 'Bad format';	
		}
		
	
		//Minimizing rolls just to keep things clean
		if(Number(args[0]) > 10){
			return 'Cannot roll more than 10 dice';
		}
	
		//Leave function on uselessly high numbers
		if(Number(args[1]) > 10000){
			return 'Please submit a smaller number';
		}
	
		// If we're only rolling 1d#, handle it.
		// Do we need number in this if statement? *******************************
		if(Number(args[0]) === 1 || args[0] == ""){
			results = "Rolled: " + RandNumber(args[1]) + "+" + sub;
		}else{
			//handling for rolling more than 1 dice.
			results = RandNumber(args[1]);
			total = results;
			
			for(var i=0; i < Number(args[0]); i = i+1){
				var hold = 0;
			
				hold = RandNumber(args[1]);
				total = total + hold;
				results = results + ', '+ hold.toString(10);
				
		}
	// Long story short, I have the way JS handles these situations
	var jssucks = parseInt(total);

	total = jssucks + parseInt(sub);
	results = 'Total: ' + total.toString(10) + ', Rolls:' + results;
	}
	
	return results;
}

// Wrapping our random number generation. Takes the limit and str flag as arguments.
// If we want a number from 1 through 6, inclusive, we pass 6. If we want it returned
// as a string, we pass something truthy to str.
function RandNumber(lim, str){
	
		str = str || false;
		var randvalue = 0;
		randvalue = Math.floor(Math.random() * lim)+1;
		
		if(str){
			return randvalue.toString(10);
		}
		return randvalue;
}
