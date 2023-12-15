import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AllProvider } from './context/Allprovider';

import 'bootstrap/dist/css/bootstrap.min.css';

//header
import Header from './components/header';
//pages
import Front from './page/frontpage';
import Todos from './page/todos';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AllProvider>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>

    </AllProvider>
  </React.StrictMode>
);

