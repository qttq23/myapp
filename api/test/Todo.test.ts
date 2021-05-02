
var assert = require('assert');

import { Todo } from '../src/model/Todo';

describe('todo', function () {
    it('constructor', function () {
        let todo = new Todo('sdf');
        assert.equal(todo.text, 'sdf2');
    });
});