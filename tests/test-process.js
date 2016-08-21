var fs = require('fs');
var LOG_FILE_NAME = "example.log";
var aggregatedLogResults = [];

var aggregateLogs = function(){
	var singleLine = [];

	fs.readFile(LOG_FILE_NAME, "utf-8", function(error, data){
		if (error) { 
			console.log(error);
			return;
		}
		var data = data.toString();
		var linesOfLog = data.split('\n');

		for (var lineCount = 0, length = linesOfLog.length; lineCount < length; lineCount++){
			singleLineString = linesOfLog[lineCount].toString();
			singleLine = convertToArray(singleLineString);
			date = singleLine[0];

			if(isNewDateLog(date)){
				addDateLog(singleLine);
			} else {
				updateDateLog(singleLine, date);
			}
		}
	});
}

var convertToArray = function(singleLine){
	var arrayOfSingleLine = [];
	elementsInSingleLine = singleLine.split(' ');
	for (count = 0, length = elementsInSingleLine.length; count < length; count++){
		arrayOfSingleLine.push(elementsInSingleLine[count]);
	}
	return arrayOfSingleLine;
}