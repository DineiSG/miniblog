//Importando o React Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Importando as páginas
import './App.css';
import About from './pages/About/About';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='container'>
        <Routes>
          {/*Criando as rotas das páginas */}
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
