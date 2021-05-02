
import express from 'express';
import { Todo } from '../model/Todo';

export interface ServerConfig {
    port: number;
    db: any;
}

export class Server {
    config: ServerConfig;
    private _app: express.Application;

    constructor(serverConfig: ServerConfig) {

        this.config = serverConfig;
        this._app = express();
        this._setup(this._app, this.config.db);

    }

    private _setup(app: express.Application, db: any): void {

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


    }

    public start() {

        let app = this._app;
        let port = this.config.port;

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });

    }

}

