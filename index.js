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

	//split and setup vars
	var args = dice.split('D');
	var sub = args[1].split('+');
	var results = '';
	var total = 0;	
		
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
	
		//If we're only rolling 1d#, handle it.
		if(Number(args[0]) === 1 || args[0] = null){
			results = "Rolled: " + (Number(RandNumber(args[1]) + Number(sub)));
		}else{
			//handling for rolling more than 1 dice.
			for(var i=0; i < Number(args[0]); i = i+1){
				var hold = 0;
			
			// I want to clean this up. We're adding a lot
			// of execution time here.
			// The else is run first time through to avoid
			// adding in a ', ' before the first roll
				if(i>0){
					hold = RandNumber(args[1]);
					total = total + hold;
					results = results + ', '+ hold.toString(10);
				}else{ 
					results = RandNumber(args[1]);
					total = results;
					 }
		}
	var jssucks = parseInt(total);

	total = jssucks + parseInt(sub);
	results = 'Total: ' + total.toString(10) + ', Rolls:' + results;
	}
	
	return results;
}

function RandNumber(lim, str){
	
		str = str || false;
		var randvalue = 0;
		randvalue = Math.floor(Math.random() * lim)+1;
		
		if(str){
			return randvalue.toString(10);
		}
		return randvalue;
}
