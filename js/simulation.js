var simulation = {
	start: function(elvManager){
		console.log("simulation started ------");
		
		
		var elv = elvManager.elevator.create({
			code: "MainLobby01",	
			
		});
		console.log(elv);
	}
	
	
};