import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Init from './containers/Init';
import Home from './containers/Home';
import Create from './containers/Create';
import Detail from './containers/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="home" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="recipe/:id/detail" element={<Detail />} />
        </Route>
        <Route path="/init" element={<Init />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
