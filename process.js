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
		console.log(aggregatedLogResults);
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

var isNewDateLog = function(date){
	var isNewFlag = true;
	for (count in aggregatedLogResults){
		dateElement = aggregatedLogResults[count][0];
		if (dateElement === date){
			isNewFlag = false;
		}
	}
	return isNewFlag;
}

var addDateLog = function(newLog){
	var warningOrError = checkWarningOrError(newLog);
	var warningCount = warningOrError[0], errorCount = warningOrError[1];
	aggregatedLogResults.push([newLog[0], 'warning:', warningCount, 'error: ', errorCount]);
	return 1;
}

aggregateLogs();