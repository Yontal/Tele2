import React, {useReducer, useMemo} from 'react';
import {initialState} from '../store/store';
import applicationStateReducer from './reducers/ApplicationStateReducer';

const AppContext = React.createContext();

const AppProvider = (props) => {
  //https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
  const rootReducer = combineReducers(applicationStateReducer, {
    // НУЖНО ДОБАВЛЯТЬ СЮДА РЕДЬЮСЕРЫ ДЛЯ ВЕТОК СТЕЙТА В ВИДЕ
    // categories: reduceReducers(categoriesReducer),
  });

  function combineReducers(root, slices) {
    return (state, action) => {
      const st = root(state, action);
      const data = Object.keys(slices).reduce(
        (state, prop) => ({
          ...state,
          [prop]: slices[prop](state[prop], action),
        }),
        st,
      );
      return data;
    };
  }

  function reduceReducers(...reducers) {
    return (state, action) =>
      reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
  }

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => [state, dispatch], [state]);

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
};

export {AppContext, AppProvider};
