import React, { createContext, useReducer } from 'react';

const Reducer = (state, action) => {
  switch (action.type) {
    case 'USER_UPDATE':
      return { user: action.userProfile };
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, { user: null });

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export const Context = createContext({ user: null });

export default Store;
