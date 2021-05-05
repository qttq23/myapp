
var assert = require('assert');

import { Todo } from '../src/model/Todo';

describe('todo', function () {
    it('constructor', function () {
        let todo = new Todo('sdf');
        assert.equal(todo.text, 'sdf');
    });
    it('fromobj', function () {
        let todo = Todo.fromObj({ text: 'sdf2' });
        assert.equal(todo.text, 'sdf2');
    });
    it('fromList', function () {
        let todos = Todo.fromListObj([{text: 'sdf3'}, {text: 'sdf4'}]);
        assert.equal(todos.length, 2);
        assert.equal(todos[0].text, 'sdf3');
        assert.equal(todos[1].text, 'sdf4');
    });
});