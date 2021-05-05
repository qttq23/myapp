
var assert = require('assert');
import axios from 'axios';
const fs = require('fs');
import { Db } from '../src/db/db';
import { Server, ServerConfig } from '../src/server/server';

describe('server', () => {
    // this.timeout(10000);

    it('start', async () => {

        fs.unlinkSync('./xb.json');
        let db = Db.from('./xb.json');
        let server = new Server({
            port: 10000,
            db: db
        });
        server.start();

        // request
        const response = await axios.get('http://localhost:10000/api/todo');
        console.log(response.data);


        // request
        const response2 = await axios.post('http://localhost:10000/api/todo',
            {
                text: 'Fred',
            });
        console.log(response2.data);

        const response3 = await axios.get('http://localhost:10000/api/todo');
        console.log(response3.data);
        assert.strictEqual(response3.data.result.length, 1);
        assert.strictEqual(response3.data.result[0].text, 'Fred');

    });


});