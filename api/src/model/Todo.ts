
import Ajv from "ajv";
const ajv = new Ajv();

interface CheckSchemaResult {
    isOk: boolean,
    error: any
};

type sayHiCb = (text: string) => void;

class Todo {
    text: string;
    constructor(text: string) {

        let result = Todo.checkSchema({ text });
        if (!result.isOk) {
            console.log(result.error);
            throw new Error('Invalid Todo schema');
        }

        // assign
        this.text = text;
    }

    sayHi = (cb: sayHiCb): void => {
        console.log(this.text);
        cb(this.text + '_printed');
    }

    static getSchema(): object {

        let schema: object = {
            type: "object",
            properties: {
                text: { type: "string" },
            },
            required: ["text"],
            additionalProperties: false,
        };
        return schema;
    }

    /**
     * check if the obj provided is complied the schema of Todo
     * @param obj - the obj to be checked
     * @returns if boolean is false, the error will be provided
     */
    static checkSchema(obj: object): CheckSchemaResult {

        const validate = ajv.compile(Todo.getSchema());
        const valid = validate(obj);
        return {
            isOk: valid ? true : false,
            error: valid ? null : validate.errors
        };
    }

    static fromObj(obj: any): Todo {

        return new Todo(obj.text);
    }

    static fromListObj(listObj: Array<object>): Array<Todo> {

        let todos: Array<Todo> = [];
        listObj.forEach(obj => {
            todos.push(Todo.fromObj(obj));
        });
        return todos;
    }

}

export { Todo };