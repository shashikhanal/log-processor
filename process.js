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

var checkWarningOrError = function(singleLineLog){
	warningOrErrorValue = singleLineLog[singleLineLog.length - 1];
	var warningCount = 0, errorCount = 0;
	if (warningOrErrorValue === "[warning]"){
		warningCount = 1;
	} else {
		errorCount = 1;
	}
	return [warningCount, errorCount];
}

var addDateLog = function(newLog){
	var warningOrError = checkWarningOrError(newLog);
	var warningCount = warningOrError[0], errorCount = warningOrError[1];
	aggregatedLogResults.push([newLog[0], 'warning:', warningCount, 'error: ', errorCount]);
	return 1;
}

var updateDateLog = function(repeatedDateLog, repeatedDate){
	for (count in aggregatedLogResults){
		dateFromAggregatedLogResults = aggregatedLogResults[count][0];
		if (dateFromAggregatedLogResults === repeatedDate){
			var warningOrError = checkWarningOrError(repeatedDateLog);
			var warningCount = warningOrError[0], errorCount = warningOrError[1];
			aggregatedLogResults[count][2] += warningCount;
			aggregatedLogResults[count][4] += errorCount;
		}
	}
	return 1;
}

module.exports = {
	convertToArray: convertToArray,
}

aggregateLogs();