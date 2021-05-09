import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Car } from './model/car';
import axios from 'axios';
import { TodoDb, TodoDbHelper } from './db/TodoDb';

export type myfunc = (age: number) => number;

type MyProps = {
  // using `interface` is also ok
  message: string;
  car: Car;
  cb: myfunc;
};
type MyState = {
  count: number; // like this
  text: string
};

export class App extends React.Component<MyProps, MyState> {

  state: MyState = {
    count: 7,
    text: ''
  };

  getTodos = async (): Promise<Array<any>> => {

    let db: TodoDb = TodoDbHelper.getTodoDb();
    let list = await db.getTodos();
    this.setState({
      count: list.length,
      text: list[0].text
    });
    return list;


    // try {
    //   let result = await axios.get('http://localhost:2021/api/todo');
    //   let todos: Array<any> = result.data.result;
    //   console.log(todos);
    //   this.setState({
    //     count: todos.length
    //   });
    //   return todos;


    // } catch (error) {
    //   return [];
    // }
  };

  componentDidMount() {
    setInterval(() => {
      this.getTodos();

    }, 3000);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.props.cb(this.props.car.age)}
            <code>{this.props.message}</code> <br></br>
            {this.state.count} - {this.state.text}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React2
        </a>
        </header>
      </div>
    );
  }

}

// export default App;
