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
		var floor = 2;
		var dir = elvManager.kDirectionUp;
		
		var elvToUse = elvManager.callButton(location, floor, dir);
		if(!elvToUse){
			console.log("no elv available here....");
			return;
		}
		elvManager.queElevator(elvToUse, floor, dir);
		console.log(elvToUse);
	}
	
	
};