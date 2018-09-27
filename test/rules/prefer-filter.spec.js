'use strict'

var rule = require('../../src/rules/prefer-filter')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
var errorsObject = require('../util/errorsObject')

var useFilter = 'Use Array.filter instead of filtering inside the forEach'

ruleTester.run('prefer-filter', rule, {
  valid: [
    '[].forEach(function(){if(b){}else{}})',
    '[].forEach(function(){if(b){}else if(c){}})',
    '[].forEach(function(){x=2;if(b){}})',
    '[].forEach(function(){if(b){};x=2})',
    '[].map(function(){if(b){}})'
  ],
  invalid: [
    {code: '[].forEach(function(){if(b){}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(b){;;;;;}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(!b){}})', errors: errorsObject(useFilter)},
    {code: '[].forEach(function(){if(b) a = 4;})', errors: errorsObject(useFilter)}
  ]
})