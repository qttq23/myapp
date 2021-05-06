
import express from 'express';
import { Todo } from '../model/Todo';
var cors = require('cors');

export interface ServerConfig {
    port: number;
    db: any;
}

export class Server {
    config: ServerConfig;
    private _app: express.Application;
    private _server: any;
    private _sockets: Array<any>;

    constructor(serverConfig: ServerConfig) {

        this.config = serverConfig;
        this._app = express();
        this._server = null;
        this._sockets = [];
        this._setup(this._app, this.config.db);

    }

    private _setup(app: express.Application, db: any): void {

        app.use(cors());
        app.use(express.json());
        app.use('/build', express.static('build'));
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

        this._server = app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });

        // track sockets for later close server
        this._server.on('connection', (socket: any) => {
            this._sockets.push(socket);
        });

    }

    public stop() {

        this._sockets.forEach((socket: any)=>{
            socket.destroy();
            console.log('1 connection killed');
        });

        this._server.close(()=>{
            console.log('server closed');
        });
    }

}

