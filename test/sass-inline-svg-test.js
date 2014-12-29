'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.sassInlineSvg = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  no_fill: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/no-fill.css');
    var expected = grunt.file.read('test/expected/no-fill.css');
    test.equal(actual, expected, 'Should inline an SVG in CSS as a valid data URI.');

    test.done();
  },

  add_fill: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/add-fill.css');
    var expected = grunt.file.read('test/expected/add-fill.css');
    test.equal(actual, expected, 'Should add color fills to inlined SVG <path>s.');

    test.done();
  },

  with_fill: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/with-fill.css');
    var expected = grunt.file.read('test/expected/with-fill.css');
    test.equal(actual, expected, 'Should preserve existing fills in inlined SVG <path>s.');

    test.done();
  },

  replace_fill: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/replace-fill.css');
    var expected = grunt.file.read('test/expected/replace-fill.css');
    test.equal(actual, expected, 'Should replace color fills in inlined SVG <path>s.');

    test.done();
  }
};
