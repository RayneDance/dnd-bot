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


           case 'roll':

	      if(dice){
              bot.sendMessage({
                 to: channelID,
                 message: dice
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
