
class Todo {
    text: string;
    constructor(text: string) {
        this.text = text;
    }

    static fromObj(obj: any): Todo {
        if (!obj.text || typeof (obj.text) !== 'string') {
            throw new Error('not a todo format');
        }
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