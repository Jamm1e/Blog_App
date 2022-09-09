import React from 'react';
import './App.css';

import{
  BrowserRouter as Router, Routes, Route 
}from 'react-router-dom';

import { ToastContainer, Zoom, Slide, Bounce, Flip } from 'react-toastify';

//Region  ---------------------{ Import Components }---------------------
import BlogDetail from './pages/BlogDetail';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewBlog from './pages/NewBlog';
//import EditBlog from './pages/EditBlog';
import PrivateRoute from './pages/PrivateRoute';
//EndRegion

function transitionAnimation(){
  const list = [Zoom, Slide, Bounce, Flip];
  return list[Math.floor(Math.random() * list.length)];
}

function transitionPosition (){
  const list = ['top-right', 'top-center', 'top-left'];
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/blogs" element={<PrivateRoute />}>
            <Route path="/blogs" element={<BlogList />} />
          </Route>

          <Route path="/blogs/:id" element={<PrivateRoute />}>
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Route>

          <Route path="/newblogs" element={<PrivateRoute />}>
            <Route path="/newblogs" element={<NewBlog />} />
          </Route>
          
        </Routes>
      </Router>

      <ToastContainer
        position={transitionPosition()} autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
        transition={transitionAnimation()}
      />

    </div>
  );
}

export default App;
