import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Init from './containers/Init';
import Main from './containers/Main';
import Create from './containers/Create';
import Detail from './containers/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/store.js'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Init />} />
          <Route path="main" element={<Main />} >
            <Route path="create" element={<Create />} />
            <Route path="recipe/:id/detail" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
