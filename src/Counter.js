import React from 'react';
import { useSelector, useDispatch } from './store';

function Counter() {
  const count = useSelector(state => state); // Получаем текущее значение состояния
  const dispatch = useDispatch(); // Получаем функцию dispatch

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

export default Counter;
