import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Car } from './model/car';
import axios from 'axios';

export type myfunc = (age: number) => number;

type MyProps = {
  // using `interface` is also ok
  message: string;
  car: Car;
  cb: myfunc;
};
type MyState = {
  count: number; // like this
};

export class App extends React.Component<MyProps, MyState> {

  state: MyState = {
    count: 7
  };

  getTodos = async (): Promise<Array<any>> => {

    try {
      let result = await axios.get('http://localhost:2021/api/todo');
      let todos: Array<any> = result.data.result;
      console.log(todos);
      this.setState({
        count: todos.length
      });
      return todos;


    } catch (error) {
      return [];
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.props.cb(this.props.car.age)} <code>{this.props.message}</code> {this.state.count}
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
