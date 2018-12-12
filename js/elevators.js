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
			if(elv.location != location) continue;
			elvs.push(elv);
		}
		
		return elvs;
	},
	controlElevatorReachNextFloor: function(elv){
		//Report travel and status
		console.log("Reached next floor");
		console.log(elv);
	},
	callButton: function(location, floor, dir){
				
	},
	elevator: {
		kStatusIdle: 0,
		kStatusTraveling: 1,
		kStatusOutOfService: 100,
		kDirectionUp: 1,
		kDirectionDown: -1,
		create: function(options){
			var defaults = {
				code: "RANDELV",
				location: "GENERAL",
				floorServiceStart: 1,
				floorServiceEnd: 10,
			};
				
		
			var elv = {
				manager: elevatorManager, 
				status: this.kStatusOutOfService,
				floor: 0,
				travelDirection: this.kDirectionUp,
				ops: helper.extend(defaults, options),
			};
			
			elv.floor = elv.ops.floorServiceStart;
			
			this.decorate(elv);
			return elv;
				
		},
		decorate: function(obj){
			for(var key in this.fn){
				obj[key] = this.fn[key];
			}
		},
		
		fn: {
			travel: function(){
				var _this = this;
				setTimeout(function(){
					_this.reachNextFloor();
				}, 200);
			},
			reachNextFloor: function(){
				this.floor += this.travelDirection;
				if(this.travelDirection == elevatorManager.elevator.kDirectionUp){
					this.floor = Math.min(this.floor,  this.ops.floorServiceEnd);
				}else{
					this.floor = Math.max(this.floor,  this.ops.floorServiceStart);
				}
				
				
				this.manager.controlElevatorReachNextFloor(this);
			},
			callButton: function(floor, dir){
				
			},
			canTravel: function(floor, dir){
				if(this.status >= kStatusOutOfService ) return false;
			}
			
		},
	},
	
}