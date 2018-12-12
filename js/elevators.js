/*
 *
 * Elevetors Manager and Controller
 */

var helper = {
	extend: function(a, b){
		if(!a) a = {};
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
	manageElevator: function(elv){
		
	},
	elevator: {
		create: function(options){
			var defaults = {
				code: "RANDELV",
				floorServiceStart: 1,
				floorServiceEnd: 10,
			};
				
			var ops = helper.extend(defaults, options);
			console.log("ops are %o", ops);
				
			var elv = {};
			this.decorate(elv);
			return elv;
				
		},
		decorate: function(obj){
			for(var key in this.fn){
				obj[key] = this.fn[key];
			}
		},
		fn: {
			test1: function(){
				
			}
		},
	},
	
}