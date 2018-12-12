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
	options: {
		maxTravelsBeforeService: 100,
	},
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
	controlElevatorReachFloor: function(elv){
		//Reached floor
		console.log("Reached requested floor");
		console.log(elv);
		
		
		elv.serviceCount++;
		
		if(elv.serviceCount == this.options.maxTravelsBeforeService ){
			elv.status = this.elevator.kStatusOutOfService;
		}else{
			elv.status = this.elevator.kStatusIdle;
		}
	},
	callButton: function(location, floor, dir){
		var elvs = this.getAvailableElevator(location);
		
		///TODO:save push log/statistics
		if(elvs.length ==0 ){
			console.log("No elevators available at location");
			return undefined;
		}
		
		//find closest elevator
		var lastDist = 999999;
		var bestElvIdx = -1;
		var availableElvs = [];
		for(var i=0; i< elvs.length; i++){
			let e = elvs[i];
			console.log("evaluating elv[%d] %o", i, e);
			//for now dont consider diff travel direction as option
			if(e.travelDirection != dir) continue;
			if(dir == this.elevator.kDirectionUp){
				if(e.floor > floor) continue;	
			}else{
				if(e.floor < floor) continue;
			}
			availableElvs.push(e);
			
			let dist = Math.abs(e.floor-floor);
			if(dist < lastDist){
				bestElvIdx = availableElvs.length-1;
			}
		}
		
		
		//some bounds and error checking ommited
		
		if(bestElvIdx >= 0){
			return availableElvs[bestElvIdx];
		}
		return undefined;
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
				floorTarget: 0,
				serviceCount: 0,
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
				if(this.floor == this.floorTarget){
					this.manager.controlElevatorReachFloor(this);
				}
			},
			callButton: function(floor, dir){
				
			},
			canTravel: function(floor, dir){
				if(this.status >= kStatusOutOfService ) return false;
			}
			
		},
	},
	
}