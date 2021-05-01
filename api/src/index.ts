
import express from 'express';
import { Todo } from './model/Todo';
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')



let createDb = (dbFileName: string): any => {

    const adapter = new FileSync(dbFileName);
    const db = low(adapter);

    db.defaults({ todos: [] })
        .write();

    return db;
}

let setUpServer = (app: express.Application, db: any): void => {

    app.use(express.json());
    app.get('/', (req, res) => res.send('Express + TypeScript: ' + new Date().toLocaleString()));

    /** get full list of todo */
    app.get('/api/todo', (req, res) => {

        db.read();
        let jsonTodos = db.get('todos')
            .value();
        let listTodo: Array<Todo> = Todo.fromListObj(jsonTodos);

        res.json({
            result: listTodo
        });
    });

    /** add a new todo */
    app.post('/api/todo', (req, res) => {
        console.log(req.body);

        let todo: Todo = Todo.fromObj(req.body);

        db.get('todos')
            .push(todo)
            .write();

        res.status(201).json({
            result: 'ok'
        });
    });

    app.use(function (err: any, req: any, res: any, next: any) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    });


};

let startServer = (app: express.Application, port: number): void => {

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });


};

let main = async () => {

    // set up db
    let db = createDb('db.json');

    // set up server
    const app = express();
    setUpServer(app, db);


    // start server
    let port = 10000;
    startServer(app, port);

};

main();