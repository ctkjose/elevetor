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

var elevatorManager = {
	items: {},
	init: function(options){
		console.log("@elevator_manager::init()");
		this.consoleSel = options;
		return this;
	},
	startService: function(){
		
	},
	manageElevator: function(elv){
		this.items[elv.code] = elv;
		
		
	},
	getAvailableElevator: function(location){
		var elvs = [];
		
		for(var k in this.items){
			var elv = this.items[k];
			if(elv.status >= this.elevator.kStatusOutOfService) continue;
		}
		
		return elvs;
	},
	callButton: function(location, floor, dir){
				
	},
	elevator: {
		kStatusIdle: 0,
		kStatusTraveling: 1,
		kStatusOutOfService: 100,
		kDirectionUp: 1,
		kDirectionDown: 2,
		create: function(options){
			var defaults = {
				code: "RANDELV",
				location: "GENERAL",
				floorServiceStart: 1,
				floorServiceEnd: 10,
			};
				
		
			var elv = {
				status: this.kStatusOutOfService,
				travelDirection: this.kDirectionUp,
				ops: helper.extend(defaults, options),
			};
			this.decorate(elv);
			return elv;
				
		},
		decorate: function(obj){
			for(var key in this.fn){
				obj[key] = this.fn[key];
			}
		},
		fn: {
			
			callButton: function(floor, dir){
				
			},
			canTravel: function(floor, dir){
				if(this.status >= kStatusOutOfService ) return false;
			}
			
		},
	},
	
}