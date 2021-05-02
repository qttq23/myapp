
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');



class Db {
    constructor() {

    }

    static from(filePath: string): any {

        const adapter = new FileSync(filePath);
        const db = low(adapter);

        db.defaults({ todos: [] })
            .write();

        return db;
    }
}

export { Db };