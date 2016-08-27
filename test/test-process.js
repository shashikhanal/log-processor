var chai = require('chai');
var assert = chai.assert;

var func = require('../process.js');

describe('convertToArray()', function(){
	it('should convert a line of strings to array', function(){
		var lineOfString = "This is a line of strings";

		assert.deepEqual(func.convertToArray(lineOfString), [ 'This', 'is', 'a', 'line', 'of', 'strings' ]);
	});
});

describe('checkWarningOrError()', function(){
	it('should check if [error] present', function(){
		var arrayOfSingleLineLog = func.convertToArray("2016-12-13 this is a log line 4 [error]");
		var errorCount = 1;

		var outcome = func.checkWarningOrError(arrayOfSingleLineLog);
		assert.equal(outcome[1], errorCount);
	});

	it('should check if [warning] present', function(){
		var arrayOfSingleLineLog = func.convertToArray("2016-12-14 this is a log line 6 [warning]");
		var warningCount = 1;

		var outcome = func.checkWarningOrError(arrayOfSingleLineLog);
		assert.equal(outcome[0], warningCount);
	});
});

describe('addDateLog()', function(){
	it('should add line of log from a certain day', function(){
		var arrayOfSingleLineLog = func.convertToArray("2016-12-13 this is a log line 5 [error]");
		var status = func.addDateLog(arrayOfSingleLineLog);
		assert.equal(status, 1);
	});
});