'use strict'

const rule = require('../../src/rules/prefer-ternary')
const {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
const errorsObject = require('../util/errorsObject')

const message = v => `use ternary instead of if-else for assignment of ${v}`

ruleTester.run('prefer-ternary', rule, {
  valid: [
    'if (b) { x = 3 } else { y = 4 }',
    'if (b) { x = 3 } else {}'
  ],
  invalid: [
    {code: 'if (b) y = 1; else y = 2', errors: errorsObject(message('y'))},
    {code: 'if (b) a.y = 1; else a.y = 2', errors: errorsObject(message('a.y'))},
    {code: 'if (b) y = p; else y = q', errors: errorsObject(message('y'))},
    {code: 'if (b) y = f1(); else y = f2()', errors: errorsObject(message('y'))},
    {code: 'if (b) { y = 1 } else y = 2', errors: errorsObject(message('y'))},
    {code: 'if (b) y = 1; else { y = 2 }', errors: errorsObject(message('y'))},
    {code: 'if (b) { y = 1 } else { y = 2 }', errors: errorsObject(message('y'))}
  ]
})
