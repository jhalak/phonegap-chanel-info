function initDatabase() {
	db = openDatabase("Database", "1.0", "CHANNELS", 200000);
	db.transaction(pupulateTables, errorCB, successCB);
}

function pupulateTables(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS INFO');
	tx.executeSql("CREATE TABLE IF NOT EXISTS INFO (id unique, name, number)");
}

function errorCB() {
	console.log("Error pupulating database");
}

function successCB() {
	console.log("Done pupulating database");
}

function getDatabase() {
	db = openDatabase("Database", "1.0", "CHANNELS", 200000);
	return db;
}

function ChannelListController($scope) {
	/*
	var db = getDatabase();
	var id, rows;
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM INFO", [], function(tx, results){
			var channels = [];
			id = parseInt(results.rows.length + 1);
			for (var i = 0; i < results.rows.length; i++) {
				channels.push(results.rows.item(i));
			}
			rows = channels;
			console.log(rows);
		});
	});
	*/
	$scope.channels = [
	    {name: "BTV", number: 1},
	    {name: "ETV", number: 2}
	];
	
	$scope.addChannel = function(){
		var cName = $scope.FormChannelName;
		var cNumber = $scope.FormChannelNumber;
		
		$scope.channels.push({name:cName, number:cNumber});
		
		db.transaction(function(tx) {
			tx.executeSql("INSERT INTO INFO (id, name, number) VALUES ("+ id +", '" + cName +  "', '" + cNumber + "')");
	      }, function(err) {
	      		alert("Error processing SQL for inserting channel: "+ err.code);
	      }, function() {
	      		alert('Saved entry to database' );
	    });
		
		$scope.FormChannelName = '';
		$scope.FormChannelNumber = '';
	}
}