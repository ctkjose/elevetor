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
		for(var k in this.items){
			let elv = this.items[k];
			elv.status = this.elevator.kStatusIdle;
		}
	},
	manageElevator: function(elv){
		this.items[elv.code] = elv;
		
		
	},
	getAvailableElevator: function(location){
		var elvs = [];
		
		for(var k in this.items){
			let elv = this.items[k];
			if(!elv.canTravel()) continue;
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
	callButton: function(location, callFloor, targetFloor, dir){
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
			//add code to consider from where was the elevator requested (callFloor)
			
			if(e.status == this.elevator.kStatusTraveling){
				if(e.travelDirection != dir) continue;
				if(dir == this.elevator.kDirectionUp){
					if(e.floor > targetFloor) continue;	
				}else{
					if(e.floor < targetFloor) continue;
				}
			}
			availableElvs.push(e);
			
			let dist = Math.abs(e.floor-targetFloor);
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
	queElevator: function(elv, callFloor, targetFloor, dir){
		//ignore dir for know asume, elv is idle or traveling in desired dir
		elv.queFloor(targetFloor);
		
		if(elv.dir == this.elevator.kDirectionUp){
			if(elv.floor < callFloor) elv.queFloor(callFloor);
		}else{
			if(elv.floor > callFloor) elv.queFloor(callFloor);
		}
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
				flootStops: [],
				serviceCount: 0,
				
				travelDirection: this.kDirectionUp,
				ops: helper.extend(defaults, options),
			};
			
			elv.code = elv.ops.code;
			elv.location = elv.ops.location;
			elv.floor = elv.ops.floorServiceStart;
			
			this.decorate(elv);
			return elv;
				
		},
		queFloor: function(floor){
			
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
				
				//check next floor stop in que and continue travel
			},
			continueTravel: function(floor, dir){
				
			},
			canTravel: function(floor, dir){
				if(this.status >= kStatusOutOfService ) return false;
				return true;
			}
			
		},
	},
	
}