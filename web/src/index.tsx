import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, myfunc} from './App';
import { Car } from './model/car';

let handler = (x:number)=>{
  return 3*x;
}

ReactDOM.render(
  <React.StrictMode>
    <App message="henlo" car={new Car(12)} cb={handler} />
  </React.StrictMode>,
  document.getElementById('root')
);
