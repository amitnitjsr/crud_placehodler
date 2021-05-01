import React from 'react';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './routes';
// import PreLoading from './Component/PreLoading';

const App = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          // loading={PreLoading}
          persistor={persistor}>
          {Routes}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
