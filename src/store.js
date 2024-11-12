import React, { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

export function Provider({ store, children }) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
export function createStore(reducer) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  dispatch({ type: '@@redux/INIT' });

  return { getState, subscribe, dispatch };
}

export function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export function useSelector(selector) {
  const store = useContext(StoreContext);
  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setSelectedState(selector(store.getState()));
    });
    return unsubscribe;
  }, [store, selector]);

  return selectedState;
}

export function useDispatch() {
  const store = useContext(StoreContext);
  return store.dispatch;
}
