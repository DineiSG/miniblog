//Importando o React Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Importando as páginas e componentes
import './App.css';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          {/*Criando as rotas das páginas */}
          <Route path="/home" element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
