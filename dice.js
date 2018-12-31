//Nodejs module for dice rolls
exports.module.dice = {
	
	results : '',
	takeninput: '',
	dicerolls: [],
	
	roll : function(input){
		this.checkFormat(input);
		
		if(!results){ return "Improperly formatted request" ;}
		
		return results;
	}, //end roll
	
	formatResults : function(arg){
		
	}, //endformatResults
	
	// Take the raw input from user and verify the string taken fits the expected format.
	checkFormat : function(input){
	
		if(TypeOf input != 'string'){
			this.results = false;
			return;
		}
		
		this.takeninput = input.toUpperCase();
	}//end checkFormat
	
	randNumber : function(limit, flag){
		return 1;
	}//end randNumber

};
