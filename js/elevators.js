/*
 *
 * Elevetors Manager and Controller
 */

var helper = {
	extend: function(a, b){
		for(var key in b){
			if(b.hasOwnProperty(key))
				a[key] = b[key];
		}
		return a;
	}
}

var elevator_manager = {
	init: function(options){
		console.log("@elevator_manager::init()");
		this.consoleSel = options;
		return this;
	},
	startService: function(){
		
	},
	createElevator: function(options){
		var defaults = {
			code: "RANDELV",
			floorServiceStart: 1,
			floorServiceEnd: 2,
		};
	},
	manageElevator: function(elv){
		
	}
}