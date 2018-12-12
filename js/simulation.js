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
		
		
		var elvToUse = elvManager.callButton("LOBBY", 2, elvManager.kDirectionUp);
		console.log(elvToUse);
	}
	
	
};