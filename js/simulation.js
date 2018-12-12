var simulation = {
	start: function(elvManager){
		console.log("simulation started ------");
		
		
		var elv = elvManager.elevator.create({
			code: "MAINLOBBY01",	
			location: "LOBBY",
		});
		console.log(elv);
		
		elvManager.manageElevator(elv);
		
		elvManager.startService();
		
		
		//move to test fn
		//test primitives...
		var location = "LOBBY";
		var targetFloor = 6;
		var callFloor = 1;
		var dir = elvManager.kDirectionUp;
		
		var elvToUse = elvManager.callButton(location, callFloor, targetFloor, dir);
		if(!elvToUse){
			console.log("no elv available here....");
			return;
		}
		elvManager.queElevator(elvToUse,  callFloor, targetFloor, dir);
		elvManager.queElevator(elvToUse,  3, 5, dir);
		console.log(elvToUse);
		
		
	}
	
	
};