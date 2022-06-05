import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import AddEditBlog from './pages/AddEditBlog';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <Header></Header>
            <ToastContainer></ToastContainer>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/addBlog" element={<AddEditBlog />}></Route>
                <Route path="/editBlog/:id" element={<AddEditBlog />}></Route>
                <Route path="/blog/:id" element={<Blog />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
