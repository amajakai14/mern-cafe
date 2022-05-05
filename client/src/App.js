import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/SignIn'
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter className="App">
      <Navbar/>
      <Routes>
        <Route path='/signin' exact element={<Auth/>}/>
        <Route path='/' exact element={<Home/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
