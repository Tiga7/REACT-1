import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'antd/dist/antd.min.css'

import { BrowserRouter } from 'react-router-dom';
import App from './components/app';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='container'>
        <App></App>
    </div>
  </BrowserRouter>
);