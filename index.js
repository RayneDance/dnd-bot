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
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			
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
var results = '';
var total = 0;	
	
	//Leave function on poorly formatted request.
	if(isNaN(Number(args[0])) ||
	isNaN(Number(args[1])) ||
	args.length === 1){
		return 'Bad format';	
	}

	if(Number(args[0]) > 10){
		return 'Cannot roll more than 10 dice';
	}
	
	if(Number(args[1]) > 10000){
		return 'Please submit a smaller number';
	}

	if(Number(args[0]) === 1){
		results = Math.floor(Math.random() * args[1])+1;
	}else{
	
		for(var i=0; i < Number(args[0]); i = i+1){
			var hold = 0;
			
			if(i>0){
				hold = Math.floor(Math.random() * args[1])+1;
				total = total + hold;
				results = results + ', '+ hold.toString(10);
			}else{ 
				results = Math.floor(Math.random() * args[1])+1;
				total = results;
			     }
		}
	results = 'Total: ' + total.toString(10) + ', rolls:' + results;
	}
	
	return results;
}
