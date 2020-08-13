//This files isn't transpile, so must use CommonJS and ES5
//reguster babel to transpile before our tests run
require('babel-register')();

//Disable webpack features mocha doesn't understand
require.extensions['css'] = function() {};
