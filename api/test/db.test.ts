
var assert = require('assert');
const fs = require('fs');
import { Db } from "../src/db/db";

describe('db', function () {
    it('constructor', function () {

        try {
            fs.unlinkSync('./thangg.json');
        } catch (error) {}

        let db = Db.from('./thangg.json');
        assert.equal(fs.existsSync('./thangg.json'), true);


        db.get('todos').push('23').write();
        db.read();
        assert.equal(db.get('todos').value().length, 1);
        assert.equal(db.get('todos').value()[0], '23');

        try {
            fs.unlinkSync('./thangg.json');
        } catch (error) { }
    });
});