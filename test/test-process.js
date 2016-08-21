var chai = require('chai');
var assert = chai.assert;

var func = require('../process.js');

describe('convertToArray()', function(){
	it('should convert a line of strings to array', function(){
		var lineOfString = "This is a line of strings";

		assert.deepEqual(func.convertToArray(lineOfString), [ 'This', 'is', 'a', 'line', 'of', 'strings' ]);
	});
});