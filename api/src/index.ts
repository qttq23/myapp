

import { Db } from './db/db';
import { Todo } from './model/Todo';
import { Server, ServerConfig } from './server/server';

let main = async () => {

    // set up db
    let db = Db.from('db.json');

    // set up server
    let serverConfig: ServerConfig = {
        port: 2021,
        db
    };
    let server = new Server(serverConfig);

    // start server
    server.start();



};

main();